'use strict'

import BaseModel from '../BaseModel'
import Radio from 'backbone.radio'
import * as Channels from '../../constants/channels/Channels'
import * as SecurityEvents from '../../constants/channels/events/SecurityEvents'
import * as Backbone from 'backbone'

const SecurityChannel = Radio.channel(Channels.SECURITY)

const APIModel = BaseModel.extend({

  sync(method, model, options) {
    options.beforeSend = function (xhr) {
      xhr.setRequestHeader('Authorization', SecurityChannel.request(SecurityEvents.GET_BEARER_TOKEN))
    }

    const updatedModel = this.setUser(model)

    return Backbone.sync(method, updatedModel, options)
  },

  setUser(model) {
    const userId = SecurityChannel.request(SecurityEvents.GET_USER_ID)

    model.attributes.user = {
      'id': userId
    }

    return model
  }
})

export default APIModel
