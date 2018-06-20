import moment from 'moment-timezone'

export function getTimestamp() {
  return moment().tz('America/New_York').format('YYYY-MM-DDTHH:mm:ss')
}
