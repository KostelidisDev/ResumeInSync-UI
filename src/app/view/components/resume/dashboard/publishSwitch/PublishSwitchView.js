'use strict'

import RISView from "../../../../RISView"
import PublishSwitchTemplate from './PublishSwitchTemplate.hbs'
import Radio from "backbone.radio"
import * as Channels from "../../../../../constants/channels/Channels"
import * as ProfileEvents from "../../../../../constants/channels/events/ProfileEvents"
import Swal from "sweetalert2"
import * as Languages from "../../../../../lang/Languages"

const PublishSwitchView = RISView.extend({

  template: PublishSwitchTemplate,

  profileChannel: new Radio.channel(Channels.PROFILE),

  className: "row",

  events: {
    'click #publish-switch': 'publishTrigger'
  },

  publishTrigger() {
    return Promise.resolve(this.$('#publish-switch')[0])
      .then(({checked: toPublish}) => {
        return Promise.resolve((toPublish)
          ? ProfileEvents.PUBLISH
          : ProfileEvents.UNPUBLISH)
          .then(eventToTrigger => this.profileChannel.request(eventToTrigger))
          .then(() => {
            const successMessageBaseKey = (toPublish)
              ? 'profile.success.publish'
              : 'profile.success.unpublish'

            return Swal.fire(
              Languages.resolveKey(`${successMessageBaseKey}.title`),
              '',
              'success'
            )
          })
          .catch(error => {
            return Swal.fire(
              Languages.resolveKey('profile.error.publishChange.title'),
              '',
              'error'
            )
          })
      })
  }
})

export default PublishSwitchView
