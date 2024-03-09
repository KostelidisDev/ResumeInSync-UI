'use strict'

import APIModel from './APIModel'
import APIConfig from '../../config/APIConfig'

const ProfessionalExperience = APIModel.extend({

  urlRoot() {
    return `${APIConfig.API_FULL_PATH}/experiences/professionals`
  },
})

export default ProfessionalExperience
