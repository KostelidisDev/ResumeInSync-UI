'use strict'

import RISView from '../../RISView'
import FooterBarTemplate from './FooterBarTemplate.hbs'
import ChangeLanguageView from '../changeLanguage/ChangeLanguageView'

const FooterBarView = RISView.extend({

  template: FooterBarTemplate,

  regions: {
    'changeLanguageRegion': '.changeLanguageRegion'
  },

  attributes: {
    'style': 'margin-top:10px'
  },

  onRender() {
    this.showChildView('changeLanguageRegion', new ChangeLanguageView())
  }
})

export default FooterBarView
