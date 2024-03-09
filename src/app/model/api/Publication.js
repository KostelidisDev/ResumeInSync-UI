'use strict'

import APIModel from './APIModel'
import APIConfig from '../../config/APIConfig'

const Publication = APIModel.extend({

  urlRoot() {
    return `${APIConfig.API_FULL_PATH}/publications`
  },
})

export default Publication
