'use strict'

import APICollection from './APICollection'
import APIConfig from '../../config/APIConfig'
import Certification from "../../model/api/Certification"

const CertificationCollection = APICollection.extend({

  model: Certification,

  url() {
    return `${APIConfig.API_FULL_PATH}/certifications`
  }
})

export default CertificationCollection
