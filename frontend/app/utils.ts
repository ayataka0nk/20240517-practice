import { parseISO } from 'date-fns'
import { formatInTimeZone, toDate } from 'date-fns-tz'

type ParsedUTCDateTime<T> = T extends string ? Date : Date | undefined

export const parseUtcDate = <T extends string | undefined>(
  date: T
): ParsedUTCDateTime<T> => {
  if (typeof date === 'undefined') {
    return undefined as ParsedUTCDateTime<T>
  }
  // タイムゾーン指定がないISO8601形式の文字列を、UTCとしてDate型に変換するために使う
  return parseISO(date + 'Z')
}

export const parseDateAndTime = (
  date: string,
  time: string,
  timeZone: string
): Date | undefined => {
  // ユーザーがフィールドに入力した値を、指定したタイムゾーンを考慮したDate型に変換するために使う
  if (date === '' || time === '') {
    return undefined
  }
  const str = `${date}T${time}`
  const parsedDate = toDate(str, { timeZone: timeZone })
  return parsedDate
}

type FormattedDateTime<T> = T extends Date ? string : string | undefined
export const formatInTimeZoneToUtc = <T extends Date | undefined>(
  date: T
): FormattedDateTime<T> => {
  // サーバーにUTCで送信するときに使う
  if (typeof date === 'undefined') {
    return undefined as FormattedDateTime<T>
  }
  return formatInTimeZone(date, 'UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'")
}

export const getTimeZonedTodayDateString = (timeZone: string): string => {
  const today = new Date()
  const result = formatInTimeZone(today, timeZone, 'yyyy-MM-dd')
  return result
}

export const getTimeZone = async (): Promise<string> => {
  // ユーザーごとにタイムゾーンを設定できるようにするかも
  return 'Asia/Tokyo'
}

export const formatToYearMonthDate = (
  date: Date | undefined,
  timeZone: string
) => {
  if (typeof date === 'undefined') {
    return ''
  }
  return formatInTimeZone(date, timeZone, 'yyyy-MM-dd')
}

export const formatToHourMinute = (
  date: Date | undefined,
  timeZone: string
) => {
  if (typeof date === 'undefined') {
    return ''
  }
  return formatInTimeZone(date, timeZone, 'HH:mm')
}

export const formatMonthDateHourMinute = (
  date: Date | undefined,
  timeZone: string
): string => {
  if (typeof date === 'undefined') {
    return ''
  }
  return formatInTimeZone(date, timeZone, 'MM/dd hh:mm a')
}

// type ParsedUTCDateTime<T> = T extends string ? Date : Date | undefined

export const formatYearMonthDateHourMinute = (
  date: Date | undefined,
  timeZone: string
): string => {
  if (typeof date === 'undefined') {
    return ''
  }
  return formatInTimeZone(date, timeZone, 'yyyy/MM/dd hh:mm a')
}
