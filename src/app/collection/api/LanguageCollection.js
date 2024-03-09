'use strict'

import APICollection from './APICollection'
import APIConfig from '../../config/APIConfig'
import Language from "../../model/api/Language"

const LanguageCollection = APICollection.extend({

  model: Language,

  url() {
    return `${APIConfig.API_FULL_PATH}/languages`
  }
})

export default LanguageCollection
