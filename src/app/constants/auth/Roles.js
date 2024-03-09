'use strict'

import * as Languages from '../../lang/Languages'

export const ROLE_ADMIN = 'ROLE_ADMIN'
export const ROLE_USER = 'ROLE_USER'

export const availableUserRoles = new Map()
availableUserRoles.set(ROLE_ADMIN, Languages.resolveKey('users.userRoles.roleAdmin'))
availableUserRoles.set(ROLE_USER, Languages.resolveKey('users.userRoles.roleUser'))
