'use strict'

import ProfessionalListTemplate from './ProfessionalListTemplate.hbs'
import RISViewCollection from '../../../../RISViewCollection'
import { openModalForm } from "../../../../../util/ModalUtils"
import ProfessionalListItemView from "../professionalListItem/ProfessionalListItemView"
import ProfessionalFormView from "../professionalForm/ProfessionalFormView"
import * as Languages from "../../../../../lang/Languages"

const ProfessionalListView = RISViewCollection.extend({

  template: ProfessionalListTemplate,

  tagName: 'span',

  className: 'row col-12',

  childView: ProfessionalListItemView,

  childViewContainer: '.professionalList',

  events: {
    'click #add': 'add'
  },

  add() {
    const $this = this
    const passData = null

    return openModalForm(
      ProfessionalFormView,
      passData,
      Languages.resolveKey('resume.experiences.professional.add.title'),
      Languages.resolveKey('resume.experiences.professional.add.submit'),
      "btn-success pull-right",
      function () {
        if (this.isFormInvalid()) {
          return false
        }

        this.storeProfessionalExperience()
          .then(professional => $this.collection.add(professional))
          .then(() => $this.collection.sort())
      }
    )
  },
})

export default ProfessionalListView
