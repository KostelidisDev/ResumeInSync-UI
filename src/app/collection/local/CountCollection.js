'use strict'

import LocalCollection from './LocalCollection'
import Count from "../../model/local/Count"

const CountCollection = LocalCollection.extend({
  model: Count
})

export default CountCollection
