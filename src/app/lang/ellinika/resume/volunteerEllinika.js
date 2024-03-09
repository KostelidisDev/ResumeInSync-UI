'use strict'

export const VolunteerEllinika = {
  'role': 'Ρόλος',
  'roleExample': 'π.χ. μέλος',
  'description': 'Περιγραφή',
  'descriptionExample': 'π.χ. Technical Presentations',
  'organization': 'Οργανισμός',
  'organizationExample': 'π.χ. IEEE',
  'location': 'Τοποθεσία',
  'locationExample': 'π.χ. New York, USA',
  'startDate': 'Έναρξη',
  'endDate': 'Λήξη',
  'currently': 'Συμμετέχω ακόμα',
  'actions': 'Ενέργειες',
  'add': {
    'title': 'Προσθήκη εθελοντικής εμπειρίας',
    'submit': 'Προσθήκη',
  },
  'update': {
    'title': 'Ενημέρωση εθελοντικής εμπειρίας',
    'submit': 'Ενημέρωση',
  },
  'delete': {
    'title': 'Διαγραφή εθελοντικής εμπειρίας',
    'body': 'Είστε σίγουροι;',
    'submit': 'Ναι',
    'cancel': 'Όχι',
  },
  'form': {
    'role': {
      'required': 'Πρέπει να βάλετε ρόλο.',
      'length': {
        'min': 'Ο ρόλος πρέπει να έχει τουλάχιστον {0} χαρακτήρες.',
        'max': 'Ο ρόλος πρέπει να έχει το πολύ {0} χαρακτήρες.',
      },
    },
    'description': {
      'length': {
        'min': 'Η περιγραφή πρέπει να έχει τουλάχιστον {0} χαρακτήρες.',
        'max': 'Η περιγραφή πρέπει να έχει το πολύ {0} χαρακτήρες.',
      },
    },
    'organization': {
      'required': 'Πρέπει να βάλετε οργανισμό.',
      'length': {
        'min': 'Ο οργανισμός πρέπει να έχει τουλάχιστον {0} χαρακτήρες.',
        'max': 'Ο οργανισμός πρέπει να έχει το πολύ {0} χαρακτήρες.',
      },
    },
    'location': {
      'required': 'Πρέπει να βάλετε τοποθεσία.',
      'length': {
        'min': 'Η τοποθεσία πρέπει να έχει τουλάχιστον {0} χαρακτήρες.',
        'max': 'Η τοποθεσία πρέπει να έχει το πολύ {0} χαρακτήρες.',
      },
    },
    'startDate': {
      'required': 'Πρέπει να βάλετε έναρξη.',
    },
  },
}
