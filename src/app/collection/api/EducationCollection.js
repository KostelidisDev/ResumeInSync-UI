'use strict'

import APICollection from './APICollection'
import APIConfig from '../../config/APIConfig'
import Education from "../../model/api/Education"

const EducationCollection = APICollection.extend({

  model: Education,

  url() {
    return `${APIConfig.API_FULL_PATH}/educations`
  }
})

export default EducationCollection
