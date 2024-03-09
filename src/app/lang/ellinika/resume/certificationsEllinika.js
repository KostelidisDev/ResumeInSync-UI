'use strict'

export const CertificationsEllinika = {
  'name': 'Όνομα',
  'nameExample': 'π.χ CCNA-1',
  'organization': 'Οργανισμός',
  'organizationExample': 'π.χ. CISCO',
  'canExpire': 'Μπορεί να λήξει',
  'startDate': 'Έναρξη',
  'endDate': 'Λήξη',
  'originalId': 'Αρχικό Αναγνωριστικό',
  'originalIdExample': 'π.χ. A-123-BCD-52',
  'originalUrl': 'Αρχικό Url',
  'originalUrlExample': 'π.χ. https://certifications.cisco.org/A-123-BCD-52',
  'actions': 'Ενέργειες',
  'add': {
    'title': 'Προσθήκη πιστοποιητικού',
    'submit': 'Προσθήκη',
  },
  'update': {
    'title': 'Ενημέρωση πιστοποιητικού',
    'submit': 'Ενημέρωση',
  },
  'delete': {
    'title': 'Διαγραφή πιστοποιητικού',
    'body': 'Είστε σίγουροι;',
    'submit': 'Ναι',
    'cancel': 'Όχι',
  },
  'form': {
    'name': {
      'required': 'Πρέπει να βάλετε όνομα.',
      'length': {
        'min': 'Το όνομα πρέπει να έχει τουλάχιστον {0} χαρακτήρες.',
        'max': 'Το όνομα πρέπει να έχει το πολύ {0} χαρακτήρες.',
      },
    },
    'organization': {
      'required': 'Πρέπει να βάλετε οργανισμό.',
      'length': {
        'min': 'Ο οργανισμός πρέπει να έχει τουλάχιστον {0} χαρακτήρες.',
        'max': 'Ο οργανισμός πρέπει να έχει το πολύ {0} χαρακτήρες.',
      },
    },
    'startDate': {
      'required': 'Πρέπει να βάλετε έναρξη.',
    },
    'originalId': {
      'length': {
        'min': 'Το αρχικό αναγνωριστικό πρέπει να έχει τουλάχιστον {0} χαρακτήρες.',
        'max': 'Το αρχικό αναγνωριστικό πρέπει να έχει το πολύ {0} χαρακτήρες.',
      },
    },
    'originalUrl': {
      'length': {
        'min': 'Το αρχικό Url πρέπει να έχει τουλάχιστον {0} χαρακτήρες.',
        'max': 'Το αρχικό Url πρέπει να έχει το πολύ {0} χαρακτήρες.',
      },
    },
  },
}
