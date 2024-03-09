'use strict'

import CountsTemplate from './CountsTemplate.hbs'
import CountView from "../count/CountView"
import RISViewCollection from "../../../../RISViewCollection"

const CountsView = RISViewCollection.extend({

  template: CountsTemplate,

  className: 'row',

  childView: CountView,

  childViewContainer: '.countsRegion',
})

export default CountsView
