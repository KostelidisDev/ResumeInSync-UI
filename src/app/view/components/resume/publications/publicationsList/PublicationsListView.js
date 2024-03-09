'use strict'

import PublicationsListTemplate from './PublicationsListTemplate.hbs'
import RISViewCollection from '../../../../RISViewCollection'
import { openModalForm } from "../../../../../util/ModalUtils"
import * as Languages from "../../../../../lang/Languages"
import PublicationsListItemView from "../publicationsListItem/PublicationsListItemView"
import PublicationsFormView from "../publicationsForm/PublicationsFormView"

const PublicationsListView = RISViewCollection.extend({

  template: PublicationsListTemplate,

  tagName: 'span',

  className: 'row col-12',

  childView: PublicationsListItemView,

  childViewContainer: '.publicationsList',

  events: {
    'click #add': 'add'
  },

  add() {
    const $this = this
    const passData = null

    return openModalForm(
      PublicationsFormView,
      passData,
      Languages.resolveKey('resume.publications.add.title'),
      Languages.resolveKey('resume.publications.add.submit'),
      "btn-success pull-right",
      function () {
        if (this.isFormInvalid()) {
          return false
        }

        this.storePublication()
          .then(publication => $this.collection.add(publication))
      }
    )
  },
})

export default PublicationsListView
