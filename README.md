# PennStationNJTransit

The goal of this project is to serve two purposes.
1. Consistently scan the [NJTransit departure board](http://dv.njtransit.com/mobile/tid-mobile.aspx?SID=NY&SORT=A&size=75%) for Penn Station every 5 or so minutes (maybe every 1 minute?) and store the information presented there in a database.
2. Collect enough historical results on track numbers, times at which those track numbers appear, and delays, in order to create a predictive model that provides likelihoods that any given train (specified by departure time and line, like Montclair Boonton or Morristown) will depart from a specific track or be delayed.
