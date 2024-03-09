'use strict'

import RISView from "../../../../RISView"
import AvatarTemplate from './AvatarTemplate.hbs'

const AvatarView = RISView.extend({

  template: AvatarTemplate,

  tagName: 'span',

  serializeData() {
    const { avatar, firstName, lastName } = this.model.attributes
    const name = `${firstName}+${lastName}`
    const avatarSize = 128
    
    let avatarToRender = avatar
    if (avatarToRender === "") {
      avatarToRender = `https://eu.ui-avatars.com/api/?&name=${name}&size=${avatarSize}`
    }

    this.model.attributes.avatarToRender = avatarToRender
    return this.model.attributes
  }
})

export default AvatarView
