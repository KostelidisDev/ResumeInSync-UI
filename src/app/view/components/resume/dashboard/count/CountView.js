'use strict'

import CountTemplate from './CountTemplate.hbs'
import RISItemView from "../../../../RISItemView"

const CountView = RISItemView.extend({

  template: CountTemplate,

  className: "col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4"
})

export default CountView
