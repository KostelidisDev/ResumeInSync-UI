'use strict'

import VolunteerListTemplate from './VolunteerListTemplate.hbs'
import RISViewCollection from '../../../../RISViewCollection'
import { openModalForm } from "../../../../../util/ModalUtils"
import * as Languages from "../../../../../lang/Languages"
import VolunteerListItemView from "../volunteerListItem/VolunteerListItemView"
import VolunteerFormView from "../volunteerForm/VolunteerFormView"

const VolunteerListView = RISViewCollection.extend({

  template: VolunteerListTemplate,

  tagName: 'span',

  className: 'row col-12',

  childView: VolunteerListItemView,

  childViewContainer: '.volunteerList',

  events: {
    'click #add': 'add'
  },

  add() {
    const $this = this
    const passData = null

    return openModalForm(
      VolunteerFormView,
      passData,
      Languages.resolveKey('resume.experiences.volunteer.add.title'),
      Languages.resolveKey('resume.experiences.volunteer.add.submit'),
      "btn-success pull-right",
      function () {
        if (this.isFormInvalid()) {
          return false
        }

        this.storeVolunteerExperience()
          .then(volunteer => $this.collection.add(volunteer))
      }
    )
  },
})

export default VolunteerListView
