'use strict'

import Radio from "backbone.radio"
import * as Channels from "../constants/channels/Channels"
import $ from "jquery"
import * as SecurityEvents from '../constants/channels/events/SecurityEvents'
import * as HTTPMethods from "../constants/common/HTTPMethods"
import APIConfig from "../config/APIConfig"
import * as ProfileEvents from "../constants/channels/events/ProfileEvents"

const SecurityChannel = Radio.channel(Channels.SECURITY)
const profileChannel = Radio.channel(Channels.PROFILE)

export const publish = () => {
  return Promise.resolve(
    $.ajax(
      {
        method: HTTPMethods.POST,
        url: `${APIConfig.API_FULL_PATH}/rpc/profile/publish`,
        headers: {
          'Authorization': SecurityChannel.request(SecurityEvents.GET_BEARER_TOKEN)
        },
      }
    )
  )
}

export const unpublish = () => {
  return Promise.resolve(
    $.ajax(
      {
        method: HTTPMethods.POST,
        url: `${APIConfig.API_FULL_PATH}/rpc/profile/unpublish`,
        headers: {
          'Authorization': SecurityChannel.request(SecurityEvents.GET_BEARER_TOKEN)
        },
      }
    )
  )
}

export const published = () => {
  return Promise.resolve(
    $.ajax(
      {
        method: HTTPMethods.GET,
        url: `${APIConfig.API_FULL_PATH}/rpc/profile/published`,
      }
    )
  )
}

profileChannel.reply(ProfileEvents.PUBLISH, publish)
profileChannel.reply(ProfileEvents.UNPUBLISH, unpublish)
profileChannel.reply(ProfileEvents.PUBLISHED, published)
