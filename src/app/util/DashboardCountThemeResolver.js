export const resolveTheme = (name) => {
  switch (name) {
    case 'professionalExperiences': {
      return {
        theme: 'text-white bg-primary',
        icon: 'fa fa-briefcase'
      }
    }
    case 'volunteerExperiences': {
      return {
        theme: 'text-white bg-primary',
        icon: 'fa fa-users'
      }
    }
    case 'educations': {
      return {
        theme: 'text-white bg-primary',
        icon: 'fa fa-graduation-cap'
      }
    }
    case 'certifications': {
      return {
        theme: 'text-white bg-primary',
        icon: 'fa fa-certificate'
      }
    }
    case 'skills': {
      return {
        theme: 'text-white bg-primary',
        icon: 'fa fa-check'
      }
    }
    case 'languages': {
      return {
        theme: 'text-white bg-primary',
        icon: 'fa fa-language '
      }
    }
    case 'publications': {
      return {
        theme: 'text-white bg-primary',
        icon: 'fa fa-sticky-note'
      }
    }
    default: {
      return {
        theme: '',
        icon: ''
      }
    }
  }
}
