'use strict'

import RISItemView from '../../../../RISItemView'
import ProfessionalListItemTemplate from './ProfessionalListItemTemplate.hbs'
import MomentUtil from "../../../../../util/MomentUtil"
import { openModalDialog, openModalForm } from "../../../../../util/ModalUtils"
import ProfessionalFormView from "../professionalForm/ProfessionalFormView"
import * as Languages from "../../../../../lang/Languages"

const ProfessionalListItemView = RISItemView.extend({

  template: ProfessionalListItemTemplate,

  tagName: 'tr',

  className: 'text-center',

  events: {
    'click #edit': 'edit',
    'click #delete': 'delete'
  },

  serializeData() {
    this.model.attributes.formattedDateRange = {
      startDate: MomentUtil.formatDateWithoutTime(this.model.attributes.dateRange.startDate),
      endDate: MomentUtil.formatDateWithoutTime(this.model.attributes.dateRange.endDate)
    }

    this.model.attributes.formattedCurrently = (this.model.attributes.currently)
      ? 1
      : 0

    if (this.model.attributes.formattedCurrently) {
      this.model.attributes.formattedDateRange.endDate = ""
    }

    return this.model.attributes
  },

  edit() {
    const $this = this

    return openModalForm(
      ProfessionalFormView,
      this.model,
      Languages.resolveKey('resume.experiences.professional.update.title'),
      Languages.resolveKey('resume.experiences.professional.update.submit'),
      "btn-success pull-right",
      function () {
        if (this.isFormInvalid()) {
          return false
        }

        return this.storeProfessionalExperience()
          .then(professional => {
            $this.model = professional
            return $this.model
          })
          .then(() => $this.render())
      }
    )
  },

  delete() {
    return openModalDialog(
      Languages.resolveKey('resume.experiences.professional.delete.title'),
      Languages.resolveKey('resume.experiences.professional.delete.body'),
      "warning",
      Languages.resolveKey('resume.experiences.professional.delete.submit'),
      () => {
        return this.model.destroy()
      },
      Languages.resolveKey('resume.experiences.professional.delete.cancel'),
      () => {
        return Promise.resolve()
      }
    )
  },
})

export default ProfessionalListItemView
