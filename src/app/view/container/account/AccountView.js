'use strict'

import RISView from '../../RISView'
import AccountTemplate from './AccountTemplate.hbs'
import AccountEditableView from '../../components/accountEditable/AccountEditableView'

const AccountView = RISView.extend({

  template: AccountTemplate,

  regions: {
    'accountRegion': '.accountRegion'
  },

  onRender() {
    Promise.resolve(this.model)
      .then(model => new AccountEditableView({ model: model }))
      .then(editableProfileView => this.showChildView('accountRegion', editableProfileView))
  }
})

export default AccountView
