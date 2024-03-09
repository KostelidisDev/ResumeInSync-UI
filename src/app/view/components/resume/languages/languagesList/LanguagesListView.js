'use strict'

import LanguagesListTemplate from './LanguagesListTemplate.hbs'
import RISViewCollection from '../../../../RISViewCollection'
import { openModalForm } from "../../../../../util/ModalUtils"
import * as Languages from "../../../../../lang/Languages"
import LanguagesListItemView from "../languagesListItem/LanguagesListItemView"
import LanguagesFormView from "../languagesForm/LanguagesFormView"
import Radio from "backbone.radio"
import * as Channels from "../../../../../constants/channels/Channels"
import * as LanguageProficiencyEvents from "../../../../../constants/channels/events/LanguageProficiencyEvents"

const LanguagesListView = RISViewCollection.extend({

  template: LanguagesListTemplate,

  tagName: 'span',

  className: 'row col-12',

  childView: LanguagesListItemView,

  childViewContainer: '.languageList',

  languageProficiencyChannel: new Radio.channel(Channels.LANGUAGE_PROFICIENCY),

  events: {
    'click #add': 'add'
  },

  add() {
    const $this = this

    return openModalForm(
      LanguagesFormView,
      null,
      Languages.resolveKey('resume.languages.add.title'),
      Languages.resolveKey('resume.languages.add.submit'),
      "btn-success pull-right",
      function () {
        if (this.isFormInvalid()) {
          return false
        }

        this.storeLanguage()
          .then(language => $this.collection.add(language))
      }
    )
  },
})

export default LanguagesListView
