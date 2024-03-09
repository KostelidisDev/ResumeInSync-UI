'use strict'

import APIModel from './APIModel'
import APIConfig from '../../config/APIConfig'

const User = APIModel.extend({

  urlRoot() {
    return `${APIConfig.API_FULL_PATH}/users`
  },
})

export default User
