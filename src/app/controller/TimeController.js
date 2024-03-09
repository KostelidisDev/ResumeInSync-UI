'use strict'

import MomentUtil from '../util/MomentUtil'

export default ({
  calculateExpireTime(creationTime, duration) {
    return parseInt(creationTime, 10) + parseInt(duration, 10)
  },

  isExpired(expireTime) {
    return MomentUtil.nowDateWithoutFormat() >= expireTime
  }
})
