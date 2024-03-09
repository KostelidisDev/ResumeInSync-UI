'use strict'

import RISItemView from '../../../../RISItemView'
import VolunteerListItemTemplate from './VolunteerListItemTemplate.hbs'
import MomentUtil from "../../../../../util/MomentUtil"
import { openModalDialog, openModalForm } from "../../../../../util/ModalUtils"
import * as Languages from "../../../../../lang/Languages"
import VolunteerFormView from "../volunteerForm/VolunteerFormView"

const VolunteerListItemView = RISItemView.extend({

  template: VolunteerListItemTemplate,

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
      VolunteerFormView,
      this.model,
      Languages.resolveKey('resume.experiences.volunteer.update.title'),
      Languages.resolveKey('resume.experiences.volunteer.update.submit'),
      "btn-success pull-right",
      function () {
        if (this.isFormInvalid()) {
          return false
        }

        return this.storeVolunteerExperience()
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
      Languages.resolveKey('resume.experiences.volunteer.delete.title'),
      Languages.resolveKey('resume.experiences.volunteer.delete.body'),
      "warning",
      Languages.resolveKey('resume.experiences.volunteer.delete.submit'),
      () => {
        return this.model.destroy()
      },
      Languages.resolveKey('resume.experiences.volunteer.delete.cancel'),
      () => {
        return Promise.resolve()
      }
    )
  },
})

export default VolunteerListItemView
