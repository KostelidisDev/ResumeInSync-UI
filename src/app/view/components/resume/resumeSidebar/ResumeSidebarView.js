'use strict'

import RISView from "../../../RISView"
import ResumeSidebarTemplate from './ResumeSidebarTemplate.hbs'

const ResumeSidebarView = RISView.extend({

  template: ResumeSidebarTemplate,

  className: 'col-12',

  onRender() {
    const selectedSidebarItem = this.model.selectedSidebarItem

    const $ = this.$('#' + selectedSidebarItem)
    $.addClass('dashboard-selected-item')
  }
})

export default ResumeSidebarView
