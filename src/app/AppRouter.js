import * as Channels from './constants/channels/Channels'
import * as SecurityEvents from './constants/channels/events/SecurityEvents'
import LiveData from './LiveData'
import ResumeView from "./view/container/resume/ResumeView"

const SecurityChannel = Backbone.Radio.channel(Channels.SECURITY)

const AppRouter = Backbone.Router.extend({
  routes: {
    '': 'portal',
    'resumes': 'resumes',
    'resumes/:userId': 'resumesSingle',
    'account': 'account',
    'resume': 'resume',
    'resume/experiences/working': 'resumeExperiencesWorking',
    'resume/experiences/volunteering': 'resumeExperiencesVolunteering',
    'resume/educations': 'resumeEducations',
    'resume/certifications': 'resumeCertifications',
    'resume/skills': 'resumeSkills',
    'resume/languages': 'resumeLanguages',
    'resume/publications': 'resumePublications',
    'login': 'login',
    'register': 'register',
    'logout': 'logout',
    'about': 'about'
  },

  guestRoutes: [
    'portal',
    'resumes',
    'resumesSingle',
    'login',
    'register',
    'about'
  ],

  userRoutes: [
    'account',
    'resume',
    'resumeExperiencesWorking',
    'resumeExperiencesVolunteering',
    'resumeEducations',
    'resumeCertifications',
    'resumeSkills',
    'resumeLanguages',
    'resumePublications',
    'logout',
  ],

  resolveUserIfAuthenticated() {
    return SecurityChannel.request(SecurityEvents.IS_AUTHENTICATED)
      .then(isAuthenticated => {
        if (isAuthenticated) {
          return SecurityChannel.request(SecurityEvents.GET_USER)
        }

        return Promise.resolve(null)
      })
  },

  execute(callback, args, name) {
    const isGuestRoute = _(this.guestRoutes)
      .contains(name)

    return this.resolveUserIfAuthenticated()
      .then(userIfAuthenticated => {
        const isNotAuthenticated = (_.isUndefined(userIfAuthenticated) || _.isNull(userIfAuthenticated))

        if (isGuestRoute) {
          Backbone.Router.prototype.execute.call(this, callback, args, name)
          return
        }

        if (isNotAuthenticated) {
          this.navigate('#/login', { trigger: true })
          return
        }

        Backbone.Router.prototype.execute.call(this, callback, args, name)
      })
  },

  abstractRouter(main, user) {
    return import('./view/container/skeleton/SkeletonView')
    .then(({default: SkeletonView}) => clearRootView()
    .then(() => appendView('#root', new SkeletonView({
      model: {
        main: main,
        user: user
      }
    }).render())))
  },

  portal() {
    return import('./view/container/portal/PortalView')
    .then(({default: PortalView}) => this.abstractRouter(new PortalView(), LiveData.getUser()))
  },

  resumes() {
    return import("./view/container/resumes/ResumesView")
    .then(({default: ResumesView}) => this.abstractRouter(new ResumesView(), LiveData.getUser()))
  },

  resumesSingle(userId) {
    return import("./view/container/resumes/ResumesSingleView")
    .then(({default: ResumesSingeView}) => this.abstractRouter(new ResumesSingeView({
        model: {
          userId: userId
        }
    }), LiveData.getUser()))
  },

  account() {
    return import('./view/container/account/AccountView')
    .then(({default: AccountView}) => this.abstractRouter(new AccountView({
      model: {
        user: LiveData.getUser(),
        profile: LiveData.getProfile()
      }
    }), LiveData.getUser()))
  },

  resume() {
    return import("./view/components/resume/dashboard/DashboardView")
    .then(({default: DashboardView}) => this.abstractRouter(new ResumeView({
      model: {
        user: LiveData.getUser(),
        viewToRenderAsContent: DashboardView,
        selectedSidebarItem: 'home'
      }
    }), LiveData.getUser()))
  },

  resumeExperiencesWorking() {
    return import("./collection/api/ProfessionalExperienceCollection")
    .then(({default: ProfessionalExperienceCollection}) => {
      return import("./view/components/resume/professional/professionalList/ProfessionalListView")
      .then(({default: ProfessionalListView}) =>  this.abstractRouter(new ResumeView({
        model: {
          user: LiveData.getUser(),
          viewToRenderAsContent: ProfessionalListView,
          selectedSidebarItem: 'experiences-working',
          collectionOfAPI: new ProfessionalExperienceCollection(),
        }
      }), LiveData.getUser()))
    })
  },

  resumeExperiencesVolunteering() {
    return import("./collection/api/VolunteerExperienceCollection")
    .then(({default: VolunteerExperienceCollection}) => {
      return import("./view/components/resume/volunteer/volunteerList/VolunteerListView")
      .then(({default: VolunteerListView}) => this.abstractRouter(new ResumeView({
        model: {
          user: LiveData.getUser(),
          viewToRenderAsContent: VolunteerListView,
          selectedSidebarItem: 'experiences-volunteering',
          collectionOfAPI: new VolunteerExperienceCollection(),
        }
      }), LiveData.getUser()))
    })
  },

  resumeEducations() {
    return import("./collection/api/EducationCollection")
    .then(({default: EducationCollection}) => {
      return import("./view/components/resume/education/educationList/EducationListView")
      .then(({default: EducationListView}) => this.abstractRouter(new ResumeView({
        model: {
          user: LiveData.getUser(),
          viewToRenderAsContent: EducationListView,
          selectedSidebarItem: 'educations',
          collectionOfAPI: new EducationCollection(),
        }
      }), LiveData.getUser()))
    })
  },

  resumeCertifications() {
    return import("./collection/api/CertificationCollection")
    .then(({default: CertificationCollection}) => {
      return import("./view/components/resume/certifications/certificationsList/CertificationsListView")
      .then(({default: CertificationsListView}) => this.abstractRouter(new ResumeView({
        model: {
          user: LiveData.getUser(),
          viewToRenderAsContent: CertificationsListView,
          selectedSidebarItem: 'certifications',
          collectionOfAPI: new CertificationCollection,
        }
      }), LiveData.getUser()))
    })
  },

  resumeSkills() {
    return import("./collection/api/SkillCollection")
    .then(({default: SkillCollection}) => {
      return import("./view/components/resume/skills/skillsList/SkillsListView")
      .then(({default: SkillsListView}) => this.abstractRouter(new ResumeView({
        model: {
          user: LiveData.getUser(),
          viewToRenderAsContent: SkillsListView,
          collectionOfAPI: new SkillCollection(),
          selectedSidebarItem: 'skills'
        }
      }), LiveData.getUser()))
    })
  },

  resumeLanguages() {
    return import("./collection/api/LanguageCollection")
    .then(({default: LanguageCollection}) => {
      return import("./view/components/resume/languages/languagesList/LanguagesListView")
      .then(({default: LanguagesListView}) =>       this.abstractRouter(new ResumeView({
        model: {
          user: LiveData.getUser(),
          viewToRenderAsContent: LanguagesListView,
          collectionOfAPI: new LanguageCollection(),
          selectedSidebarItem: 'languages'
        }
      }), LiveData.getUser()))
    })
  },

  resumePublications() {
    return import("./collection/api/PublicationCollection")
    .then(({default: PublicationCollection}) => {
      return import("./view/components/resume/publications/publicationsList/PublicationsListView")
      .then(({default: PublicationsListView}) =>       this.abstractRouter(new ResumeView({
        model: {
          user: LiveData.getUser(),
          viewToRenderAsContent: PublicationsListView,
          collectionOfAPI: new PublicationCollection(),
          selectedSidebarItem: 'publications'
        }
      }), LiveData.getUser()))
    })
  },

  about() {
    return import('./view/container/about/AboutView')
    .then(({default: AboutView}) => this.abstractRouter(new AboutView({
      model: {
        user: LiveData.getUser()
      }
    }), LiveData.getUser()))
  },

  login() {
    return import('./view/container/login/LoginView')
    .then(({default: LoginView}) => this.abstractRouter(new LoginView({
      model: {
        user: LiveData.getUser()
      }
    }), LiveData.getUser()))
  },

  register() {
    return import('./view/container/register/RegisterView')
    .then(({default: RegisterView}) => this.abstractRouter(new RegisterView({
      model: {
        user: LiveData.getUser()
      }
    }), LiveData.getUser()))
  },

  logout() {
    SecurityChannel.request(SecurityEvents.LOGOUT)
      .then(() => {
        this.navigate('#', { trigger: true })
      })
  }
})

const clearView = (selector) => {
  return Promise.resolve($(selector)
    .empty())
}

const appendView = (selector, view) => {
  return Promise.resolve($(selector)
    .append(view.el))
}

const clearRootView = () => {
  return clearView('#root')
}

export default AppRouter
