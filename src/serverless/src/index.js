const setup = require('./starter-kit/setup');
import {saveToS3} from './utils/s3'
import {scrapeSite} from './utils/scraper'
import {getTimestamp} from './utils/time'

exports.scrape = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  const browser = await setup.getBrowser()
  try {
    let result = scrapeSite(browser)
    let Key = getTimestamp()
    let Bucket = 'penn-station-nj-transit-departures'
    await saveToS3(Bucket, Key, result)
    callback(null, result)
  } catch (err) {
    callback(err)
  }
}
