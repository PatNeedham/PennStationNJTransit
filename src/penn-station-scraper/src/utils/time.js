const moment = require('moment-timezone')

function getTimestamp() {
  return moment().tz('America/New_York').format('YYYY-MM-DDTHH:mm:ss')
}

module.exports = {
  getTimestamp
}
