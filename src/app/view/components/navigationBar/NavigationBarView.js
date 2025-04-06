'use strict'

import NavigationBarTemplate from './NavigationBarTemplate.hbs'
import RISView from '../../RISView'
import NavigationBarListView from './navigationBarList/NavigationBarListView'
import NavigationBarCollection from '../../../collection/local/NavigationBarCollection'
import NavigationBarItems from '../../../constants/navigationBar/NavigationBarItems'

const NavigationBarView = RISView.extend({

  template: NavigationBarTemplate,

  tagName: 'nav',

  className: 'navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark',

  regions: {
    'navBarRegion': '.navBarRegion'
  },

  onRender() {
    Promise.resolve(NavigationBarItems)
      .then(navBarItems => new NavigationBarCollection(navBarItems))
      .then(navBarCollection => new NavigationBarListView(
        {
          collection: navBarCollection,
          model: {
            user: (
              _.isNull(this.model) || _.isNull(this.model.user)
            )
              ? null
              : this.model.user
          }
        }
      ))
      .then(navBarListView => this.showChildView('navBarRegion', navBarListView))
  },
})

export default NavigationBarView
