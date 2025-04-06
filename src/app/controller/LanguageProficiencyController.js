'use strict'

import * as Channels from "../constants/channels/Channels"
import * as SecurityEvents from '../constants/channels/events/SecurityEvents'
import * as HTTPMethods from "../constants/common/HTTPMethods"
import APIConfig from "../config/APIConfig"
import * as LanguageProficiencyEvents from "../constants/channels/events/LanguageProficiencyEvents"

const SecurityChannel = Backbone.Radio.channel(Channels.SECURITY)
const languageProficiencyChannel = Backbone.Radio.channel(Channels.LANGUAGE_PROFICIENCY)

export const getLanguageProficiencies = () => {
  return Promise.resolve(
    $.ajax(
      {
        method: HTTPMethods.GET,
        url: `${APIConfig.API_FULL_PATH}/rpc/language/proficiency/`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': SecurityChannel.request(SecurityEvents.GET_BEARER_TOKEN)
        },
      }
    )
  )
}

languageProficiencyChannel.reply(LanguageProficiencyEvents.GET, getLanguageProficiencies)
