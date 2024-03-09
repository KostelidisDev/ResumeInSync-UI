'use strict'

import ApplicationFeatureListItemTemplate from './ApplicationFeatureItemTemplate.hbs'
import RISItemView from '../../../RISItemView'

const ApplicationFeatureItemView = RISItemView.extend({

  template: ApplicationFeatureListItemTemplate,

  className: 'col-xs-12 col-md-4 text-center margin-top-bottom-50',

})

export default ApplicationFeatureItemView
