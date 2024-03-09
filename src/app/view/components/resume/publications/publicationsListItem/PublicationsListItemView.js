'use strict'

import RISItemView from '../../../../RISItemView'
import CertificationListItemTemplate from './PublicationsListItemTemplate.hbs'
import MomentUtil from "../../../../../util/MomentUtil"
import { openModalDialog, openModalForm } from "../../../../../util/ModalUtils"
import * as Languages from "../../../../../lang/Languages"
import PublicationsFormView from "../publicationsForm/PublicationsFormView"

const PublicationsListItemView = RISItemView.extend({

  template: CertificationListItemTemplate,

  tagName: 'tr',

  className: 'text-center',

  events: {
    'click #edit': 'edit',
    'click #delete': 'delete'
  },

  serializeData() {
    this.model.attributes.formattedPublicationDate = MomentUtil.formatDateWithoutTime(this.model.attributes.publicationDate)
    return this.model.attributes
  },

  edit() {
    const $this = this

    return openModalForm(
      PublicationsFormView,
      this.model,
      Languages.resolveKey('resume.certifications.update.title'),
      Languages.resolveKey('resume.certifications.update.submit'),
      "btn-success pull-right",
      function () {
        if (this.isFormInvalid()) {
          return false
        }

        return this.storePublication()
          .then(working => {
            $this.model = working
            return $this.model
          })
          .then(() => $this.render())
      }
    )
  },

  delete() {
    return openModalDialog(
      Languages.resolveKey('resume.certifications.delete.title'),
      Languages.resolveKey('resume.certifications.delete.body'),
      "warning",
      Languages.resolveKey('resume.certifications.delete.submit'),
      () => {
        return this.model.destroy()
      },
      Languages.resolveKey('resume.certifications.delete.cancel'),
      () => {
        return Promise.resolve()
      }
    )
  },
})

export default PublicationsListItemView
