'use strict'

import * as VisibilityOptions from './VisibilityOptions'
import * as Language from '../../lang/Languages'

export default [
  {
    'name': Language.resolveKey('navigationBar.home'),
    'icon': 'fa-home',
    'link': '#',
    'visibility': VisibilityOptions.ALL
  },
  {
    'name': Language.resolveKey('navigationBar.resumes'),
    'icon': 'fa-book',
    'link': '#/resumes',
    'visibility': VisibilityOptions.ALL
  },
  {
    'name': Language.resolveKey('navigationBar.account'),
    'icon': 'fa-user',
    'link': '#/account',
    'visibility': VisibilityOptions.USER
  },
  {
    'name': Language.resolveKey('navigationBar.resume'),
    'icon': 'fa-file-text',
    'link': '#/resume',
    'visibility': VisibilityOptions.USER
  },
  {
    'name': Language.resolveKey('navigationBar.login'),
    'icon': 'fa-sign-in',
    'link': '#/login',
    'visibility': VisibilityOptions.GUEST
  },
  {
    'name': Language.resolveKey('navigationBar.register'),
    'icon': 'fa-user-plus',
    'link': '#/register',
    'visibility': VisibilityOptions.GUEST
  },
  {
    'name': Language.resolveKey('navigationBar.logout'),
    'icon': 'fa-sign-out',
    'link': '#/logout',
    'visibility': VisibilityOptions.USER
  },
  {
    'name': Language.resolveKey('navigationBar.about'),
    'icon': 'fa-info',
    'link': '#/about',
    'visibility': VisibilityOptions.ALL
  }
]
