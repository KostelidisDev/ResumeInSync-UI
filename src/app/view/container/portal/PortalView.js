'use strict'

import RISView from '../../RISView'
import PortalTemplate from './PortalTemplate.hbs'
import ApplicationFeaturesItems from '../../../constants/portal/ApplicationFeaturesItems'
import ApplicationFeatureCollection from '../../../collection/local/ApplicationFeatureCollection'
import ApplicationFeatureListView
  from '../../components/applicationFeature/applicationFeatureList/ApplicationFeatureListView'

const PortalView = RISView.extend({

  template: PortalTemplate,

  regions: {
    'applicationFeaturesRegion': '.applicationFeaturesRegion'
  },

  onRender() {
    Promise.resolve(ApplicationFeaturesItems)
      .then(applicationFeatureItems => new ApplicationFeatureCollection(applicationFeatureItems))
      .then(applicationFeatureItemCollection => new ApplicationFeatureListView(
        {
          collection: applicationFeatureItemCollection
        }
      ))
      .then(applicationFeatureListView => this.showChildView(
        'applicationFeaturesRegion',
        applicationFeatureListView
      ))
  },
})

export default PortalView
