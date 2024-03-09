'use strict'

import PublicationsFormTemplate from './PublicationsFormTemplate.hbs'
import RISView from "../../../../RISView"
import PublicationsRules from "../../../../../constants/validationRules/PublicationsRules"
import * as Languages from "../../../../../lang/Languages"
import Publication from "../../../../../model/api/Publication"

const PublicationsFormView = RISView.extend({

  template: PublicationsFormTemplate,

  publicationsForm: '#publicationsForm',

  onRender() {
    this.addFormValidation()
  },

  serialize() {
    const id = (this.model)
      ? this.model.id
      : null

    const title = this.$('#title')
      .val()
    const publisher = this.$('#publisher')
      .val()
    const publicationDate = this.$('#publicationDate')
      .val()
    const authors = this.$('#authors')
      .val()
    const url = this.$('#url')
      .val()
    const description = this.$('#description')
      .val()

    return {
      id,
      title,
      publisher,
      publicationDate,
      authors,
      url,
      description
    }
  },

  storePublication() {
    return Promise.resolve(this.serialize())
      .then(data => {
        const publication = (this.model)
          ? this.model
          : new Publication()

        publication.attributes = data

        return publication.save()
          .then(a => {
            publication.attributes = a
            return publication
          })
      })
  },

  isFormInvalid() {
    return !(this.isFormValid())
  },

  isFormValid() {
    return this.$(this.publicationsForm)
      .valid()
  },

  addFormValidation() {
    this.$(this.publicationsForm)
      .validate({
        rules: {
          title: {
            required: true,
            minlength: PublicationsRules.PUBLICATIONS_TITLE_MIN,
            maxlength: PublicationsRules.PUBLICATIONS_TITLE_MAX,
          },
          publisher: {
            required: true,
            minlength: PublicationsRules.PUBLICATIONS_PUBLISHER_MIN,
            maxlength: PublicationsRules.PUBLICATIONS_PUBLISHER_MAX,
          },
          authors: {
            required: true,
            minlength: PublicationsRules.PUBLICATIONS_AUTHORS_MIN,
            maxlength: PublicationsRules.PUBLICATIONS_AUTHORS_MAX,
          },
          url: {
            required: false,
            minlength: PublicationsRules.PUBLICATIONS_URL_MIN,
            maxlength: PublicationsRules.PUBLICATIONS_URL_MAX,
          },
          description: {
            minlength: PublicationsRules.PUBLICATIONS_DESCRIPTION_MIN,
            maxlength: PublicationsRules.PUBLICATIONS_DESCRIPTION_MAX,
          },
          publicationDate: {
            required: true,
          },
        },
        messages: {
          title: {
            required: Languages.resolveKey('resume.publications.form.title.required'),
            minlength: Languages.resolveKey('resume.publications.form.title.length.min'),
            maxlength: Languages.resolveKey('resume.publications.form.title.length.max'),
          },
          publisher: {
            required: Languages.resolveKey('resume.publications.form.publisher.required'),
            minlength: Languages.resolveKey('resume.publications.form.publisher.length.min'),
            maxlength: Languages.resolveKey('resume.publications.form.publisher.length.max'),
          },
          authors: {
            required: Languages.resolveKey('resume.publications.form.authors.required'),
            minlength: Languages.resolveKey('resume.publications.form.authors.length.min'),
            maxlength: Languages.resolveKey('resume.publications.form.authors.length.max'),
          },
          url: {
            minlength: Languages.resolveKey('resume.publications.form.url.length.min'),
            maxlength: Languages.resolveKey('resume.publications.form.url.length.max'),
          },
          description: {
            minlength: Languages.resolveKey('resume.publications.form.description.length.min'),
            maxlength: Languages.resolveKey('resume.publications.form.description.length.max'),
          },
          publicationDate: {
            required: Languages.resolveKey('resume.publications.form.publicationDate.required'),
          },
        }
      })
  }
})

export default PublicationsFormView
