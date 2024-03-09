'use strict'

import LocalCollection from './LocalCollection'
import Profile from "../../model/local/Profile"

const ProfileCollection = LocalCollection.extend({
  model: Profile
})

export default ProfileCollection
