'use strict'

import APICollection from './APICollection'
import APIConfig from '../../config/APIConfig'
import ProfessionalExperience from "../../model/api/ProfessionalExperience"

const ProfessionalExperienceCollection = APICollection.extend({

  model: ProfessionalExperience,

  url() {
    return `${APIConfig.API_FULL_PATH}/experiences/professionals`
  }
})

export default ProfessionalExperienceCollection
