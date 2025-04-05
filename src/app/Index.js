// jQuery  Dependencies
import('jquery-validation')
import('popper.js')

// Handlebars Dependencies
import('./util/HandlebarsUtil')

// Theme Dependencies
import('selectize')
import('bootstrap')

import('./../styles/Index.css')

// Backbone.js Dependencies (Lazy-loaded)
import('backbone').then((Backbone) => {
  import('backbone.basicauth').then(() => {
    Backbone.history.start()
  })
})

import('./ChannelLoader')
import('./ControllerLoader')
