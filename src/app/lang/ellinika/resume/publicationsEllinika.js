'use strict'

export const PublicationsEllinika = {
  'title': 'Τίτλος',
  'titleExample': 'π.χ. A Bluetooth Traffic Light Time Extension System for Pedestrians with Disabilities',
  'publisher': 'Εκδότης',
  'publisherExample': 'π.χ. IEEE',
  'publicationDate': 'Ημερομηνία έκδοσης',
  'authors': 'Συγγραφείς',
  'authorsExample': 'π.χ. Pavlos Kokozidis, ' +
    'Iordanis Kostelidis, ' +
    'Myrsini Stasinou, ' +
    'Alexandra Salpigkti, ' +
    'Elpida-Vasiliki Theoxaridou, ' +
    'Alexandra Palioura, ' +
    'Aikaterini Mitsopoulou, ' +
    'Maria Papadopoulou',
  'url': 'Url',
  'urlExample': 'π.χ. https://ieeexplore.ieee.org/abstract/document/8908464',
  'description': 'Περιγραφή',
  'descriptionExample': 'π.χ. This paper presents a new and simple approach to traffic lights crosswalk time extension. ' +
    'It uses a seamless integration to conventional traffic lights based on low cost components and micro controllers. ' +
    'The goal of the presented project is to provide extra time to a pedestrian ' +
    'or a group of pedestrians with disabilities to pass a crosswalk.',
  'actions': 'Ενέργειες',
  'add': {
    'title': 'Προσθήκη δημοσίευσης',
    'submit': 'Προσθήκη',
  },
  'update': {
    'title': 'Ενημέρωση δημοσίευσης',
    'submit': 'Ενημέρωση',
  },
  'delete': {
    'title': 'Διαγραφή δημοσίευσης',
    'body': 'Είστε σίγουρος;',
    'submit': 'Ναι',
    'cancel': 'Όχι',
  },
  'form': {
    'title': {
      'required': 'Πρέπει να βάλετε τίτλο.',
      'length': {
        'min': 'Ο τίτλος πρέπει να έχει τουλάχιστον {0} χαρακτήρες.',
        'max': 'Ο τίτλος πρέπει να έχει το πολύ {0} χαρακτήρες.',
      },
    },
    'publisher': {
      'required': 'Πρέπει να βάλετε εκδότη.',
      'length': {
        'min': 'Ο εκδότης πρέπει να έχει τουλάχιστον {0} χαρακτήρες.',
        'max': 'Ο εκδότης πρέπει να έχει το πολύ {0} χαρακτήρες.',
      },
    },
    'publicationDate': {
      'required': 'Πρέπει να βάλετε ημερομηνία έκδοσης.',
    },
    'authors': {
      'required': 'Πρέπει να βάλετε συγγραφείς.',
      'length': {
        'min': 'Οι συγγραφείς πρέπει να έχουν τουλάχιστον {0} χαρακτήρες.',
        'max': 'Οι συγγραφείς πρέπει να έχουν το πολύ {0} χαρακτήρες.',
      },
    },
    'url': {
      'length': {
        'min': 'Το url πρέπει να έχει τουλάχιστον {0} χαρακτήρες.',
        'max': 'Το url πρέπει να έχει το πολύ {0} χαρακτήρες.',
      },
    },
    'description': {
      'required': 'Πρέπει να βάλετε περιγραφή.',
      'length': {
        'min': 'Η περιγραφή πρέπει να έχει τουλάχιστον {0} χαρακτήρες.',
        'max': 'Η περιγραφή πρέπει να έχει το πολύ {0} χαρακτήρες.',
      },
    },
  },
}
