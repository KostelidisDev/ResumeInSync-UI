'use strict'

import AppRouter from './AppRouter'
import User from "./model/api/User"
import Profile from "./model/api/Profile"

const LiveData = ({
  user: null,
  profile: null,
  router: new AppRouter(),

  setMe(me) {
    if (me === undefined || me === null) {
      this.user = null
      this.profile = null
      return
    }

    const { user, profile } = me

    this.user = new User(user)
    this.profile = new Profile(profile)
  },

  getUser() {
    return this.user
  },

  getProfile() {
    return this.profile
  },

  setMeAndGetUser(me) {
    this.setMe(me)
    return this.getUser()
  }
})

export default LiveData
