'use strict'

import RISView from './../../../../RISView'
import ProfileTemplate from './ProfileTemplate.hbs'
import AvatarView from "../avatar/AvatarView"

const ProfileView = RISView.extend({

  template: ProfileTemplate,

  className: 'row bg-primary dashboard-profile',

  regions: {
    'avatarRegion': '.avatarRegion'
  },

  onRender() {
    this.showChildView('avatarRegion', new AvatarView({
      model: {
        attributes: {
          avatar: this.model.get('avatar'),
          firstName: this.model.get('firstName'),
          lastName: this.model.get('lastName'),
        }
      }
    }))
  }
})

export default ProfileView
