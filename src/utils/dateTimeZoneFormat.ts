import moment from 'moment-timezone'

const TIMEZONE = process.env.TIMEZONE || 'America/Tijuana'

export const dateTimeZoneFormat = () => {
  return moment().tz(TIMEZONE).format()
}
