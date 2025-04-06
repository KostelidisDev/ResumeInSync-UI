'use strict'

import RISView from "../../../RISView"
import DashboardTemplate from './DashboardTemplate.hbs'
import * as Channels from "../../../../constants/channels/Channels"
import * as DashboardEvents from '../../../../constants/channels/events/DashboardEvents'
import ProfileView from "./profile/ProfileView"
import CountsView from "./counts/CountsView"
import CountCollection from "../../../../collection/local/CountCollection"
import Count from "../../../../model/local/Count"
import { resolveTheme } from "../../../../util/DashboardCountThemeResolver"
import { resolveLink } from "../../../../util/DashboardCountLinkResolver"
import PublishSwitchView from "./publishSwitch/PublishSwitchView"
import Profile from "../../../../model/api/Profile"
import * as ResumeEvents from "../../../../constants/channels/events/ResumeEvents"
import * as SecurityEvents from "../../../../constants/channels/events/SecurityEvents"

const DashboardView = RISView.extend({

  template: DashboardTemplate,

  dashboardChannel: new Backbone.Radio.channel(Channels.DASHBOARD),
  resumeChannel: new Backbone.Radio.channel(Channels.RESUME),
  securityChannel: new Backbone.Radio.channel(Channels.SECURITY),

  events: {
    'click #downloadPdf': 'downloadPdf',
    'click #downloadJson': 'downloadJson',
    'click #downloadHtml': 'downloadHtml',
    'click #getHtmlIFrame': 'getHtmlIFrame',
    'click #uploadLinkedIn': 'uploadLinkedIn',
    'click #importZotero': 'importZotero',
    'click #reset': 'reset'
  },

  className: 'col-12',

  regions: {
    'profileRegion': '.profileRegion',
    'countsRegion': '.countsRegion',
    'publishSwitchRegion': '.publishSwitchRegion',
  },

  onRender() {
    this.dashboardChannel.request(DashboardEvents.GET)
      .then(dashboard => {
        const { profile, recordCounts } = dashboard

        return {
          profile,
          recordCounts
        }
      })
      .then(dashboard => {
        this.showChildView('publishSwitchRegion', new PublishSwitchView({
          model: new Profile(dashboard.profile)
        }))

        this.showChildView('profileRegion', new ProfileView({
          model: new Profile(dashboard.profile)
        }))

        Promise.resolve(Object.entries(dashboard.recordCounts))
          .then(records => {
            return records.map(record => {
              const name = record[0]
              const value = record[1]

              const { theme, icon } = resolveTheme(name)
              const link = resolveLink(name)

              const title = `resume.dashboard.counts.${name}`
              const count = value

              return {
                title,
                count,
                theme,
                icon,
                link
              }
            }).map(value => new Count(value))
          })
          .then(applicationFeatureItems => new CountCollection(applicationFeatureItems))
          .then(applicationFeatureItemCollection => new CountsView(
            {
              collection: applicationFeatureItemCollection
            }
          ))
          .then(applicationFeatureListView => this.showChildView(
            'countsRegion',
            applicationFeatureListView
          ))
      })
  },

  downloadPdf() {
    const profile = this.securityChannel.request(SecurityEvents.GET_PROFILE)
    return this.resumeChannel.request(ResumeEvents.DOWNLOAD_PDF, profile)
  },

  downloadJson() {
    const profile = this.securityChannel.request(SecurityEvents.GET_PROFILE)
    return this.resumeChannel.request(ResumeEvents.DOWNLOAD_JSON, profile)
  },

  downloadHtml() {
    const profile = this.securityChannel.request(SecurityEvents.GET_PROFILE)
    return this.resumeChannel.request(ResumeEvents.DOWNLOAD_HTML, profile)
  },

  getHtmlIFrame() {
    const profile = this.securityChannel.request(SecurityEvents.GET_PROFILE)
    return this.resumeChannel.request(ResumeEvents.GET_HTML_IFRAME, profile)
  },

  uploadLinkedIn() {
    const profile = this.securityChannel.request(SecurityEvents.GET_PROFILE)
    return this.resumeChannel.request(ResumeEvents.UPLOAD_LINKEDIN, profile)
      .then(() => this.onRender())
  },

  importZotero() {
    const profile = this.securityChannel.request(SecurityEvents.GET_PROFILE)
    return this.resumeChannel.request(ResumeEvents.IMPORT_ZOTERO, profile)
      .then(() => this.onRender())
  },

  reset() {
    const profile = this.securityChannel.request(SecurityEvents.GET_PROFILE)
    return this.resumeChannel.request(ResumeEvents.RESET, profile)
      .then(() => this.onRender())
  }
})

export default DashboardView
