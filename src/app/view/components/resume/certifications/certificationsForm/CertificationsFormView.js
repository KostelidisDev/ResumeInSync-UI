'use strict'

import CertificationsFormTemplate from './CertificationsFormTemplate.hbs'
import RISView from "../../../../RISView"
import CertificationsRules from "../../../../../constants/validationRules/CertificationsRules"
import * as Languages from "../../../../../lang/Languages"
import Certification from "../../../../../model/api/Certification"

const CertificationsFormView = RISView.extend({

  template: CertificationsFormTemplate,

  certificationsForm: '#certificationsForm',

  onRender() {
    this.addFormValidation()
  },

  serialize() {
    const id = (this.model)
      ? this.model.id
      : null

    const name = this.$('#name')
      .val()
    const organization = this.$('#organization')
      .val()
    const canExpire = (this.$('#canExpire')[0].checked)
    const startDate = this.$('#startDate')
      .val()
    const endDate = this.$('#endDate')
      .val()
    const originalId = this.$('#originalId')
      .val()
    const originalUrl = this.$('#originalUrl')
      .val()

    return {
      id,
      name,
      organization,
      canExpire,
      dateRange: {
        startDate: startDate,
        endDate: endDate
      },
      originalId,
      originalUrl
    }
  },

  storeCertification() {
    return Promise.resolve(this.serialize())
      .then(data => {
        const certification = (this.model)
          ? this.model
          : new Certification()

        certification.attributes = data

        return certification.save()
          .then(a => {
            certification.attributes = a
            return certification
          })
      })
  },

  isFormInvalid() {
    return !(this.isFormValid())
  },

  isFormValid() {
    return this.$(this.certificationsForm)
      .valid()
  },

  addFormValidation() {
    this.$(this.certificationsForm)
      .validate({
        rules: {
          name: {
            required: true,
            minlength: CertificationsRules.CERTIFICATIONS_NAME_MIN,
            maxlength: CertificationsRules.CERTIFICATIONS_NAME_MAX,
          },
          organization: {
            required: true,
            minlength: CertificationsRules.CERTIFICATIONS_ORGANIZATION_MIN,
            maxlength: CertificationsRules.CERTIFICATIONS_ORGANIZATION_MAX,
          },
          canExpire: {
            required: false,
          },
          startDate: {
            required: true,
          },
          endDate: {
            required: false,
          },
          originalId: {
            required: false,
            minlength: CertificationsRules.CERTIFICATIONS_ORIGINAL_ID_MIN,
            maxlength: CertificationsRules.CERTIFICATIONS_ORIGINAL_ID_MAX,
          },
          originalUrl: {
            required: false,
            minlength: CertificationsRules.CERTIFICATIONS_ORIGINAL_URL_MIN,
            maxlength: CertificationsRules.CERTIFICATIONS_ORIGINAL_URL_MAX,
          },
        },
        messages: {
          name: {
            required: Languages.resolveKey('resume.certifications.form.name.required'),
            minlength: Languages.resolveKey('resume.certifications.form.name.length.min'),
            maxlength: Languages.resolveKey('resume.certifications.form.name.length.max'),
          },
          organization: {
            required: Languages.resolveKey('resume.certifications.form.organization.required'),
            minlength: Languages.resolveKey('resume.certifications.form.organization.length.min'),
            maxlength: Languages.resolveKey('resume.certifications.form.organization.length.max'),
          },
          startDate: {
            required: Languages.resolveKey('resume.certifications.form.startDate.required'),
          },
          originalId: {
            minlength: Languages.resolveKey('resume.certifications.form.originalId.length.min'),
            maxlength: Languages.resolveKey('resume.certifications.form.originalId.length.max'),
          },
          originalUrl: {
            minlength: Languages.resolveKey('resume.certifications.form.originalUrl.length.min'),
            maxlength: Languages.resolveKey('resume.certifications.form.originalUrl.length.max'),
          },
        }
      })
  }
})

export default CertificationsFormView
