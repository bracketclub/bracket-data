const utils = require("scores/test/utils");
const _ = require("lodash");
const getBracket = require("../lib/index");

/* Usage
  node build/names.js \
    ncaam \
    2017 \
    http://www.espn.com/mens-college-basketball/scoreboard/_/group/100/date/20170316 \
    http://www.espn.com/mens-college-basketball/scoreboard/_/group/100/date/20170317
 */
const [sport, year, ...urls] = process.argv.slice(2);

const parseUrl = (url) =>
  new Promise((resolve, reject) => {
    utils.parseUrl(url, {}, (err, events) => {
      if (err) return reject(err);
      return resolve(events);
    });
  });

// Get array of all teams from local bracket data
const data = getBracket({ sport, year });
const teams = data.constants.REGION_IDS.reduce((acc, id) => {
  const allTeams = data.bracket.regions[id].teams
    // Split by / for play in games before they've been eliminated
    .flatMap((t) => t.split("/"))
    .map((t) => t.trim());
  acc.push(...allTeams);
  return acc;
}, []).sort();

Promise.all(urls.map(parseUrl))
  .then((events) =>
    _.flatten(events)
      .reduce((acc, event) => {
        acc.push(...event.home.names);
        acc.push(...event.away.names);
        return acc;
      }, [])
      .sort()
  )
  .then((all) => {
    const missing = _.without(teams, ...all);
    if (missing.length) {
      console.log(JSON.stringify(all, null, 2));
      missing.forEach((team) => {
        console.log(team);
        console.log(all.filter((a) => a.startsWith(team)));
        console.log("-".repeat(80));
      });
    } else {
      console.log("All good");
    }
  });
