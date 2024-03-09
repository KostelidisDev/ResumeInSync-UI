'use strict'

import APIModel from './APIModel'
import APIConfig from '../../config/APIConfig'

const Skill = APIModel.extend({

  urlRoot() {
    return `${APIConfig.API_FULL_PATH}/skills`
  },
})

export default Skill
