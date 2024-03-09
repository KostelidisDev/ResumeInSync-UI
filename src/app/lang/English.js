'use strict'

import { NavigationBarEnglish } from "./english/navigationBarEnglish"
import { PortalEnglish } from "./english/portalEnglish"
import { AuthEnglish } from "./english/authEnglish"
import { UsersEnglish } from "./english/usersEnglish"
import { AccountEnglish } from "./english/accountEnglish"
import { ResumeEnglish } from "./english/resumeEnglish"
import { AboutEnglish } from "./english/aboutEnglish"

export default {
  'languageName': 'English',
  'appName': 'ResumeInSync',
  'appDesc': 'All-in-One Resume Management Platform for Individuals',
  'developedBy': 'Developed by Iordanis Kostelidis',
  'developedByUrl': 'https://linkedin.com/in/iordaniskostelidis',
  'reviewedBy': 'Supervised by Dr. Stavros Vologiannidis',
  'reviewedByUrl': 'http://teachers.cm.ihu.gr/vologian/index.html',
  'copyright': 'International Hellenic University',
  'copyrightUrl': 'https://ihu.gr',
  'navigationBar': NavigationBarEnglish,
  'portal': PortalEnglish,
  'auth': AuthEnglish,
  'users': UsersEnglish,
  'account': AccountEnglish,
  'resume': ResumeEnglish,
  'resumes': {
    'title': 'Resumes',
    'fullName': 'Fullname',
    'firstName': 'First name',
    'lastName': 'Last name',
    'mobilePhone': 'Mobile phone',
    'actions': 'Actions',
  },
  'profile': {
    'success': {
      'publish': {
        'title': 'Your resume is now published!'
      },
      'unpublish': {
        'title': 'Your resume is now unpublished!'
      },
    }
  },
  'about': AboutEnglish,
}
