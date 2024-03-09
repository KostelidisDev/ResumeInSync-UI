'use strict'

import NavigationBar from '../../model/local/NavigationBar'
import LocalCollection from './LocalCollection'

const NavigationBarCollection = LocalCollection.extend({
  model: NavigationBar
})

export default NavigationBarCollection
