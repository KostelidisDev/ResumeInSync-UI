'use strict'

import _ from 'underscore'

export default ({
  getByKey(key) {
    return window.localStorage.getItem(key)
  },

  getAll() {
    return window.localStorage
  },

  createByKey(key, object) {
    window.localStorage.setItem(key, object)

    return this.getByKey(key)
  },

  createByArray(objects) {
    let createdObjects = Array(objects.length)

    objects.forEach(function (item, index) {
      createdObjects[index] = this.createByKey(item.key, item.value)
    }.bind(this))

    return createdObjects
  },

  updateByKey(key, object) {
    return this.createByKey(key, object)
  },

  deleteByKey(key) {
    window.localStorage.removeItem(key)

    return !!!this.getByKey(key)
  },

  clearAll() {
    window.localStorage.clear()
    return true
  },

  clearFromArray(keys) {
    _.forEach(keys, key => {
      this.deleteByKey(key.key)
    })

    return true
  }
})
