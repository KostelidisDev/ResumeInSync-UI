'use strict'

import EducationListTemplate from './EducationListTemplate.hbs'
import RISViewCollection from '../../../../RISViewCollection'
import EducationListItemView from "../educationListItem/EducationListItemView"
import { openModalForm } from "../../../../../util/ModalUtils"
import * as Languages from "../../../../../lang/Languages"
import EducationFormView from "../educationForm/EducationFormView"

const EducationListView = RISViewCollection.extend({

  template: EducationListTemplate,

  tagName: 'span',

  className: 'row col-12',

  childView: EducationListItemView,

  childViewContainer: '.educationList',

  events: {
    'click #add': 'add'
  },

  add() {
    const $this = this
    const passData = null

    return openModalForm(
      EducationFormView,
      passData,
      Languages.resolveKey('resume.education.add.title'),
      Languages.resolveKey('resume.education.add.submit'),
      "btn-success pull-right",
      function () {
        if (this.isFormInvalid()) {
          return false
        }

        this.storeEducation()
          .then(education => $this.collection.add(education))
      }
    )
  },
})

export default EducationListView
