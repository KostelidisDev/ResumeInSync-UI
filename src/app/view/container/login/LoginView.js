'use strict'

import RISView from '../../RISView'
import RegisterTemplate from './LoginTemplate.hbs'
import Radio from 'backbone.radio'
import * as Channels from '../../../constants/channels/Channels'
import * as SecurityEvents from '../../../constants/channels/events/SecurityEvents'
import LiveData from '../../../LiveData'
import * as Languages from '../../../lang/Languages'
import AuthRules from '../../../constants/validationRules/AuthRules'
import * as Swal from 'sweetalert2'

const LoginView = RISView.extend({

  template: RegisterTemplate,

  events: {
    'submit #loginForm': 'login',
    'click #register': 'register'
  },

  loginForm: '#loginForm',

  securityChannel: Radio.channel(Channels.SECURITY),

  onRender() {
    this.addFormValidation()
  },

  login(e) {
    e.preventDefault()

    if (this.isFormInvalid()) {
      return false
    }

    return Promise.resolve(this.serialize())
      .then(userCredentials => this.securityChannel.request(SecurityEvents.LOGIN, userCredentials))
      .then(() => LiveData.router.navigate('#/resume', { trigger: true }))
      .catch(error => Swal.fire(
        Languages.resolveKey('auth.error.cant.title'),
        Languages.resolveKey('auth.error.cant.body'),
        'error'
      ))
  },

  register(e) {
    e.preventDefault()

    return Promise.resolve(LiveData)
      .then(liveData => liveData.router.navigate('#/register', { trigger: true }))
  },

  serialize() {
    const username = this.$('#username')
      .val()
    const password = this.$('#password')
      .val()

    return {
      username,
      password
    }
  },

  isFormInvalid() {
    return !(this.isFormValid())
  },

  isFormValid() {
    return this.$(this.loginForm)
      .valid()
  },

  addFormValidation() {
    this.$(this.loginForm)
      .validate({
        rules: {
          username: {
            required: true,
            minlength: AuthRules.USERNAME_MIN,
            maxlength: AuthRules.USERNAME_MAX
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
          password: {
            required: Languages.resolveKey('auth.form.password.required'),
            minlength: Languages.resolveKey('auth.form.password.length.min'),
            maxlength: Languages.resolveKey('auth.form.password.length.max'),
          },
        }
      })
  }
})

export default LoginView
