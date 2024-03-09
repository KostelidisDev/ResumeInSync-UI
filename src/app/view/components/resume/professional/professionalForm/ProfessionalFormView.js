'use strict'

import ProfessionalFormTemplate from './ProfessionalFormTemplate.hbs'
import RISView from "../../../../RISView"
import ProfessionalExperienceRules from "../../../../../constants/validationRules/ProfessionalExperienceRules"
import * as Languages from "../../../../../lang/Languages"
import ProfessionalExperience from "../../../../../model/api/ProfessionalExperience"

const ProfessionalFormView = RISView.extend({

  template: ProfessionalFormTemplate,

  professionalForm: '#professionalForm',

  onRender() {
    this.addFormValidation()
  },

  serialize() {
    const id = (this.model)
      ? this.model.id
      : null

    const title = this.$('#title')
      .val()
    const description = this.$('#description')
      .val()
    const company = this.$('#company')
      .val()
    const location = this.$('#location')
      .val()
    const startDate = this.$('#startDate')
      .val()
    const endDate = this.$('#endDate')
      .val()
    const currently = (this.$('#currently')[0].checked)
    
    return {
      id,
      title,
      description,
      company,
      location,
      dateRange: {
        startDate: startDate,
        endDate: endDate
      },
      currently
    }
  },

  storeProfessionalExperience() {
    return Promise.resolve(this.serialize())
      .then(data => {
        const professional = (this.model)
          ? this.model
          : new ProfessionalExperience()

        professional.attributes = data

        return professional.save()
          .then(a => {
            professional.attributes = a
            return professional
          })
      })
  },

  isFormInvalid() {
    return !(this.isFormValid())
  },

  isFormValid() {
    return this.$(this.professionalForm)
      .valid()
  },

  addFormValidation() {
    this.$(this.professionalForm)
      .validate({
        rules: {
          title: {
            required: true,
            minlength: ProfessionalExperienceRules.PROFESSIONAL_TITLE_MIN,
            maxlength: ProfessionalExperienceRules.PROFESSIONAL_TITLE_MAX,
          },
          description: {
            minlength: ProfessionalExperienceRules.PROFESSIONAL_DESCRIPTION_MIN,
            maxlength: ProfessionalExperienceRules.PROFESSIONAL_DESCRIPTION_MAX,
          },
          company: {
            required: true,
            minlength: ProfessionalExperienceRules.PROFESSIONAL_COMPANY_MIN,
            maxlength: ProfessionalExperienceRules.PROFESSIONAL_COMPANY_MAX,
          },
          location: {
            required: true,
            minlength: ProfessionalExperienceRules.PROFESSIONAL_LOCATION_MIN,
            maxlength: ProfessionalExperienceRules.PROFESSIONAL_LOCATION_MAX,
          },
          startDate: {
            required: true,
          },
          endDate: {
            required: false,
          },
          currently: {
            required: false,
          },
        },
        messages: {
          title: {
            required: Languages.resolveKey('resume.experiences.professional.form.title.required'),
            minlength: Languages.resolveKey('resume.experiences.professional.form.title.length.min'),
            maxlength: Languages.resolveKey('resume.experiences.professional.form.title.length.max'),
          },
          description: {
            minlength: Languages.resolveKey('resume.experiences.professional.form.description.length.min'),
            maxlength: Languages.resolveKey('resume.experiences.professional.form.description.length.max'),
          },
          company: {
            required: Languages.resolveKey('resume.experiences.professional.form.company.required'),
            minlength: Languages.resolveKey('resume.experiences.professional.form.company.length.min'),
            maxlength: Languages.resolveKey('resume.experiences.professional.form.company.length.max'),
          },
          location: {
            required: Languages.resolveKey('resume.experiences.professional.form.location.required'),
            minlength: Languages.resolveKey('resume.experiences.professional.form.location.length.min'),
            maxlength: Languages.resolveKey('resume.experiences.professional.form.location.length.max'),
          },
          startDate: {
            required: Languages.resolveKey('resume.experiences.professional.form.startDate.required'),
          },
        }
      })
  }
})

export default ProfessionalFormView
