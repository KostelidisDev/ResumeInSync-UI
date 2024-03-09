'use strict'

import VolunteerFormTemplate from './VolunteerFormTemplate.hbs'
import RISView from "../../../../RISView"
import VolunteerExperienceRules from "../../../../../constants/validationRules/VolunteerExperienceRules"
import * as Languages from "../../../../../lang/Languages"
import VolunteerExperience from "../../../../../model/api/VolunteerExperience"

const VolunteerFormView = RISView.extend({

  template: VolunteerFormTemplate,

  volunteerForm: '#volunteerForm',

  onRender() {
    this.addFormValidation()
  },

  serialize() {
    const id = (this.model)
      ? this.model.id
      : null

    const role = this.$('#role')
      .val()
    const description = this.$('#description')
      .val()
    const organization = this.$('#organization')
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
      role,
      description,
      organization,
      location,
      dateRange: {
        startDate: startDate,
        endDate: endDate
      },
      currently
    }
  },

  storeVolunteerExperience() {
    return Promise.resolve(this.serialize())
      .then(data => {
        const volunteer = (this.model)
          ? this.model
          : new VolunteerExperience()

        volunteer.attributes = data

        return volunteer.save()
          .then(a => {
            volunteer.attributes = a
            return volunteer
          })
      })
  },

  isFormInvalid() {
    return !(this.isFormValid())
  },

  isFormValid() {
    return this.$(this.volunteerForm)
      .valid()
  },

  addFormValidation() {
    this.$(this.volunteerForm)
      .validate({
        rules: {
          role: {
            required: true,
            minlength: VolunteerExperienceRules.VOLUNTEER_ROLE_MIN,
            maxlength: VolunteerExperienceRules.VOLUNTEER_ROLE_MAX,
          },
          description: {
            minlength: VolunteerExperienceRules.VOLUNTEER_DESCRIPTION_MIN,
            maxlength: VolunteerExperienceRules.VOLUNTEER_DESCRIPTION_MAX,
          },
          organization: {
            required: true,
            minlength: VolunteerExperienceRules.VOLUNTEER_ORGANIZATION_MIN,
            maxlength: VolunteerExperienceRules.VOLUNTEER_ORGANIZATION_MAX,
          },
          location: {
            required: true,
            minlength: VolunteerExperienceRules.VOLUNTEER_LOCATION_MIN,
            maxlength: VolunteerExperienceRules.VOLUNTEER_LOCATION_MAX,
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
          role: {
            required: Languages.resolveKey('resume.experiences.volunteer.form.role.required'),
            minlength: Languages.resolveKey('resume.experiences.volunteer.form.role.length.min'),
            maxlength: Languages.resolveKey('resume.experiences.volunteer.form.role.length.max'),
          },
          description: {
            minlength: Languages.resolveKey('resume.experiences.volunteer.form.description.length.min'),
            maxlength: Languages.resolveKey('resume.experiences.volunteer.form.description.length.max'),
          },
          organization: {
            required: Languages.resolveKey('resume.experiences.volunteer.form.organization.required'),
            minlength: Languages.resolveKey('resume.experiences.volunteer.form.organization.length.min'),
            maxlength: Languages.resolveKey('resume.experiences.volunteer.form.organization.length.max'),
          },
          location: {
            required: Languages.resolveKey('resume.experiences.volunteer.form.location.required'),
            minlength: Languages.resolveKey('resume.experiences.volunteer.form.location.length.min'),
            maxlength: Languages.resolveKey('resume.experiences.volunteer.form.location.length.max'),
          },
          startDate: {
            required: Languages.resolveKey('resume.experiences.volunteer.form.startDate.required'),
          },
        }
      })
  }
})

export default VolunteerFormView
