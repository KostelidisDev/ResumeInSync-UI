'use strict'

import NavigationBarTemplate from './NavigationBarItemTemplate.hbs'
import RISItemView from '../../../RISItemView'

export default RISItemView.extend({

  template: NavigationBarTemplate,

  tagName: 'li',

  className: 'nav-item',

  serializeData() {
    return {
      'name': this.model.attributes.name,
      'icon': this.model.attributes.icon,
      'link': this.model.attributes.link
    }
  }
})
