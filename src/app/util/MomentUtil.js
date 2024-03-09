import Moment from 'moment'

import * as DateFormats from '../constants/common/DateFormats'
import * as DateUnits from "../constants/common/DateUnits"

const formatDateRangeWithoutTime = (dateRange) => {
  if (!(dateRange)) {
    return {
      startDate: '',
      endDate: ''
    }
  }

  const startDate = formatDateWithoutTime(dateRange.startDate)
  const endDate = formatDateWithoutTime(dateRange.endDate)

  return {
    startDate: startDate,
    endDate: endDate
  }
}

const formatDate = (dateToParse, formatToUse) => {
  const result = Moment(dateToParse)
    .format(formatToUse)

  if (result === "Invalid date") {
    return ""
  }

  return result
}

const formatDateWithTime = (dateToParse) => formatDate(dateToParse, DateFormats.DATE_WITH_TIME)

const formatDateWithoutTime = (dateToParse) => formatDate(dateToParse, DateFormats.DATE_WITHOUT_TIME)

const formatDateForAPI = (dateToParse) => formatDate(dateToParse, DateFormats.DATE_FOR_API)

const nowDateWithoutFormat = () => Moment.now()

const nowDateWithTime = () => formatDateWithTime(nowDateWithoutFormat())

const nowDateWithoutTime = () => formatDateWithoutTime(nowDateWithoutFormat())

const nowDateForAPI = () => formatDateForAPI(nowDateWithoutTime())

const differenceFromNow = (dateToCalculate, unitToCalculate) => Moment()
  .diff(dateToCalculate, unitToCalculate)

const differenceFromNowInYears = (dateToCalculate) => differenceFromNow(dateToCalculate, DateUnits.YEARS)

const differenceFromNowInDays = (dateToCalculate) => differenceFromNow(dateToCalculate, DateUnits.DAYS)

export default {
  formatDateRangeWithoutTime,
  formatDateWithTime,
  formatDateWithoutTime,
  formatDateForAPI,
  nowDateWithoutFormat,
  nowDateWithTime,
  nowDateWithoutTime,
  nowDateForAPI,
  differenceFromNowInYears,
  differenceFromNowInDays
}
