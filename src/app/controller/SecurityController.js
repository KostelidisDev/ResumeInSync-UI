'use strict'

import LocalStorageController from './LocalStorageController'
import TimeController from './TimeController'
import MomentUtil from '../util/MomentUtil'
import LiveData from '../LiveData'
import APIConfig from '../config/APIConfig'
import * as JWTFields from '../constants/auth/JWTFields'
import * as Channels from '../constants/channels/Channels'
import * as SecurityEvents from '../constants/channels/events/SecurityEvents'
import * as HTTPMethods from '../constants/common/HTTPMethods'
import Profile from "../model/api/Profile"

const securityChannel = Backbone.Radio.channel(Channels.SECURITY)

export const logout = () => {
  return Promise.resolve(
    LocalStorageController.clearFromArray(
      [
        {
          key: JWTFields.ACCESS_TOKEN
        },
        {
          key: JWTFields.TOKEN_TYPE
        },
        {
          key: JWTFields.REFRESH_TOKEN
        },
        {
          key: JWTFields.EXPIRES_IN
        },
        {
          key: JWTFields.ISSUE_DATE
        },
        {
          key: JWTFields.EXPIRE_DATE
        }
      ]
    )
  )
    .then(() => LiveData.setMe(null))
    .then(() => true)
}

export const storeAccessToken = (oAuthResponse) => {
  const JWT = [
    {
      key: JWTFields.ACCESS_TOKEN,
      value: oAuthResponse.access_token
    },
    {
      key: JWTFields.TOKEN_TYPE,
      value: oAuthResponse.token_type
    },
    {
      key: JWTFields.REFRESH_TOKEN,
      value: oAuthResponse.refresh_token
    },
    {
      key: JWTFields.EXPIRES_IN,
      value: oAuthResponse.expires_in * 1000 // Seconds to Milliseconds
    }
  ]

  LocalStorageController.createByArray(JWT)
  LocalStorageController.createByKey(JWTFields.ISSUE_DATE, MomentUtil.nowDateWithoutFormat())

  const expireDate = TimeController.calculateExpireTime(
    LocalStorageController.getByKey(JWTFields.ISSUE_DATE),
    LocalStorageController.getByKey(JWTFields.EXPIRES_IN)
  )

  LocalStorageController.createByKey(JWTFields.EXPIRE_DATE, expireDate)

  return Promise.resolve(true)
}

export const getTokenType = () => {
  return LocalStorageController.getByKey(JWTFields.TOKEN_TYPE)
}

export const getAccessToken = () => {
  return LocalStorageController.getByKey(JWTFields.ACCESS_TOKEN)
}

export const getBearerToken = () => {
  return `${getTokenType()} ${getAccessToken()}`
}

export const getRefreshToken = () => {
  return LocalStorageController.getByKey(JWTFields.REFRESH_TOKEN)
}

export const hasRefreshToken = () => {
  return (!!getRefreshToken())
}

export const hasBearerToken = () => {
  return (!!getTokenType() && !!getAccessToken())
}

export const isAuthenticated = () => {
  const hasBearerTokenVar = hasBearerToken()
  const isTokenValid = !(mustRefreshToken())

  if (hasBearerTokenVar && isTokenValid) {
    return Promise.resolve(true)
  }

  return requestRefreshToken()
    .then(tokenRefreshed => tokenRefreshed)
    .catch(() => {
      return logout()
        .then(() => false)
    })
}

export const getExpireDate = () => {
  return LocalStorageController.getByKey(JWTFields.EXPIRE_DATE)
}

export const mustRefreshToken = () => {
  return TimeController.isExpired(getExpireDate())
}

export const getUserId = () => {
  return LiveData.getUser().id
}

export const getProfile = () => {
  if (!(_.isNull(LiveData.profile) || LiveData.profile === undefined)) {
    return LiveData.getProfile()
  }

  return new Profile()
}

export const getUser = () => {
  if (!(_.isNull(LiveData.user) || LiveData.user === undefined)) {
    return Promise.resolve(LiveData.getUser())
  }

  return Promise.resolve(
    $.ajax({
      method: HTTPMethods.GET,
      dataType: 'json',
      url: `${APIConfig.API_FULL_PATH}/rpc/auth/me`,
      headers: {
        'Authorization': getBearerToken()
      }
    }
    ))
    .then(user => LiveData.setMeAndGetUser(user))
    .catch(() => logout()
      .then(() => null))
}

export const oAuthTokenAbstractRequest = (clientCredentials, requestBody) => {
  return Promise.resolve(
    $.ajax(
      {
        method: HTTPMethods.POST,
        dataType: 'json',
        url: `${APIConfig.API_FULL_PATH}/oauth/token`,
        headers: Backbone.BasicAuth.getHeader(clientCredentials),
        data: requestBody
      }
    )
  )
}

export const requestAccessToken = userCredentials => {
  const clientCredentials = APIConfig.API_CLIENT_CREDENTIALS
  const requestBody = userCredentials

  // Attach grant type on request body (user credentials from form)
  requestBody.grant_type = APIConfig.API_GRANT_TYPE_PASSWORD

  return oAuthTokenAbstractRequest(clientCredentials, requestBody)
    .then(oAuthTokenResponse => storeAccessToken(oAuthTokenResponse))
    .then(() => getUser())
}

export const login = userCredentials => requestAccessToken(userCredentials)

export const register = userCredentials => {
  return Promise.resolve(
    $.ajax(
      {
        method: HTTPMethods.POST,
        url: `${APIConfig.API_FULL_PATH}/rpc/auth/register`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(userCredentials)
      }
    )
  )
}

export const requestRefreshToken = () => {
  const clientCredentials = APIConfig.API_CLIENT_CREDENTIALS
  const refreshToken = getRefreshToken()

  if (!hasRefreshToken()) {
    return Promise.reject('We don\'t have token')
  }

  const requestBody = {
    refresh_token: refreshToken,
    grant_type: APIConfig.API_GRANT_TYPE_REFRESH_TOKEN
  }

  return oAuthTokenAbstractRequest(clientCredentials, requestBody)
    .then(oAuthTokenResponse => storeAccessToken(oAuthTokenResponse))
}

export const hasAnyRole = (rolesToCheck, userRoles) => {
  let matchedRoles = false

  _.forEach(rolesToCheck, roleToCheck => {
    _.forEach(userRoles, userRole => {
      if (roleToCheck === userRole.name) {
        matchedRoles = true
      }
    })
  })

  return matchedRoles
}

export const hasRole = (roleToCheck, userRoles) => {
  return hasAnyRole([roleToCheck], userRoles)
}

securityChannel.reply(SecurityEvents.LOGOUT, logout)
securityChannel.reply(SecurityEvents.LOGIN, login)
securityChannel.reply(SecurityEvents.REGISTER, register)
securityChannel.reply(SecurityEvents.REQUEST_ACCESS_TOKEN, requestAccessToken)
securityChannel.reply(SecurityEvents.REQUEST_REFRESH_TOKEN, requestRefreshToken)
securityChannel.reply(SecurityEvents.GET_BEARER_TOKEN, getBearerToken)
securityChannel.reply(SecurityEvents.IS_AUTHENTICATED, isAuthenticated)
securityChannel.reply(SecurityEvents.MUST_REFRESH_TOKEN, mustRefreshToken)
securityChannel.reply(SecurityEvents.GET_USER, getUser)
securityChannel.reply(SecurityEvents.GET_PROFILE, getProfile)
securityChannel.reply(SecurityEvents.GET_USER_ID, getUserId)
securityChannel.reply(SecurityEvents.HAS_ROLE, hasRole)
securityChannel.reply(SecurityEvents.HAS_ANY_ROLE, hasAnyRole)
