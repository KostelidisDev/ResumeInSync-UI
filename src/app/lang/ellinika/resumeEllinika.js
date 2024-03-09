'use strict'

import { ExperienceEllinika } from "./resume/experienceEllinika"
import { EducationEllinika } from "./resume/educationEllinika"
import { SkillsEllinika } from "./resume/skillsEllinika"
import { CertificationsEllinika } from "./resume/certificationsEllinika"
import { LanguagesElliniki } from "./resume/languagesEllinika"
import { PublicationsEllinika } from "./resume/publicationsEllinika"

export const ResumeEllinika = {
  'title': 'Διαχείριση βιογραφικού',
  'titles': {
    'dashboard': 'Πίνακας ελέγχου',
    'summary': 'Σύνοψη',
    'experiences': {
      'professional': 'Επαγγελματικές εμπειρίες',
      'volunteer': 'Εθελοντικές εμπειρίες',
    },
    'education': 'Εκπαίδευση',
    'certifications': 'Πιστοποιητικά',
    'skills': 'Ικανότητες',
    "publications": "Δημοσιεύσεις",
    'languages': 'Γλώσσες'
  },
  'not-supported-display-size': 'Δεν υποστηρίζουμε αυτή την στιγμή το μέγεθος της οθόνης σας. Παρακαλούμε να συνδεθείτε με συσκευή που έχει μεγαλύτερο μέγεθος οθόνης (π.χ. λάπτοπ).',
  'dashboard': {
    'profile': 'Το Προφίλ μου',
    'publishStatus': 'Δημοσιευμένο',
    'downloadResume': 'Λήψη',
    'uploadResume': 'Μεταφόρτωση',
    'resetResume': 'Επαναφορά',
    'reset': {
      'title': 'Επαναφορά του βιογραφικού',
      'text': 'Θέλετε να επαναφέρετε το βιογραφικό σας, αυτή η ενέργεια θα αφαιρέσει όλα τα δεδομένα από το βιογραφικό σας.',
      'confirm': 'Ναι',
      'cancel': 'Όχι',
      'done': 'Καταργήσαμε όλα τα δεδομένα από το βιογραφικό σας.'
    },
    'upload': {
      'linkedin': {
        'title': 'Μεταφόρτωση βιογραφικού από το LinkedIn',
        'label': 'Παρακαλώ επιλέξτε το αρχείο (zip) με τα LinkedIn δεδομένα σας.',
        'success': 'Αναλύσαμε και προσθέσαμε τα δεδομένα του LinkedIn στο βιογραφικό σας.'
      }
    },
    'import': {
      'zotero': {
        'title': 'Εισαγωγή δημοσιεύσεων από το Zotero',
        'label': 'Παρακαλώ εισάγετε το Zotero ID σας',
        'submit': 'Υποβολή',
        'success': 'Λάβαμε, αναλύσαμε και προσθέσαμε τις δημοσιεύσεις του Zotero στο βιογραφικό σας.'
      },
    },
    'counts': {
      'professionalExperiences': 'Επαγγελματικές εμπειρίες',
      'volunteerExperiences': 'Εθελοντικές εμπειρίες',
      'educations': 'Εκπαίδευση',
      'certifications': 'Πιστοποιητικά',
      'skills': 'Ικανότητες',
      "publications": "Δημοσιεύσεις",
      'languages': 'Γλώσσες'
    },
  },
  'experiences': ExperienceEllinika,
  'education': EducationEllinika,
  'skills': SkillsEllinika,
  'certifications': CertificationsEllinika,
  'languages': LanguagesElliniki,
  'publications': PublicationsEllinika,
  'importSource': 'Πηγή Δεδομένων',
  'dateRange': {
    'currently': 'Εν ενεργεία'
  }
}
