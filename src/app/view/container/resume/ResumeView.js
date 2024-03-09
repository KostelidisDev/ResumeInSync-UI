'use strict'

import RISView from '../../RISView'
import AccountTemplate from './ResumeTemplate.hbs'
import ResumeLayoutView from "../../components/resume/resumeLayout/ResumeLayoutView"

const ResumeView = RISView.extend({

  template: AccountTemplate,

  regions: {
    'resumeRegion': '.resumeRegion'
  },

  onRender() {
    Promise.resolve(this.model)
      .then(parentModel => new ResumeLayoutView({
        model: {
          ...parentModel
        }
      }))
      .then(resumeDashboardView => this.showChildView('resumeRegion', resumeDashboardView))
  }
})

export default ResumeView
