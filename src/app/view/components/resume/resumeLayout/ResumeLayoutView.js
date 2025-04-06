'use strict'

import RISView from "../../../RISView"
import ResumeDashboardTemplate from './ResumeLayoutTemplate.hbs'
import ResumeSidebarView from "../resumeSidebar/ResumeSidebarView"

const ResumeLayoutView = RISView.extend({

  template: ResumeDashboardTemplate,

  className: 'row',

  regions: {
    'resumeSidebarRegion': '.resumeSidebarRegion',
    'resumeContentRegion': '.resumeContentRegion'
  },

  onRender() {
    const sideBar = ResumeSidebarView
    const viewToRenderAsContent = this.model.viewToRenderAsContent
    const selectedSidebarItem = this.model.selectedSidebarItem
    const collectionOfAPI = _.isUndefined(this.model.collectionOfAPI)
      ? null
      : this.model.collectionOfAPI

    return Promise
      .all([
        new sideBar({
          model: {
            viewName: 'resumeSidebarRegion',
            selectedSidebarItem: selectedSidebarItem
          }
        }),
        Promise.resolve(collectionOfAPI)
          .then(collectionOfAPI => {
            return _.isNull((collectionOfAPI))
              ? []
              : Promise.resolve()
                .then(() => {
                  collectionOfAPI.fetch()
                  return collectionOfAPI
                })
          })
          .then(skillItems => new viewToRenderAsContent({
            model: {
              viewName: 'resumeContentRegion',
            },
            collection: skillItems
          })
          )
      ])
      .then(viewsToRender => _(viewsToRender)
        .map(view => this.showChildView(view.model.viewName, view))
      )
  },
})

export default ResumeLayoutView
