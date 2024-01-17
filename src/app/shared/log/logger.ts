import { IRequest } from './interfaces/IRequest'
import { dateTimeZoneFormat } from '@/utils/dateTimeZoneFormat'
import ConsoleLog from './integrations/ConsoleLog'

export const logger = (info: IRequest) => {
  const { date, time } = getDateNow()
  const log = new ConsoleLog(info, date, time)
  log.log()
}

const getDateNow = () => {
  const dateNow = dateTimeZoneFormat()
  const [date, timeseconds] = dateNow.split('T')
  const time = timeseconds.slice(0, 8)
  return { date, time }
}