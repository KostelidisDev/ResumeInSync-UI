'use strict'

import * as HTTPMethods from '../constants/common/HTTPMethods'
import * as Channels from '../constants/channels/Channels'
import * as SecurityEvents from '../constants/channels/events/SecurityEvents'
import * as UserEvents from '../constants/channels/events/UserEvents'
import BackEngConfig from '../config/APIConfig'
import Radio from 'backbone.radio'
import $ from 'jquery'

const SecurityChannel = Radio.channel(Channels.SECURITY)
const UserChannel = Radio.channel(Channels.USER)

const changePassword = (payload) => {
  if (payload.currentPassword === undefined) {
    return Promise.reject('currentPassword is undefined')
  }

  if (payload.newPassword === undefined) {
    return Promise.reject('newPassword is undefined')
  }

  return Promise.resolve(payload)
    .then(payload => $.ajax({
      method: HTTPMethods.POST,
      url: `${BackEngConfig.API_FULL_PATH}/rpc/auth/change-password`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': SecurityChannel.request(SecurityEvents.GET_BEARER_TOKEN)
      },
      data: JSON.stringify(payload)
    })
    )
}

UserChannel.reply(UserEvents.CHANGE_PASSWORD, changePassword)
