import {saveToS3} from './utils/s3'
import {scrapeSite} from './utils/scraper'
import {getTimestamp} from './utils/time'

export async function scrape(event, context, callback) {
  let data = await scrapeSite()
  console.log('the data:')
  console.log(JSON.stringify(data, null, 2))
  let Key = getTimestamp()
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Good',
      input: event,
    }),
  }
  callback(null, response)
}
