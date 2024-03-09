'use strict'

import APICollection from './APICollection'
import APIConfig from '../../config/APIConfig'
import Skill from "../../model/api/Skill"

const SkillCollection = APICollection.extend({

  model: Skill,

  url() {
    return `${APIConfig.API_FULL_PATH}/skills`
  }
})

export default SkillCollection
