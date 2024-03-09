'use strict'

import SkillListTemplate from './SkillsListTemplate.hbs'
import RISViewCollection from '../../../../RISViewCollection'
import { openModalForm } from "../../../../../util/ModalUtils"
import * as Languages from "../../../../../lang/Languages"
import SkillsListItemView from "../skillsListItem/SkillsListItemView"
import SkillsFormView from "../skillsForm/SkillsFormView"

const SkillsListView = RISViewCollection.extend({

  template: SkillListTemplate,

  tagName: 'span',

  className: 'row col-12',

  childView: SkillsListItemView,

  childViewContainer: '.skillList',

  events: {
    'click #add': 'add'
  },

  add() {
    const $this = this
    const passData = null

    return openModalForm(
      SkillsFormView,
      passData,
      Languages.resolveKey('resume.skills.add.title'),
      Languages.resolveKey('resume.skills.add.submit'),
      "btn-success pull-right",
      function () {
        if (this.isFormInvalid()) {
          return false
        }

        this.storeSkill()
          .then(skill => $this.collection.add(skill))
      }
    )
  },
})

export default SkillsListView
