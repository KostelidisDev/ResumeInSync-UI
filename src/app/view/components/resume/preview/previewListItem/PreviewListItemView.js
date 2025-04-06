'use strict'

import PreviewListItemTemplate from "./PreviewListItemTemplate.hbs"
import RISItemView from "../../../../RISItemView"
import * as ResumeEvents from "../../../../../constants/channels/events/ResumeEvents"
import * as Channels from "../../../../../constants/channels/Channels"

const PreviewListItemView = RISItemView.extend({

  template: PreviewListItemTemplate,

  resumeChannel: new Backbone.Radio.channel(Channels.RESUME),

  tagName: 'tr',

  className: 'text-center',

  events: {
    'click #downloadPdf': 'downloadPdf',
    'click #downloadJson': 'downloadJson',
    'click #downloadHtml': 'downloadHtml',
    'click #getHtmlIFrame': 'getHtmlIFrame',
  },

  downloadPdf() {
    return this.resumeChannel.request(ResumeEvents.DOWNLOAD_PDF, this.model)
  },

  downloadJson() {
    return this.resumeChannel.request(ResumeEvents.DOWNLOAD_JSON, this.model)
  },

  downloadHtml() {
    return this.resumeChannel.request(ResumeEvents.DOWNLOAD_HTML, this.model)
  },

  getHtmlIFrame() {
    return this.resumeChannel.request(ResumeEvents.GET_HTML_IFRAME, this.model)
  }
})

export default PreviewListItemView
