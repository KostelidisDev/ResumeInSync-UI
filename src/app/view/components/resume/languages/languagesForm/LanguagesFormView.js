'use strict'

import LanguagesFormTemplate from './LanguagesFormTemplate.hbs'
import RISView from "../../../../RISView"
import languagesRules from "../../../../../constants/validationRules/LanguagesRules"
import * as Languages from "../../../../../lang/Languages"
import Language from "../../../../../model/api/Language"
import Radio from "backbone.radio"
import * as Channels from "../../../../../constants/channels/Channels"
import * as LanguageProficiencyEvents from "../../../../../constants/channels/events/LanguageProficiencyEvents"

const LanguagesFormView = RISView.extend({

  template: LanguagesFormTemplate,

  workingForm: '#languageForm',

  languageProficiencyChannel: new Radio.channel(Channels.LANGUAGE_PROFICIENCY),

  onRender() {
    this.addFormValidation()
    const selectedProficiency = (this.model)
      ? this.model.get('proficiency')
      : ''

    this.languageProficiencyChannel
      .request(LanguageProficiencyEvents.GET)
      .then(values => values.map(value => {
        return {
          id: value,
          proficiency: Languages.resolveKey(`resume.languages.proficiencies.${value}`)
        }
      }))
      .then(values => {
        this.$('#proficiency')
          .selectize({
            persist: true,
            valueField: 'id',
            labelField: 'proficiency',
            searchField: ['id', 'proficiency'],
            options: values,
            items: [selectedProficiency],
            onItemRemove: function (value) {
              this.addItem(value, true)
              this.refreshItems()
            }
          })
      })

  },

  serialize() {
    const id = (this.model)
      ? this.model.id
      : null

    const name = this.$('#name')
      .val()
    const proficiency = this.$('#proficiency')
      .val()

    return {
      id,
      name,
      proficiency
    }
  },

  storeLanguage() {
    return Promise.resolve(this.serialize())
      .then(data => {
        const working = (this.model)
          ? this.model
          : new Language()

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
            minlength: languagesRules.LANGUAGES_NAME_MIN,
            maxlength: languagesRules.LANGUAGES_NAME_MAX,
          },
        },
        messages: {
          name: {
            required: Languages.resolveKey('resume.languages.form.name.required'),
            minlength: Languages.resolveKey('resume.languages.form.name.length.min'),
            maxlength: Languages.resolveKey('resume.languages.form.name.length.max'),
          },
        },
      })
  }
})

export default LanguagesFormView
