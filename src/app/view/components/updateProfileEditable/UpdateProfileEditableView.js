'use strict'

import RISView from '../../RISView'
import UpdateProfileEditableTemplate from './UpdateProfileEditableTemplate.hbs'
import * as Channels from '../../../constants/channels/Channels'
import ProfileRules from '../../../constants/validationRules/ProfileRules'
import * as Languages from '../../../lang/Languages'
import FormFieldView from "../formField/FormFieldView"
import * as Swal from "sweetalert2"

const UpdateProfileEditableView = RISView.extend({

  template: UpdateProfileEditableTemplate,

  className: 'row',

  regions: {
    'firstNameRegion': '.firstNameRegion',
    'lastNameRegion': '.lastNameRegion',
    'bioRegion': '.bioRegion',
    'avatarRegion': '.avatarRegion',
    'mobilePhoneRegion': '.mobilePhoneRegion',
    'landPhoneRegion': '.landPhoneRegion',
    'faxRegion': '.faxRegion',
  },

  events: {
    'submit #updateProfileForm': 'updateProfile',
  },

  updateProfileForm: '#updateProfileForm',

  userChannel: Backbone.Radio.channel(Channels.USER),

  onRender() {
    this.showChildView('firstNameRegion', new FormFieldView({
      model: {
        attributes: {
          id: 'firstName',
          title: 'account.firstName',
          value: this.model.get('firstName'),
          example: 'account.firstName',
          readOnly: false,
          type: 'text'
        },
      }
    }))
    this.showChildView('lastNameRegion', new FormFieldView({
      model: {
        attributes: {
          id: 'lastName',
          title: 'account.lastName',
          value: this.model.get('lastName'),
          example: 'account.lastName',
          readOnly: false,
          type: 'text'
        },
      }
    }))
    this.showChildView('bioRegion', new FormFieldView({
      model: {
        attributes: {
          id: 'bio',
          title: 'account.bio',
          value: this.model.get('bio'),
          example: 'account.bio',
          readOnly: false,
          type: 'text'
        },
      }
    }))
    this.showChildView('avatarRegion', new FormFieldView({
      model: {
        attributes: {
          id: 'avatar',
          title: 'account.avatar',
          value: this.model.get('avatar'),
          example: 'account.avatar',
          readOnly: false,
          type: 'text'
        },
      }
    }))
    this.showChildView('mobilePhoneRegion', new FormFieldView({
      model: {
        attributes: {
          id: 'mobilePhone',
          title: 'account.mobilePhone',
          value: this.model.get('mobilePhone'),
          example: 'account.mobilePhone',
          readOnly: false,
          type: 'text'
        },
      }
    }))
    this.showChildView('landPhoneRegion', new FormFieldView({
      model: {
        attributes: {
          id: 'landPhone',
          title: 'account.landPhone',
          value: this.model.get('landPhone'),
          example: 'account.landPhone',
          readOnly: false,
          type: 'text'
        },
      }
    }))
    this.showChildView('faxRegion', new FormFieldView({
      model: {
        attributes: {
          id: 'fax',
          title: 'account.fax',
          value: this.model.get('fax'),
          example: 'account.fax',
          readOnly: false,
          type: 'fax'
        },
      }
    }))

    this.addFormValidation()
  },

  updateProfile(e) {
    e.preventDefault()

    if (this.isFormInvalid()) {
      return
    }

    Promise.resolve(this.serialize())
      .then(profileData => this.model.set(profileData))
      .then(() => this.model.save())
      .then(() => Swal.fire(
        Languages.resolveKey('account.success.title'),
        Languages.resolveKey('account.success.body'),
        'success'
      ))
      .catch(() => Swal.fire(
        Languages.resolveKey('account.error.title'),
        Languages.resolveKey('account.error.body'),
        'error'
      ))
  },

  serialize() {
    const firstName = this.$('#firstName')
      .val()
    const lastName = this.$('#lastName')
      .val()
    const bio = this.$('#bio')
      .val()
    const avatar = this.$('#avatar')
      .val()
    const mobilePhone = this.$('#mobilePhone')
      .val()
    const landPhone = this.$('#landPhone')
      .val()
    const fax = this.$('#fax')
      .val()

    return {
      firstName,
      lastName,
      avatar,
      mobilePhone,
      landPhone,
      fax,
      bio
    }
  },

  isFormInvalid() {
    return !(this.isFormValid())
  },

  isFormValid() {
    return this.$(this.updateProfileForm)
      .valid()
  },

  addFormValidation() {
    this.$(this.updateProfileForm)
      .validate({
        rules: {
          firstName: {
            required: true,
            minlength: ProfileRules.FIRST_NAME_MIN,
            maxlength: ProfileRules.FIRST_NAME_MAX,
          },
          lastName: {
            required: true,
            minlength: ProfileRules.LAST_NAME_MIN,
            maxlength: ProfileRules.LAST_NAME_MAX,
          },
          avatar: {
            minlength: ProfileRules.AVATAR_MIN,
            maxlength: ProfileRules.AVATAR_MAX,
          },
          mobilePhone: {
            minlength: ProfileRules.MOBILE_PHONE_MIN,
            maxlength: ProfileRules.MOBILE_PHONE_MAX,
          },
          landPhone: {
            minlength: ProfileRules.LAND_PHONE_MIN,
            maxlength: ProfileRules.LAND_PHONE_MAX,
          },
          fax: {
            minlength: ProfileRules.FAX_MIN,
            maxlength: ProfileRules.FAX_MAX,
          }
        },
        messages: {
          firstName: {
            required: Languages.resolveKey('account.profile.form.firstName.required'),
            minlength: Languages.resolveKey('account.profile.form.firstName.length.min'),
            maxlength: Languages.resolveKey('account.profile.form.firstName.length.max'),
          },
          lastName: {
            required: Languages.resolveKey('account.profile.form.lastName.required'),
            minlength: Languages.resolveKey('account.profile.form.lastName.length.min'),
            maxlength: Languages.resolveKey('account.profile.form.lastName.length.max'),
          },
          avatar: {
            minlength: Languages.resolveKey('account.profile.form.avatar.length.min'),
            maxlength: Languages.resolveKey('account.profile.form.avatar.length.max'),
          },
          mobilePhone: {
            minlength: Languages.resolveKey('account.profile.form.mobilePhone.length.min'),
            maxlength: Languages.resolveKey('account.profile.form.mobilePhone.length.max'),
          },
          landPhone: {
            minlength: Languages.resolveKey('account.profile.form.landPhone.length.min'),
            maxlength: Languages.resolveKey('account.profile.form.landPhone.length.max'),
          },
          fax: {
            minlength: Languages.resolveKey('account.profile.form.fax.length.min'),
            maxlength: Languages.resolveKey('account.profile.form.fax.length.max'),
          }
        }
      })
  }
})

export default UpdateProfileEditableView

