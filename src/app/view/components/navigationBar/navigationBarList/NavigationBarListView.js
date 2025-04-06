'use strict'

import NavigationBarTemplate from './NavigationBarListTemplate.hbs'
import RISViewCollection from '../../../RISViewCollection'
import NavigationBarItemView from '../navigationBarItem/NavigationBarItemView'
import * as VisibilityOptions from '../../../../constants/navigationBar/VisibilityOptions'

const NavigationBarListView = RISViewCollection.extend({

  template: NavigationBarTemplate,

  tagName: 'span',

  childView: NavigationBarItemView,

  childViewContainer: '.navigationBarItems',

  viewFilter(view) {
    const roles = (
      _.isNull(this.model) || _.isNull(this.model.user)
    )
      ? []
      : this.model.user.get('roles')

    return VisibilityOptions.showObject(view.model.attributes.visibility, roles)
  }
})


export default NavigationBarListView
