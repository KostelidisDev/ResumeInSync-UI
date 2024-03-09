'use strict'

import RISView from '../../RISView'
import EditableProfileTemplate from './AccountEditableTemplate.hbs'
import FormFieldView from "../formField/FormFieldView"
import ChangePasswordEditableView from "../changePasswordEditable/ChangePasswordEditableView"
import UpdateProfileEditableView from "../updateProfileEditable/UpdateProfileEditableView"

const AccountEditableView = RISView.extend({

  template: EditableProfileTemplate,

  regions: {
    'usernameRegion': '.usernameRegion',
    'emailRegion': '.emailRegion',
    'updateProfileRegion': '.updateProfileRegion',
    'changePasswordRegion': '.changePasswordRegion'
  },

  onRender() {
    this.showChildView('usernameRegion', new FormFieldView({
      model: {
        attributes: {
          id: 'username',
          title: 'account.username',
          value: this.model.user.get('username'),
          example: 'account.username',
          readOnly: true,
          type: 'text'
        },
      }
    }))

    this.showChildView('emailRegion', new FormFieldView({
      model: {
        attributes: {
          id: 'email',
          title: 'account.email',
          value: this.model.user.get('email'),
          example: 'account.email',
          readOnly: true,
          type: 'text'
        }
      }
    }))

    this.showChildView('updateProfileRegion', new UpdateProfileEditableView({
      model: this.model.profile
    }))

    this.showChildView('changePasswordRegion', new ChangePasswordEditableView({
      model: this.model.user
    }))
  },
})

export default AccountEditableView
