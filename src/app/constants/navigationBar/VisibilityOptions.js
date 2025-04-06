'use strict'

import * as Roles from '../auth/Roles'
import * as Channels from '../channels/Channels'
import * as SecurityEvents from '../channels/events/SecurityEvents'

const SecurityChannel = Backbone.Radio.channel(Channels.SECURITY)

export const ALL = Object.freeze('ALL')
export const GUEST = Object.freeze('GUEST')
export const USER = Object.freeze('USER')
export const ADMIN = Object.freeze('ADMIN')

export const showObject = (visibilityOption, userRoles) => {
  if (visibilityOption === ALL) {
    return true
  }

  const isAuthenticated = userRoles.length > 0

  if (visibilityOption === GUEST) {
    return !(isAuthenticated)
  }

  if (!(isAuthenticated)) {
    return false
  }

  if (visibilityOption === ADMIN) {
    return SecurityChannel.request(
      SecurityEvents.HAS_ROLE,
      Roles.ROLE_ADMIN,
      userRoles
    )
  }

  if (visibilityOption === USER) {
    return SecurityChannel.request(
      SecurityEvents.HAS_ANY_ROLE,
      [
        Roles.ROLE_ADMIN,
        Roles.ROLE_USER
      ],
      userRoles
    )
  }

  return false
}
