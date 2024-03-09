'use strict'

import APIModel from './APIModel'
import APIConfig from '../../config/APIConfig'

const Language = APIModel.extend({

  urlRoot() {
    return `${APIConfig.API_FULL_PATH}/languages`
  },
})

export default Language
