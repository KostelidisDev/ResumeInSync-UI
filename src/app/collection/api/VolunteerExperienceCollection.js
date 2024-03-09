'use strict'

import APICollection from './APICollection'
import APIConfig from '../../config/APIConfig'
import VolunteerExperience from "../../model/api/VolunteerExperience"

const VolunteerExperienceCollection = APICollection.extend({

  model: VolunteerExperience,

  url() {
    return `${APIConfig.API_FULL_PATH}/experiences/volunteers`
  }
})

export default VolunteerExperienceCollection
