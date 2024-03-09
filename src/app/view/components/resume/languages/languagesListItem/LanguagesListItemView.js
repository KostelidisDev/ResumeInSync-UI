'use strict'

import RISItemView from '../../../../RISItemView'
import LanguagesListItemTemplate from './LanguagesListItemTemplate.hbs'
import { openModalDialog, openModalForm } from "../../../../../util/ModalUtils"
import * as Languages from "../../../../../lang/Languages"
import LanguagesFormView from "../languagesForm/LanguagesFormView"

const LanguagesListItemView = RISItemView.extend({

  template: LanguagesListItemTemplate,

  tagName: 'tr',

  className: 'text-center',

  events: {
    'click #edit': 'edit',
    'click #delete': 'delete'
  },

  serializeData() {
    return this.model.attributes
  },

  edit() {
    const $this = this

    return openModalForm(
      LanguagesFormView,
      this.model,
      Languages.resolveKey('resume.languages.update.title'),
      Languages.resolveKey('resume.languages.update.submit'),
      "btn-success pull-right",
      function () {
        if (this.isFormInvalid()) {
          return false
        }

        return this.storeLanguage()
          .then(language => {
            $this.model = language
            return $this.model
          })
          .then(() => $this.render())
      }
    )
  },

  delete() {
    return openModalDialog(
      Languages.resolveKey('resume.languages.delete.title'),
      Languages.resolveKey('resume.languages.delete.body'),
      "warning",
      Languages.resolveKey('resume.languages.delete.submit'),
      () => {
        return this.model.destroy()
      },
      Languages.resolveKey('resume.languages.delete.cancel'),
      () => {
        return Promise.resolve()
      }
    )
  },
})

export default LanguagesListItemView
