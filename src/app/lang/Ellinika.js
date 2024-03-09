'use strict'

import { NavigationBarEllinika } from "./ellinika/navigationBarEllinika"
import { PortalEllinika } from "./ellinika/portalEllinika"
import { AuthEllinika } from "./ellinika/authEllinika"
import { UsersEllinika } from "./ellinika/usersEllinika"
import { AccountEllinika } from "./ellinika/accountEllinika"
import { ResumeEllinika } from "./ellinika/resumeEllinika"
import { AboutEllinika } from "./ellinika/aboutEllinika"

export default {
  'languageName': 'Ελληνικά',
  'appName': 'ResumeInSync',
  'appDesc': 'Ολοκληρωμένη Πλατφόρμα Διαχείρισης Βιογραφικού για Ιδιώτες',
  'developedBy': 'Αναπτύχθηκε από τον Ιορδάνη Κωστελίδη',
  'developedByUrl': 'https://linkedin.com/in/iordaniskostelidis',
  'reviewedBy': 'Επιτηρήθηκε από τον Δρ. Σταύρο Βολογιαννίδη',
  'reviewedByUrl': 'http://teachers.cm.ihu.gr/vologian/index.html',
  'copyright': 'Διεθνές Πανεπιστήμιο της Ελλάδος',
  'copyrightUrl': 'https://ihu.gr',
  'navigationBar': NavigationBarEllinika,
  'portal': PortalEllinika,
  'auth': AuthEllinika,
  'users': UsersEllinika,
  'account': AccountEllinika,
  'resume': ResumeEllinika,
  'resumes': {
    'title': 'Βιογραφικά',
    'fullName': 'Ονοματεπώνυμο',
    'firstName': 'Όνομα',
    'lastName': 'Επώνυμο',
    'mobilePhone': 'Κινητό τηλέφωνο',
    'actions': 'Ενέργειες',
  },
  'profile': {
    'success': {
      'publish': {
        'title': 'Το βιογραφικό σας δημοσιεύτηκε!'
      },
      'unpublish': {
        'title': 'Το βιογραφικό σας αποδημοσιεύτηκε!'
      },
    }
  },
  'about': AboutEllinika,
}
