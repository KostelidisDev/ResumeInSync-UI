'use strict'

import PreviewListTemplate from './PreviewListTemplate.hbs'
import RISViewCollection from '../../../../RISViewCollection'
import PreviewListItemView from "../previewListItem/PreviewListItemView"

const PreviewListView = RISViewCollection.extend({

  template: PreviewListTemplate,

  tagName: 'span',

  className: 'row col-12',

  childView: PreviewListItemView,

  childViewContainer: '.previewList',

  events: {
  },
})

export default PreviewListView
