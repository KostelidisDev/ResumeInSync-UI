'use strict'

import APIModel from './APIModel'
import APIConfig from '../../config/APIConfig'

const VolunteerExperience = APIModel.extend({

  urlRoot() {
    return `${APIConfig.API_FULL_PATH}/experiences/volunteers`
  },
})

export default VolunteerExperience
