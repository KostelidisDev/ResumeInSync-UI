'use strict'

import EducationFormTemplate from './EducationFormTemplate.hbs'
import RISView from "../../../../RISView"
import EducationRules from "../../../../../constants/validationRules/EducationRules"
import * as Languages from "../../../../../lang/Languages"
import Education from "../../../../../model/api/Education"

const EducationFormView = RISView.extend({

  template: EducationFormTemplate,

  educationForm: '#educationForm',

  onRender() {
    this.addFormValidation()
  },

  serialize() {
    const id = (this.model)
      ? this.model.id
      : null

    const school = this.$('#school')
      .val()
    const degree = this.$('#degree')
      .val()
    const field = this.$('#field')
      .val()
    const startDate = this.$('#startDate')
      .val()
    const endDate = this.$('#endDate')
      .val()
    const grade = this.$('#grade')
      .val()
    const description = this.$('#description')
      .val()

    return {
      id,
      school,
      degree,
      field,
      dateRange: {
        startDate: startDate,
        endDate: endDate
      },
      grade,
      description
    }
  },

  storeEducation() {
    return Promise.resolve(this.serialize())
      .then(data => {
        const education = (this.model)
          ? this.model
          : new Education()

        education.attributes = data

        return education.save()
          .then(a => {
            education.attributes = a
            return education
          })
      })
  },

  isFormInvalid() {
    return !(this.isFormValid())
  },

  isFormValid() {
    return this.$(this.educationForm)
      .valid()
  },

  addFormValidation() {
    this.$(this.educationForm)
      .validate({
        rules: {
          school: {
            required: true,
            minlength: EducationRules.EDUCATION_SCHOOL_MIN,
            maxlength: EducationRules.EDUCATION_SCHOOL_MAX,
          },
          degree: {
            required: false,
            minlength: EducationRules.EDUCATION_DEGREE_MIN,
            maxlength: EducationRules.EDUCATION_DEGREE_MAX,
          },
          field: {
            required: false,
            minlength: EducationRules.EDUCATION_FIELD_MIN,
            maxlength: EducationRules.EDUCATION_FIELD_MAX,
          },
          startDate: {
            required: true,
          },
          endDate: {
            required: false,
          },
          grade: {
            required: false,
            minlength: EducationRules.EDUCATION_GRADE_MIN,
            maxlength: EducationRules.EDUCATION_GRADE_MAX,
          },
          description: {
            required: false,
            minlength: EducationRules.EDUCATION_DESCRIPTION_MIN,
            maxlength: EducationRules.EDUCATION_DESCRIPTION_MAX,
          },
        },
        messages: {
          school: {
            required: Languages.resolveKey('resume.education.form.school.required'),
            minlength: Languages.resolveKey('resume.education.form.school.required'),
            maxlength: Languages.resolveKey('resume.education.form.school.required'),
          },
          degree: {
            minlength: Languages.resolveKey('resume.education.form.degree.required'),
            maxlength: Languages.resolveKey('resume.education.form.degree.required'),
          },
          field: {
            minlength: Languages.resolveKey('resume.education.form.field.required'),
            maxlength: Languages.resolveKey('resume.education.form.field.required'),
          },
          startDate: {
            required: Languages.resolveKey('resume.education.form.startDate.required'),
          },
          grade: {
            minlength: Languages.resolveKey('resume.education.form.grade.required'),
            maxlength: Languages.resolveKey('resume.education.form.grade.required'),
          },
          description: {
            minlength: Languages.resolveKey('resume.education.form.description.required'),
            maxlength: Languages.resolveKey('resume.education.form.description.required'),
          },
        }
      })
  }
})

export default EducationFormView
