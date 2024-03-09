'use strict'

import Handlebars from 'handlebars/runtime'

import * as Languages from './../lang/Languages'

Handlebars.registerHelper('debug', function () {
  console.log('Current Context')
  console.log('====================')
  console.log(this)
})

Handlebars.registerHelper('getLangString', function (key) {
  return Languages.resolveKey(key)
})

Handlebars.registerHelper('getLangStringWithPrefix', function (prefix, key) {
  return Languages.resolveKey(`${prefix}.${key}`)
})

Handlebars.registerHelper('getYear', function () {
  return "2019" + "-" + new Date().getFullYear()
})

Handlebars.registerHelper('booleanNot', function (value) {
  return !(value)
})
