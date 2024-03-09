'use strict'

import RISView from '../../RISView'
import ChangePasswordTemplate from './ChangePasswordEditableTemplate.hbs'
import Radio from 'backbone.radio'
import * as Channels from '../../../constants/channels/Channels'
import * as UserEvents from '../../../constants/channels/events/UserEvents'
import AuthConstants from '../../../constants/validationRules/AuthRules'
import * as Languages from '../../../lang/Languages'
import * as Swal from 'sweetalert2'
import FormFieldView from "../formField/FormFieldView"

const ChangePasswordEditableView = RISView.extend({

  template: ChangePasswordTemplate,

  regions: {
    'currentPasswordRegion': '.currentPasswordRegion',
    'newPasswordRegion': '.newPasswordRegion',
  },

  events: {
    'submit #changePasswordForm': 'changePassword',
  },

  changePasswordForm: '#changePasswordForm',

  userChannel: Radio.channel(Channels.USER),

  onRender() {
    this.showChildView('currentPasswordRegion', new FormFieldView({
      model: {
        attributes: {
          id: 'currentPassword',
          title: 'account.password',
          value: '',
          example: 'account.password',
          readOnly: false,
          type: 'password'
        },
      }
    }))

    this.showChildView('newPasswordRegion', new FormFieldView({
      model: {
        attributes: {
          id: 'newPassword',
          title: 'account.newPassword',
          value: '',
          example: 'account.newPassword',
          readOnly: false,
          type: 'password'
        },
      }
    }))

    this.addFormValidation()
  },

  changePassword(e) {
    e.preventDefault()

    if (this.isFormInvalid()) {
      return
    }

    Promise.resolve(this)
      .then(thisView => thisView.userChannel)
      .then(userChannel => userChannel.request(UserEvents.CHANGE_PASSWORD, this.serialize()))
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
    const currentPassword = this.$('#currentPassword')
      .val()
    const newPassword = this.$('#newPassword')
      .val()

    return {
      currentPassword,
      newPassword
    }
  },

  isFormInvalid() {
    return !(this.isFormValid())
  },

  isFormValid() {
    return this.$(this.changePasswordForm)
      .valid()
  },

  addFormValidation() {
    this.$(this.changePasswordForm)
      .validate({
        rules: {
          currentPassword: {
            required: true,
            minlength: AuthConstants.PASSWORD_MIN,
            maxlength: AuthConstants.PASSWORD_MAX,
          },
          newPassword: {
            required: true,
            minlength: AuthConstants.PASSWORD_MIN,
            maxlength: AuthConstants.PASSWORD_MAX,
          },
        },
        messages: {
          currentPassword: {
            required: Languages.resolveKey('account.form.currentPassword.required'),
            minlength: Languages.resolveKey('account.form.currentPassword.length.min'),
            maxlength: Languages.resolveKey('account.form.currentPassword.length.max'),
          },
          newPassword: {
            required: Languages.resolveKey('account.form.newPassword.required'),
            minlength: Languages.resolveKey('account.form.newPassword.length.min'),
            maxlength: Languages.resolveKey('account.form.newPassword.length.max'),
          }
        }
      })
  }
})

export default ChangePasswordEditableView

