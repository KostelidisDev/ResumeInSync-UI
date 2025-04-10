'use strict'

import * as Channels from "../constants/channels/Channels"
import * as DashboardEvents from "../constants/channels/events/DashboardEvents"
import * as SecurityEvents from '../constants/channels/events/SecurityEvents'
import * as HTTPMethods from "../constants/common/HTTPMethods"
import APIConfig from "../config/APIConfig"

const SecurityChannel = Backbone.Radio.channel(Channels.SECURITY)
const dashboardChannel = Backbone.Radio.channel(Channels.DASHBOARD)

export const getDashboard = () => {
  return Promise.resolve(
    $.ajax(
      {
        method: HTTPMethods.GET,
        url: `${APIConfig.API_FULL_PATH}/rpc/dashboard`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': SecurityChannel.request(SecurityEvents.GET_BEARER_TOKEN)
        },
      }
    )
  )
}

dashboardChannel.reply(DashboardEvents.GET, getDashboard)
