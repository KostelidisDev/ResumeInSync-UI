'use strict'

import SkeletonTemplate from './SkeletonTemplate.hbs'
import RISView from '../../RISView'
import NavigationBarView from '../../components/navigationBar/NavigationBarView'
import FooterBarView from '../../components/footerBar/FooterBarView'

const SkeletonView = RISView.extend({

  template: SkeletonTemplate,

  regions: {
    'navigationBarRegion': '.navigationBarRegion',
    'mainRegion': '.mainRegion',
    'footerBarRegion': '.footerBarRegion',
  },

  onRender() {
    this.showChildView('navigationBarRegion', new NavigationBarView({
      model: {
        user: this.model.user
      }
    }))
    this.showChildView('mainRegion', this.model.main)
    this.showChildView('footerBarRegion', new FooterBarView())
  }
})

export default SkeletonView
