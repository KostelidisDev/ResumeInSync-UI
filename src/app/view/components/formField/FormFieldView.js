'use strict'

import RISView from '../../RISView'
import FormFieldTemplate from './FormFieldTemplate.hbs'

const FormFieldView = RISView.extend({

  template: FormFieldTemplate,
  tagName: 'div',
  className: 'form-group'
})

export default FormFieldView
