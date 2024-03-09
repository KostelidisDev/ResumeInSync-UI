'use strict'

import BaseCollection from '../BaseCollection'
import Radio from 'backbone.radio'
import Backbone from 'backbone'
import * as Channels from '../../constants/channels/Channels'
import * as SecurityEvents from '../../constants/channels/events/SecurityEvents'

const SecurityChannel = Radio.channel(Channels.SECURITY)

const APICollection = BaseCollection.extend({

  comparatorKey: 'createdAt',

  comparator: function (item1, item2) {
    let firstCreatedAt = item1.get(this.comparatorKey)
    let secondCreatedAt = item2.get(this.comparatorKey)

    if (firstCreatedAt !== secondCreatedAt)
      return (firstCreatedAt) ? -1 : 1

    return 0
  },

  parseRecords(resp, options) {
    return resp.content
  },

  sync(method, model, options) {
    options.beforeSend = function (xhr) {
      xhr.setRequestHeader('Authorization', SecurityChannel.request(SecurityEvents.GET_BEARER_TOKEN))
    }

    return Backbone.sync(method, model, options)
  },
})

export default APICollection
