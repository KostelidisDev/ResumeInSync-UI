'use strict'

import EN from './English'
import EL from './Ellinika'
import LocalStorageController from './../controller/LocalStorageController'
import _ from 'underscore'
import Language from '../config/LanguageConfig'

const SupportedLanguages = new Map()
SupportedLanguages.set(Language.DEFAULT_LANGUAGE, EN)
SupportedLanguages.set('EN', EN)
SupportedLanguages.set('EL', EL)

export const getAvailableLanguages = () => {
  return _.map(Array.from(SupportedLanguages), supportedLanguage => {
    return {
      id: supportedLanguage['0'],
      language: supportedLanguage['1']['languageName']
    }
  })
}

export const getSelectedLanguage = () => {
  return getCurrentLanguageId()
}

export const getDefaultLang = () => SupportedLanguages.get(Language.DEFAULT_LANGUAGE)

export const changeLanguage = (languageId) => {

  if (_.isUndefined(LocalStorageController.getByKey(languageId))) {
    return
  }

  LocalStorageController.updateByKey(Language.LANGUAGE_KEY, languageId)
  return LocalStorageController.getByKey(languageId)
}

export const getCurrentLanguageId = () => {
  let currentLanguageId = Language.DEFAULT_LANGUAGE // DEFAULT

  if (_.isUndefined(LocalStorageController.getByKey('lang'))) {
    LocalStorageController.createByKey(Language.LANGUAGE_KEY, currentLanguageId)
  }

  currentLanguageId = LocalStorageController.getByKey(Language.LANGUAGE_KEY)

  if (SupportedLanguages.has(currentLanguageId)) {
    return currentLanguageId
  }

  LocalStorageController.updateByKey(Language.LANGUAGE_KEY, Language.DEFAULT_LANGUAGE)
  currentLanguageId = LocalStorageController.getByKey(Language.LANGUAGE_KEY)

  return currentLanguageId
}

export const getCurrentLang = () => SupportedLanguages.get(getCurrentLanguageId())

export const resolveKey = (originKey) => {
  const defaultLang = getDefaultLang()
  const currentLang = getCurrentLang()

  const arrayOfKeys = getSubStringArray(originKey, '.')

  let resolvedString = ''
  let defaultLangObj = defaultLang
  let currentLangObj = currentLang

  _.forEach(arrayOfKeys, (key, index, array) => {
    const isCurrentLangUndefined = _.isUndefined(currentLangObj)
    const isCurrentLangKeyUndefined = (isCurrentLangUndefined) ? true : _.isUndefined(currentLangObj[key])
    const isCurrentLangUndefinedAtAll = (isCurrentLangUndefined || isCurrentLangKeyUndefined)

    const isDefaultLangUndefined = _.isUndefined(defaultLangObj)
    const isDefaultLangKeyUndefined = (isDefaultLangUndefined) ? true : _.isUndefined(defaultLangObj[key])
    const isDefaultLangUndefinedAtAll = (isDefaultLangUndefined || isDefaultLangKeyUndefined)


    if (index < array.length - 1) {
      if (!(isCurrentLangUndefinedAtAll)) {
        currentLangObj = currentLangObj[key]
      }

      if (!(isDefaultLangUndefinedAtAll)) {
        defaultLangObj = defaultLangObj[key]
      }

      return
    }

    if (isCurrentLangUndefinedAtAll && isDefaultLangUndefinedAtAll) {
      resolvedString = originKey
      return
    }

    if (isCurrentLangUndefinedAtAll) {
      resolvedString = defaultLangObj[key]
      return
    }

    resolvedString = currentLangObj[key]
  })

  return resolvedString
}


const hasSubStrings = (key, stringSplit) => {
  return key.includes(stringSplit)
}

const getSubStringArray = (key, stringSplit) => {
  if (!(hasSubStrings(key, stringSplit))) {
    return [key]
  }

  return key.split(stringSplit)
}
