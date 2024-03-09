'use strict'

import ApplicationFeature from '../../model/local/ApplicationFeature'
import LocalCollection from './LocalCollection'

const ApplicationFeatureCollection = LocalCollection.extend({
  model: ApplicationFeature
})

export default ApplicationFeatureCollection
