'use strict'

import RISView from '../../RISView'
import Radio from "backbone.radio"
import ResumesSingleTemplate from './ResumesSingleTemplate.hbs'
import * as Channels from "../../../constants/channels/Channels"
import * as ResumeEvents from "../../../constants/channels/events/ResumeEvents"
import user from "../../../model/api/User"
import User from "../../../model/api/User"
import * as ProfileEvents from "../../../constants/channels/events/ProfileEvents"
import Profile from "../../../model/api/Profile"

const ResumesView = RISView.extend({

  template: ResumesSingleTemplate,

  resumeChannel: new Radio.channel(Channels.RESUME),
  profileChannel: new Radio.channel(Channels.PROFILE),

  regions: {
    'resumesSingleRegion': '.resumesSingleRegion'
  },

  events: {
    'click #downloadPdf': 'downloadPdf',
    'click #downloadJson': 'downloadJson',
    'click #downloadHtml': 'downloadHtml',
    'click #getHtmlIFrame': 'getHtmlIFrame',
  },

  onRender() {
    return Promise.resolve(this)
    .then(({resumeChannel,model: {userId: userId}}) => resumeChannel.request(ResumeEvents.FETCH_HTML, userId))
    .then(html => this.showChildView('resumesSingleRegion', html))
  },

  downloadPdf() {
    const userId = this.model.userId
    return Promise.resolve(this.profileChannel.request(ProfileEvents.PUBLISHED))
      .then(profiles => profiles.filter(profile => {
        return profile.user.id === userId
      }))
      .then(profiles => profiles[0])
      .then(profile => new Profile(profile))
      .then(profile => this.resumeChannel.request(ResumeEvents.DOWNLOAD_PDF, profile))
  },

  downloadJson() {
    const userId = this.model.userId
    return Promise.resolve(this.profileChannel.request(ProfileEvents.PUBLISHED))
      .then(profiles => profiles.filter(profile => {
        return profile.user.id === userId
      }))
      .then(profiles => profiles[0])
      .then(profile => new Profile(profile))
      .then(profile => this.resumeChannel.request(ResumeEvents.DOWNLOAD_JSON, profile))
  },

  downloadHtml() {
    const userId = this.model.userId
    return Promise.resolve(this.profileChannel.request(ProfileEvents.PUBLISHED))
      .then(profiles => profiles.filter(profile => {
        return profile.user.id === userId
      }))
      .then(profiles => profiles[0])
      .then(profile => new Profile(profile))
      .then(profile => this.resumeChannel.request(ResumeEvents.DOWNLOAD_HTML, profile))
  },

  getHtmlIFrame() {
    const userId = this.model.userId
    return Promise.resolve(this.profileChannel.request(ProfileEvents.PUBLISHED))
      .then(profiles => profiles.filter(profile => {
        return profile.user.id === userId
      }))
      .then(profiles => profiles[0])
      .then(profile => new Profile(profile))
      .then(profile => this.resumeChannel.request(ResumeEvents.GET_HTML_IFRAME, profile))
  },
})

export default ResumesView
