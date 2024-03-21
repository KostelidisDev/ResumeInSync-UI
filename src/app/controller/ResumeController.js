'use strict'

import { saveAs } from "file-saver"
import Radio from "backbone.radio"
import * as Channels from "../constants/channels/Channels"
import $ from "jquery"
import * as SecurityEvents from '../constants/channels/events/SecurityEvents'
import * as HTTPMethods from "../constants/common/HTTPMethods"
import APIConfig from "../config/APIConfig"
import * as ResumeEvents from "../constants/channels/events/ResumeEvents"
import * as Languages from "../lang/Languages"
import Swal from "sweetalert2"

const SecurityChannel = Radio.channel(Channels.SECURITY)
const resumeChannel = Radio.channel(Channels.RESUME)

export const downloadPdf = (profile) => {
  if (profile?.attributes?.user === undefined) {
    return Promise.reject("ERROR")
  }
  const { attributes: { user: { id: userId } } } = profile
  return Promise.resolve(
    $.ajax(
      {
        method: HTTPMethods.GET,
        url: resumeUrlGenerator(userId, 'pdf'),
        headers: {
          'Authorization': SecurityChannel.request(SecurityEvents.GET_BEARER_TOKEN),
        },
        xhr: () => {
          const xhr = new XMLHttpRequest()
          xhr.responseType = 'blob'
          return xhr
        },
      }
    ))
    .then(data => saveAs(data, nameGenerator(profile, 'pdf')))
}

export const downloadJson = (profile) => {
  if (profile?.attributes?.user == undefined) {
    return Promise.reject("ERROR")
  }
  const { attributes: { user: { id: userId } } } = profile

  return Promise.resolve(
    $.ajax(
      {
        method: HTTPMethods.GET,
        url: resumeUrlGenerator(userId, 'json'),
        headers: {
          'Authorization': SecurityChannel.request(SecurityEvents.GET_BEARER_TOKEN),
        },
      }
    ))
    .then(data => JSON.stringify(data))
    .then(data => new Blob([data], { type: 'application/json' }))
    .then(data => saveAs(data, nameGenerator(profile, 'json'))
    )
}

export const downloadHtml = (profile) => {
  if (profile?.attributes?.user == undefined) {
    return Promise.reject("ERROR")
  }
  const { attributes: { user: { id: userId } } } = profile

  return Promise.resolve(
    $.ajax(
      {
        method: HTTPMethods.GET,
        url: resumeUrlGenerator(userId, 'html'),
        headers: {
          'Authorization': SecurityChannel.request(SecurityEvents.GET_BEARER_TOKEN),
        },
      }
    ))
    .then(data => new Blob([data], { type: 'text/html' }))
    .then(data => saveAs(data, nameGenerator(profile, 'html')))
}

export const getHtmlIFrame = (profile) => {
  if (profile?.attributes?.user == undefined) {
    return Promise.reject("ERROR")
  }
  const { attributes: { user: { id: userId } } } = profile

  return Promise.resolve(resumeIFrameURLGenerator(userId))
    .then(url => Swal.fire('HTML iFrame URL', url))
}

export const fetchHtml = (userId) => {
  return Promise.resolve(
    $.ajax(
      {
        method: HTTPMethods.GET,
        url: resumeUrlGenerator(userId, 'html'),
        headers: {
          'Authorization': SecurityChannel.request(SecurityEvents.GET_BEARER_TOKEN),
        },
      }
    ))
}

export const uploadLinkedIn = () => {
  return Swal.fire({
    title: Languages.resolveKey('resume.dashboard.upload.linkedin.title'),
    input: 'file',
    inputAttributes: {
      'accept': 'zip/*',
      'aria-label': Languages.resolveKey('resume.dashboard.upload.linkedin.label')
    }
  })
    .then(({ value }) => {
      if (!(value)) {
        return Promise.resolve(false)
      }

      let formData = new FormData()
      formData.append('file', value)

      return $.ajax(
        {
          method: HTTPMethods.POST,
          url: urlUploadGenerator('linkedin'),
          data: formData,
          processData: false,
          contentType: false,
          headers: {
            'Authorization': SecurityChannel.request(SecurityEvents.GET_BEARER_TOKEN)
          }
        }
      )
      .then(() => Swal.fire({
        title: Languages.resolveKey('resume.dashboard.upload.linkedin.success'),
        icon: 'success'
      }))
    })
}

export const importZotero = () => {
  let htmlTitle = ""
  htmlTitle += Languages.resolveKey('resume.dashboard.import.zotero.title')
  htmlTitle += "<br />"
  htmlTitle += Languages.resolveKey('resume.dashboard.import.zotero.label')

  let zoteroId = 0

  return Swal.fire({
    title: htmlTitle,
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    preConfirm: (zoteroUserId) => {
      zoteroId = zoteroUserId
    },
    showCancelButton: true,
    confirmButtonText: Languages.resolveKey('resume.dashboard.import.zotero.submit'),
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading()
  })
  .then(() => {
    if(zoteroId > 0) {
      const importZoteroDto = {
        'userId': zoteroId
      }

      return $.ajax(
        {
          method: HTTPMethods.POST,
          url: urlImportGenerator('zotero'),
          headers: {
            'Authorization': SecurityChannel.request(SecurityEvents.GET_BEARER_TOKEN),
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(importZoteroDto),
        }
      )
      .then(() => {
        return Swal.fire({
          title: Languages.resolveKey('resume.dashboard.import.zotero.success'),
          icon: 'success'
        })
      })
    }
  })
}

export const reset = () => {
  return Swal.fire({
    title: Languages.resolveKey('resume.dashboard.reset.title'),
    text: Languages.resolveKey('resume.dashboard.reset.text'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: Languages.resolveKey('resume.dashboard.reset.cancel'),
    confirmButtonText: Languages.resolveKey('resume.dashboard.reset.confirm')
  }).then((result) => {
    if (!(result.isConfirmed)) {
      return
    }

    return Promise.resolve(
      $.ajax(
        {
          method: HTTPMethods.POST,
          url: `${APIConfig.API_FULL_PATH}/rpc/resume/reset`,
          headers: {
            'Authorization': SecurityChannel.request(SecurityEvents.GET_BEARER_TOKEN),
          },
        }
      ))
      .then(() => {
        return Swal.fire({
          title: Languages.resolveKey('resume.dashboard.reset.done'),
          icon: 'success'
        })
      })
  })
}

const nameGenerator = (profile, type) => {
  const { attributes: { firstName, lastName } } = profile

  return `${firstName}-${lastName}-cv.${type}`
}

const languageGenerator = () => {
  switch (Languages.getCurrentLanguageId()) {
    case 'EN': {
      return 'english'
    }
    case 'EL': {
      return 'greek'
      break
    }
    default: {
      return 'english'
      break
    }
  }
}

const resumeIFrameURLGenerator = (userId) => {
  const language = languageGenerator()
  return `${APIConfig.API_FULL_PATH}-embed/${userId}?language=${language}`
}

const resumeUrlGenerator = (userId, type) => {
  const language = languageGenerator()
  return `${APIConfig.API_FULL_PATH}/rpc/resume/${type}/${userId}?language=${language}`
}

const urlUploadGenerator = (type) => {
  return `${APIConfig.API_FULL_PATH}/rpc/resume/upload/${type}`
}

const urlImportGenerator = (type) => {
  return `${APIConfig.API_FULL_PATH}/rpc/resume/import/${type}`
}

resumeChannel.reply(ResumeEvents.DOWNLOAD_PDF, downloadPdf)
resumeChannel.reply(ResumeEvents.DOWNLOAD_JSON, downloadJson)
resumeChannel.reply(ResumeEvents.DOWNLOAD_HTML, downloadHtml)
resumeChannel.reply(ResumeEvents.GET_HTML_IFRAME, getHtmlIFrame)
resumeChannel.reply(ResumeEvents.FETCH_HTML, fetchHtml)
resumeChannel.reply(ResumeEvents.UPLOAD_LINKEDIN, uploadLinkedIn)
resumeChannel.reply(ResumeEvents.IMPORT_ZOTERO, importZotero)
resumeChannel.reply(ResumeEvents.RESET, reset)
