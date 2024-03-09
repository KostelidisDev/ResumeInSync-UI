'use strict'

import RISView from '../../RISView'
import ChangeLanguageTemplate from './ChangeLanguageTemplate.hbs'
import * as Languages from '../../../lang/Languages'

const ChangeLanguageView = RISView.extend({

  template: ChangeLanguageTemplate,

  className: 'col-xs-12',

  events: {
    'change .changeLanguage': 'changeLanguage'
  },

  onRender() {
    const availableLanguages = Languages.getAvailableLanguages()
    const selectedLanguage = Languages.getSelectedLanguage()

    this.$('.changeLanguage')
      .selectize({
        persist: true,
        valueField: 'id',
        labelField: 'language',
        searchField: ['id', 'language'],
        options: availableLanguages,
        items: [selectedLanguage],
        onItemRemove: function (value) {
          this.addItem(value, true)
          this.refreshItems()
        }
      })
  },

  changeLanguage(e) {
    e.preventDefault()

    const selectedLanguage = this.$('.changeLanguage')
      .val()

    if (selectedLanguage === '') {
      return
    }

    const oldSelectedLanguage = Languages.getCurrentLanguageId()

    if (selectedLanguage === oldSelectedLanguage) {
      return
    }

    Promise.resolve(Languages.changeLanguage(selectedLanguage))
      .then(() => window.location.reload())
  },
})

export default ChangeLanguageView
