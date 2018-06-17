import puppeteer from 'puppeteer'

const pennStationURL = 'http://dv.njtransit.com/mobile/tid-mobile.aspx?SID=NY'
const pennStationSelector = '#GridView1 > tbody > tr'

function getTable(_selector, _theTab) {
  const theData = document.querySelectorAll(_selector)
  let trackList = []
  // the first three rows are 1) google ads 2) 'New York Penn Station Departures, 3) DEP TO TRK (a.k.k column headers)
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

export async function scrapeSite() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(pennStationURL);
  await page.waitForSelector(pennStationSelector);
  let theTab = '	'
  let content = await page.evaluate(getTable, pennStationSelector, theTab)
  let headers = [['DEP', 'TO', 'TRK', 'LINE', 'TRAIN', 'STATUS']]
  return headers.concat(content)
}
