'use strict'

import RISView from '../../RISView'
import RegisterTemplate from './RegisterTemplate.hbs'
import * as Channels from '../../../constants/channels/Channels'
import * as SecurityEvents from '../../../constants/channels/events/SecurityEvents'
import Radio from 'backbone.radio'
import LiveData from '../../../LiveData'
import AuthRules from '../../../constants/validationRules/AuthRules'
import * as Languages from '../../../lang/Languages'

const RegisterView = RISView.extend({

  template: RegisterTemplate,

  securityChannel: new Radio.channel(Channels.SECURITY),

  events: {
    'submit #registerForm': 'register',
    'click #login': 'login',
  },

  registerForm: '#registerForm',

  onRender() {
    this.addFormValidation()
  },

  register(e) {
    e.preventDefault()

    if (this.isFormInvalid()) {
      return
    }

    return Promise.resolve(this.serialize())
      .then(registerRequestDTO => {
        return this.securityChannel.request(SecurityEvents.REGISTER, registerRequestDTO)
          .then(() => {
            return registerRequestDTO
          })
      })
      .then(registerRequestDTO => {
        const { user } = registerRequestDTO
        return user
      })
      .then(userCredentials => this.securityChannel.request(SecurityEvents.LOGIN, userCredentials))
      .then(() => LiveData.router.navigate('#/resume', { trigger: true }))
      .catch(error => console.log(error))
  },

  login(e) {
    e.preventDefault()

    return Promise.resolve(LiveData)
      .then(liveData => liveData.router.navigate('#/login', { trigger: true }))
  },

  serialize() {
    const firstName = this.$('#firstName')
      .val()
    const lastName = this.$('#lastName')
      .val()
    const avatar = ""
    const mobilePhone = ""
    const landPhone = ""
    const fax = ""
    const bio = ""
    const published = false

    const username = this.$('#username')
      .val()
    const email = this.$('#email')
      .val()
    const password = this.$('#password')
      .val()
    const repeatPassword = this.$('#repeatPassword')
      .val()

    return {
      user: {
        username,
        email,
        password,
        repeatPassword
      },
      profile: {
        firstName,
        lastName,
        avatar,
        mobilePhone,
        landPhone,
        fax,
        bio,
        published
      }
    }
  },

  isFormInvalid() {
    return !(this.isFormValid())
  },

  isFormValid() {
    return this.$(this.registerForm)
      .valid()
  },

  addFormValidation() {
    this.$(this.registerForm)
      .validate({
        rules: {
          firstName: {
            required: true,
            minlength: AuthRules.FIRST_NAME_MIN,
            maxlength: AuthRules.FIRST_NAME_MAX
          },
          lastName: {
            required: true,
            minlength: AuthRules.LAST_NAME_MIN,
            maxlength: AuthRules.LAST_NAME_MAX
          },
          username: {
            required: true,
            minlength: AuthRules.USERNAME_MIN,
            maxlength: AuthRules.USERNAME_MAX
          },
          email: {
            required: true,
            minlength: AuthRules.EMAIL_MIN,
            maxlength: AuthRules.EMAIL_MAX
          },
          password: {
            required: true,
            minlength: AuthRules.PASSWORD_MIN,
            maxlength: AuthRules.PASSWORD_MAX,
          }
        },
        messages: {
          username: {
            required: Languages.resolveKey('auth.form.username.required'),
            minlength: Languages.resolveKey('auth.form.username.length.min'),
            maxlength: Languages.resolveKey('auth.form.username.length.max'),
          },
          email: {
            required: Languages.resolveKey('auth.form.email.required'),
            minlength: Languages.resolveKey('auth.form.email.length.min'),
            maxlength: Languages.resolveKey('auth.form.email.length.max'),
          },
          firstName: {
            required: Languages.resolveKey('auth.form.firstName.required'),
            minlength: Languages.resolveKey('auth.form.firstName.length.min'),
            maxlength: Languages.resolveKey('auth.form.firstName.length.max'),
          },
          lastName: {
            required: Languages.resolveKey('auth.form.lastName.required'),
            minlength: Languages.resolveKey('auth.form.lastName.length.min'),
            maxlength: Languages.resolveKey('auth.form.lastName.length.max'),
          },
          password: {
            required: Languages.resolveKey('auth.form.password.required'),
            minlength: Languages.resolveKey('auth.form.password.length.min'),
            maxlength: Languages.resolveKey('auth.form.password.length.max'),
          },
        }
      })
  }
})

export default RegisterView
