const setup = require('./starter-kit/setup');
const {getTimestamp} = require('./utils/time')

exports.handler = async (event, context, callback) => {
  // For keeping the browser launch
  context.callbackWaitsForEmptyEventLoop = false;
  const browser = await setup.getBrowser();
  exports.run(browser).then(
    (result) => callback(null, result)
  ).catch(
    (err) => callback(err)
  );
};

function getTable(_selector, _theTab) {
  const theData = document.querySelectorAll(_selector)
  let trackList = []
  // the first three rows are 1) google ads 2) 'New York Penn Station
  // Departures, 3) DEP TO TRK (a.k.k column headers)
  theData.forEach((val, index) => {
    if (index > 2) {
      trackList.push(val)
    }
  })
  let innerTexts = trackList.map(el => el.innerText)
  let finalData = []
  innerTexts.forEach(txt => {
    finalData.push(txt.split(_theTab))
  })
  return finalData
}

exports.run = async (browser) => {
  // implement here
  // this is sample
  const page = await browser.newPage();
  await page.goto('http://dv.njtransit.com/mobile/tid-mobile.aspx?SID=NY',
   {waitUntil: ['domcontentloaded', 'networkidle0']}
  )
  console.log((await page.content()).slice(0, 500))

  await page.screenshot({path: '/tmp/screenshot.png'});
  const aws = require('aws-sdk');
  const s3 = new aws.S3({apiVersion: '2006-03-01'});
  const fs = require('fs');
  const screenshot = await new Promise((resolve, reject) => {
    fs.readFile('/tmp/screenshot.png', (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
  const pennStationSelector = '#GridView1 > tbody > tr'
  await page.waitForSelector(pennStationSelector)
  let theTab = '	'
  let content = await page.evaluate(getTable, pennStationSelector, theTab)
  let headers = [['DEP', 'TO', 'TRK', 'LINE', 'TRAIN', 'STATUS']]
  let Key = getTimestamp()
  await s3.putObject({
    Bucket: 'penn-station-nj-transit-departures',
    Key: Key + '.json',
    Body: JSON.stringify(headers.concat(content), null, 2)
  }).promise()
  await s3.putObject({
    Bucket: 'penn-station-nj-transit-departures-screenshots',
    Key: Key + '.png',
    Body: screenshot,
  }).promise();
  await page.close();
  return 'done';
};
