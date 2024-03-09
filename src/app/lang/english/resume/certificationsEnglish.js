'use strict'

export const CertificationsEnglish = {
  'name': 'Name',
  'nameExample': 'eg CCNA-1',
  'organization': 'Organization',
  'organizationExample': 'eg CISCO',
  'canExpire': 'Can Expire',
  'startDate': 'Start date',
  'endDate': 'End date',
  'originalId': 'Original Id',
  'originalIdExample': 'eg A-123-BCD-52',
  'originalUrl': 'Original Url',
  'originalUrlExample': 'eg https://certifications.cisco.org/A-123-BCD-52',
  'actions': 'Actions',
  'add': {
    'title': 'Add certification',
    'submit': 'Add',
  },
  'update': {
    'title': 'Update certification',
    'submit': 'Update',
  },
  'delete': {
    'title': 'Delete certification',
    'body': 'Are you sure?',
    'submit': 'Yes',
    'cancel': 'No',
  },
  'form': {
    'name': {
      'required': 'Name is required.',
      'length': {
        'min': 'Name must have at least {0} characters.',
        'max': 'Name must have at most {0} characters.',
      },
    },
    'organization': {
      'required': 'Organization is required.',
      'length': {
        'min': 'Organization must have at least {0} characters.',
        'max': 'Organization must have at most {0} characters.',
      },
    },
    'startDate': {
      'required': 'Start date is required.',
    },
    'originalId': {
      'length': {
        'min': 'Original id must have at least {0} characters.',
        'max': 'Original id must have at most {0} characters.',
      },
    },
    'originalUrl': {
      'length': {
        'min': 'Original url must have at least {0} characters.',
        'max': 'Original url must have at most {0} characters.',
      },
    },
  },
}
