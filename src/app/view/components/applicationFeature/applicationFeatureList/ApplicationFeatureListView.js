'use strict'

import RISViewCollection from '../../../RISViewCollection'
import ApplicationFeatureListTemplate from './ApplicationFeatureListTemplate.hbs'
import ApplicationFeatureItemView from '../applicationFeatureItem/ApplicationFeatureItemView'

const ApplicationFeatureListView = RISViewCollection.extend({

  template: ApplicationFeatureListTemplate,

  tagName: 'span',

  childView: ApplicationFeatureItemView,

  childViewContainer: '.applicationFeatureItems',
})

export default ApplicationFeatureListView
