'use strict'

import RISView from '../../RISView'
import ResumesTemplate from './ResumesTemplate.hbs'
import PreviewListView from "../../components/resume/preview/previewList/PreviewListView"
import ProfileCollection from "../../../collection/local/ProfileCollections"
import * as Channels from "../../../constants/channels/Channels"
import * as ProfileEvents from "../../../constants/channels/events/ProfileEvents"

const ResumesView = RISView.extend({

  template: ResumesTemplate,

  profileChannel: new Backbone.Radio.channel(Channels.PROFILE),

  regions: {
    'resumesRegion': '.resumesRegion'
  },

  onRender() {
    return Promise.resolve(this.profileChannel.request(ProfileEvents.PUBLISHED))
      .then(items => new ProfileCollection(items))
      .then(collection => new PreviewListView({
        collection
      }))
      .then(resumesView => this.showChildView('resumesRegion', resumesView))
  }
})

export default ResumesView
