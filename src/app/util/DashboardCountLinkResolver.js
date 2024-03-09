export const resolveLink = (name) => {
  switch (name) {
    case 'professionalExperiences': {
      return "/#/resume/experiences/working"
    }
    case 'volunteerExperiences': {
      return "/#/resume/experiences/volunteering"
    }
    case 'educations': {
      return "/#/resume/educations"
    }
    case 'certifications': {
      return "/#/resume/certifications"
    }
    case 'skills': {
      return "/#/resume/skills"
    }
    case 'languages': {
      return "/#/resume/languages"
    }
    case 'publications': {
      return "/#/resume/publications"
    }
    default: {
      return '/#/resume'
    }
  }
}
