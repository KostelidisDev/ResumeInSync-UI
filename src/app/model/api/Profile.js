'use strict'

import APIModel from './APIModel'
import APIConfig from '../../config/APIConfig'

const Profile = APIModel.extend({

  urlRoot() {
    return `${APIConfig.API_FULL_PATH}/profiles`
  },
})

export default Profile
