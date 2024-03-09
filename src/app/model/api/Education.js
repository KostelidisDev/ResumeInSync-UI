'use strict'

import APIModel from './APIModel'
import APIConfig from '../../config/APIConfig'

const Volunteering = APIModel.extend({

  urlRoot() {
    return `${APIConfig.API_FULL_PATH}/educations`
  },
})

export default Volunteering
