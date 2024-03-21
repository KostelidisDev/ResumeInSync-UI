'use strict'

import SkillFormTemplate from './SkillsFormTemplate.hbs'
import RISView from "../../../../RISView"
import SkillsRules from "../../../../../constants/validationRules/SkillsRules"
import * as Languages from "../../../../../lang/Languages"
import Skill from "../../../../../model/api/Skill"

const SkillsFormView = RISView.extend({

  template: SkillFormTemplate,

  workingForm: '#skillForm',

  onRender() {
    this.addFormValidation()
  },

  serialize() {
    const id = (this.model)
      ? this.model.id
      : null

    const name = this.$('#name')
      .val()

    return {
      id,
      name,
    }
  },

  storeSkill() {
    return Promise.resolve(this.serialize())
      .then(data => {
        const working = (this.model)
          ? this.model
          : new Skill()

        working.attributes = data

        return working.save()
          .then(a => {
            working.attributes = a
            return working
          })
      })
  },

  isFormInvalid() {
    return !(this.isFormValid())
  },

  isFormValid() {
    return this.$(this.workingForm)
      .valid()
  },

  addFormValidation() {
    this.$(this.workingForm)
      .validate({
        rules: {
          name: {
            required: true,
            minlength: SkillsRules.SKILLS_NAME_MIN,
            maxlength: SkillsRules.SKILLS_NAME_MAX,
          },
        },
        messages: {
          name: {
            required: Languages.resolveKey('resume.skills.form.name.required'),
            minlength: Languages.resolveKey('resume.skills.form.name.length.min'),
            maxlength: Languages.resolveKey('resume.skills.form.name.length.max'),
          },
          description: {
            minlength: Languages.resolveKey('resume.skills.form.description.length.min'),
            maxlength: Languages.resolveKey('resume.skills.form.description.length.max'),
          },
        },
      })
  }
})

export default SkillsFormView
