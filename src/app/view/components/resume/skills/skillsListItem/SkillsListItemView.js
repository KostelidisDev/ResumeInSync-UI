'use strict'

import RISItemView from '../../../../RISItemView'
import SkillListItemTemplate from './SkillsListItemTemplate.hbs'
import { openModalDialog, openModalForm } from "../../../../../util/ModalUtils"
import * as Languages from "../../../../../lang/Languages"
import SkillsFormView from "../skillsForm/SkillsFormView"

const SkillsListItemView = RISItemView.extend({

  template: SkillListItemTemplate,

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
      SkillsFormView,
      this.model,
      Languages.resolveKey('resume.skills.update.title'),
      Languages.resolveKey('resume.skills.update.submit'),
      "btn-success pull-right",
      function () {
        if (this.isFormInvalid()) {
          return false
        }

        return this.storeSkill()
          .then(skill => {
            $this.model = skill
            return $this.model
          })
          .then(() => $this.render())
      }
    )
  },

  delete() {
    return openModalDialog(
      Languages.resolveKey('resume.skills.delete.title'),
      Languages.resolveKey('resume.skills.delete.body'),
      "warning",
      Languages.resolveKey('resume.skills.delete.submit'),
      () => {
        return this.model.destroy()
      },
      Languages.resolveKey('resume.skills.delete.cancel'),
      () => {
        return Promise.resolve()
      }
    )
  },
})

export default SkillsListItemView
