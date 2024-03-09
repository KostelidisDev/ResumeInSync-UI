'use strict'

import APICollection from './APICollection'
import APIConfig from '../../config/APIConfig'
import Publication from "../../model/api/Publication"

const PublicationCollection = APICollection.extend({

  model: Publication,

  url() {
    return `${APIConfig.API_FULL_PATH}/publications`
  }
})

export default PublicationCollection
