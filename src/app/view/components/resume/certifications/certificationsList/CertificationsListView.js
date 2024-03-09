'use strict'

import CertificationsListTemplate from './CertificationsListTemplate.hbs'
import RISViewCollection from '../../../../RISViewCollection'
import { openModalForm } from "../../../../../util/ModalUtils"
import * as Languages from "../../../../../lang/Languages"
import CertificationsListItemView from "../certificationsListItem/CertificationsListItemView"
import CertificationsFormView from "../certificationsForm/CertificationsFormView"

const CertificationsListView = RISViewCollection.extend({

  template: CertificationsListTemplate,

  tagName: 'span',

  className: 'row col-12',

  childView: CertificationsListItemView,

  childViewContainer: '.certificationsList',

  events: {
    'click #add': 'add'
  },

  add() {
    const $this = this
    const passData = null

    return openModalForm(
      CertificationsFormView,
      passData,
      Languages.resolveKey('resume.certifications.add.title'),
      Languages.resolveKey('resume.certifications.add.submit'),
      "btn-success pull-right",
      function () {
        if (this.isFormInvalid()) {
          return false
        }

        this.storeCertification()
          .then(certification => $this.collection.add(certification))
      }
    )
  },
})

export default CertificationsListView
