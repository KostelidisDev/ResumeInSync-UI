'use strict'

import RISItemView from '../../../../RISItemView'
import EducationListItemTemplate from './EducationListItemTemplate.hbs'
import MomentUtil from "../../../../../util/MomentUtil"
import { openModalDialog, openModalForm } from "../../../../../util/ModalUtils"
import * as Languages from "../../../../../lang/Languages"
import EducationFormView from "../educationForm/EducationFormView"

const EducationListItemView = RISItemView.extend({

  template: EducationListItemTemplate,

  tagName: 'tr',

  className: 'text-center',

  events: {
    'click #edit': 'edit',
    'click #delete': 'delete'
  },

  serializeData() {
    this.model.attributes.formattedDateRange = MomentUtil.formatDateRangeWithoutTime(this.model.get('dateRange'))

    return this.model.attributes
  },

  edit() {
    const $this = this

    return openModalForm(
      EducationFormView,
      this.model,
      Languages.resolveKey('resume.education.update.title'),
      Languages.resolveKey('resume.education.update.submit'),
      "btn-success pull-right",
      function () {
        if (this.isFormInvalid()) {
          return false
        }

        return this.storeEducation()
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
      Languages.resolveKey('resume.education.delete.title'),
      Languages.resolveKey('resume.education.delete.body'),
      "warning",
      Languages.resolveKey('resume.education.delete.submit'),
      () => {
        return this.model.destroy()
      },
      Languages.resolveKey('resume.education.delete.cancel'),
      () => {
        return Promise.resolve()
      }
    )
  },
})

export default EducationListItemView
