'use strict'

import APIModel from './APIModel'
import APIConfig from '../../config/APIConfig'

const Certification = APIModel.extend({

  urlRoot() {
    return `${APIConfig.API_FULL_PATH}/certifications`
  },
})

export default Certification
