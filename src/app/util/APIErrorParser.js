'use strict'

import _ from 'underscore'

export const parse = (errorObject) => {
  const { responseJSON } = errorObject

  if (_.isUndefined(responseJSON.error)) {
    return (_.isUndefined(responseJSON.message) ? responseJSON : responseJSON.message)
  }

  if (!(_.isArray(responseJSON.errors))) {
    return responseJSON.error
  }

  return _.map(responseJSON.errors, jsonError => {
    return `${jsonError.arguments[0].code} ${jsonError.defaultMessage} <br />`
  })
    .map(value => value.toString())
}
