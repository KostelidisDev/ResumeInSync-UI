'use strict'

import { ExperienceEnglish } from "./resume/experienceEnglish"
import { EducationEnglish } from "./resume/educationEnglish"
import { SkillsEnglish } from "./resume/skillsEnglish"
import { CertificationsEnglish } from "./resume/certificationsEnglish"
import { LanguagesEnglish } from "./resume/languagesEnglish"
import { PublicationsEnglish } from "./resume/publicationsEnglish"

export const ResumeEnglish = {
  'title': 'Resume Management',
  'titles': {
    'dashboard': 'Dashboard',
    'summary': 'Summary',
    'experiences': {
      'professional': 'Professional Experiences',
      'volunteer': 'Volunteer Experiences',
    },
    'education': 'Educations',
    'certifications': 'Certificates',
    'skills': 'Skills',
    'languages': 'Languages',
    'publications': 'Publications',
  },
  'not-supported-display-size': 'We don\t support currenly your display size. Please login from a device with bigger display size (eg Laptop)',
  'dashboard': {
    'profile': 'My Profile',
    'publishStatus': 'Published',
    'downloadResume': 'Download',
    'uploadResume': 'Upload',
    'resetResume': 'Reset',
    'reset': {
      'title': 'Resume Reset',
      'text': 'You want to reset your resume, this action will remove all data from your resume.',
      'confirm': 'Yes',
      'cancel': 'No',
      'done': 'We have removed all data from your resume.'
    },
    'upload': {
      'linkedin': {
        'title': 'Upload LinkedIn Data',
        'label': 'Please pick your LinkedIn Archive File',
        'success': 'We have parsed and added the LinkedIn data on your resume.'
      },
    },
    'import': {
      'zotero': {
        'title': 'Import Zotero Data',
        'label': 'Please enter your Zotero ID',
        'submit': 'Submit',
        'success': 'We have received, parsed and added the Zotero data on your resume.'
      },
    },
    'counts': {
      'professionalExperiences': 'Professional Experiences',
      'volunteerExperiences': 'Volunteer Experiences',
      'educations': 'Educations',
      'certifications': 'Certificates',
      'skills': 'Skills',
      'languages': 'Languages',
      'publications': 'Publications',
    },
  },
  'experiences': ExperienceEnglish,
  'education': EducationEnglish,
  'skills': SkillsEnglish,
  'certifications': CertificationsEnglish,
  'languages': LanguagesEnglish,
  'publications': PublicationsEnglish,
  'importSource': 'Source of Data',
  'dateRange': {
    'currently': 'Currently'
  }
}
