'use strict'

export const EducationEllinika = {
  'school': 'Σχολείο/Πανεπιστήμιο',
  'schoolExample': 'π.χ. Διεθνές Πανεπιστήμιο της Ελλάδος',
  'degree': 'Επίπεδο',
  'degreeExample': 'π.χ. Μεταπτυχιακό',
  'field': "Τίτλος",
  'fieldExample': "π.χ. Ρομποτική",
  'startDate': 'Έναρξη',
  'endDate': 'Αποφοίτηση',
  'grade': 'Βαθμός',
  'gradeExample': 'π.χ. 7/10',
  'description': 'Περιγραφή',
  'descriptionExample': 'π.χ. Συμμετείχα σε φοιτηκές ομάδες όπως το IEEE',
  'actions': 'Ενέργειες',
  'add': {
    'title': 'Προσθήκη εκπαίδευσης',
    'submit': 'Προσθήκη',
  },
  'update': {
    'title': 'Ενημέρωση εκπαίδευσης',
    'submit': 'Ενημέρωση',
  },
  'delete': {
    'title': 'Διαγραφή εκπαίδευσης',
    'body': 'Είστε σίγουρος;',
    'submit': 'Ναι',
    'cancel': 'Όχι',
  },
  'form': {
    'school': {
      'required': 'Πρέπει να βάλετε σχολείο/πανεπιστήμιο.',
      'length': {
        'min': 'Το σχολείο/πανεπιστήμιο πρέπει να έχει τουλάχιστον {0} χαρακτήρες.',
        'max': 'Το σχολείο/πανεπιστήμιο πρέπει να έχει το πολύ {0} χαρακτήρες.',
      },
    },
    'degree': {
      'length': {
        'min': 'Το επίπεδο πρέπει να έχει τουλάχιστον {0} χαρακτήρες.',
        'max': 'Το επίπεδο πρέπει να έχει το πολύ {0} χαρακτήρες.',
      },
    },
    'field': {
      'length': {
        'min': 'Ο τίτλος πρέπει να έχει τουλάχιστον {0} χαρακτήρες.',
        'max': 'Ο τίτλος πρέπει να έχει το πολύ {0} χαρακτήρες.',
      },
    },
    'startDate': {
      'required': 'Πρέπει να βάλετε έναρξη.',
    },
    'grade': {
      'length': {
        'min': 'Ο βαθμός πρέπει να έχει τουλάχιστον {0} χαρακτήρες.',
        'max': 'Ο βαθμός πρέπει να έχει το πολύ {0} χαρακτήρες.',
      },
    },
    'description': {
      'length': {
        'min': 'Η περιγραφή πρέπει να έχει τουλάχιστον {0} χαρακτήρες.',
        'max': 'Η περιγραφή πρέπει να έχει το πολύ {0} χαρακτήρες.',
      },
    },
  },
}
