'use strict'

import RISView from '../../RISView'
import ResumesSingleTemplate from './ResumesSingleTemplate.hbs'
import * as Channels from "../../../constants/channels/Channels"
import * as ResumeEvents from "../../../constants/channels/events/ResumeEvents"
import * as ProfileEvents from "../../../constants/channels/events/ProfileEvents"
import Profile from "../../../model/api/Profile"
import * as Languages from '../../../lang/Languages'
import Swal from 'sweetalert2'

const ResumesView = RISView.extend({

  template: ResumesSingleTemplate,

  resumeChannel: new Backbone.Radio.channel(Channels.RESUME),
  profileChannel: new Backbone.Radio.channel(Channels.PROFILE),

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

  getProfile() {
    const userId = this.model.userId
    return Promise.resolve(this.profileChannel.request(ProfileEvents.PUBLISHED))
    .then(profiles => profiles.filter(profile => {
      return profile.user.id === userId
    }))
    .then(profiles => profiles[0])
    .then(profile => new Profile(profile))
  },

  downloadPdf() {
    return this.getProfile().then(profile => this.resumeChannel.request(ResumeEvents.DOWNLOAD_PDF, profile))
      .catch(() => Swal.fire(
        '',
        Languages.resolveKey('resume.error.pdf'),
        'info'
      ))
  },

  downloadJson() {
    return this.getProfile().then(profile => this.resumeChannel.request(ResumeEvents.DOWNLOAD_JSON, profile))
    .catch(() => Swal.fire(
      '',
      Languages.resolveKey('resume.error.json'),
      'info'
    ))
  },

  downloadHtml() {
    return this.getProfile().then(profile => this.resumeChannel.request(ResumeEvents.DOWNLOAD_HTML, profile))
    .catch(() => Swal.fire(
      '',
      Languages.resolveKey('resume.error.html'),
      'info'
    ))
  },

  getHtmlIFrame() {
    return this.getProfile().then(profile => this.resumeChannel.request(ResumeEvents.GET_HTML_IFRAME, profile))
    .catch(() => Swal.fire(
      '',
      Languages.resolveKey('resume.error.iFrame'),
      'info'
    ))
  },
})

export default ResumesView
