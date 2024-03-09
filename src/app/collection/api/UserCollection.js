'use strict'

import User from '../../model/api/User'
import APICollection from './APICollection'
import APIConfig from '../../config/APIConfig'

const UserCollection = APICollection.extend({

  model: User,

  url() {
    return `${APIConfig.API_FULL_PATH}/users`
  }
})

export default UserCollection
