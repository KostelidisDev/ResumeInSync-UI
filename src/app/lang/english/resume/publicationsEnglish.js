'use strict'

export const PublicationsEnglish = {
  'title': 'Title',
  'titleExample': 'eg A Bluetooth Traffic Light Time Extension System for Pedestrians with Disabilities',
  'publisher': 'Publisher',
  'publisherExample': 'eg IEEE',
  'publicationDate': 'Publication Date',
  'authors': 'Authors',
  'authorsExample': 'eg Pavlos Kokozidis, ' +
    'Iordanis Kostelidis, ' +
    'Myrsini Stasinou, ' +
    'Alexandra Salpigkti, ' +
    'Elpida-Vasiliki Theoxaridou, ' +
    'Alexandra Palioura, ' +
    'Aikaterini Mitsopoulou, ' +
    'Maria Papadopoulou',
  'url': 'Url',
  'urlExample': 'eg https://ieeexplore.ieee.org/abstract/document/8908464',
  'description': 'Description',
  'descriptionExample': 'eg This paper presents a new and simple approach to traffic lights crosswalk time extension. ' +
    'It uses a seamless integration to conventional traffic lights based on low cost components and micro controllers. ' +
    'The goal of the presented project is to provide extra time to a pedestrian ' +
    'or a group of pedestrians with disabilities to pass a crosswalk.',
  'actions': 'Actions',
  'add': {
    'title': 'Add publication',
    'submit': 'Add',
  },
  'update': {
    'title': 'Update publication',
    'submit': 'Update',
  },
  'delete': {
    'title': 'Delete publication',
    'body': 'Are you sure?',
    'submit': 'Yes',
    'cancel': 'No',
  },
  'form': {
    'title': {
      'required': 'Title is required.',
      'length': {
        'min': 'Title must have at least {0} characters.',
        'max': 'Title must have at most {0} characters.',
      },
    },
    'publisher': {
      'required': 'Publisher is required.',
      'length': {
        'min': 'Publisher must have at least {0} characters.',
        'max': 'Publisher must have at most {0} characters.',
      },
    },
    'publicationDate': {
      'required': 'Publication date is required.'
    },
    'authors': {
      'required': 'Authors is required.',
      'length': {
        'min': 'Authors must have at least {0} characters.',
        'max': 'Authors must have at most {0} characters.',
      },
    },
    'url': {
      'required': 'Url is required.',
      'length': {
        'min': 'Url must have at least {0} characters.',
        'max': 'Url must have at most {0} characters.',
      },
    },
    'description': {
      'required': 'Description is required.',
      'length': {
        'min': 'Description must have at least {0} characters.',
        'max': 'Description must have at most {0} characters.',
      },
    },
  },
}
