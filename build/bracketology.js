var _ = require('lodash')
var request = require('request')
var cheerio = require('cheerio')
var path = require('path')
var fs = require('fs')

var argv = require('minimist')(process.argv.slice(2), {
  default: {
    sport: 'ncaam'
  },
  alias: {
    y: 'year',
    s: 'sport'
  }
})
var sport = argv.sport
var year = argv.year

var urls = {
  'ncaam': 'http://espn.go.com/ncb/bracketology',
  'ncaaw': 'http://espn.go.com/womens-college-basketball/bracketology'
}
var url = urls[sport]

var regionMap = {
  'midwest': 'MW'
}
var specialNames = {
  'a&m': 'A&M',
  'a&t': 'A&T',
  'smu': 'SMU',
  'nc': 'NC',
  'lsu': 'LSU',
  'ny': 'NY',
  'uc': 'UC',
  'byu': 'BYU',
  'uab': 'UAB',
  'fl': 'FL',
  'fla': 'Fla',
  'ul': 'UL',
  'ucla': 'UCLA',
  'st': 'St',
  'utep': 'UTEP',
  '-little': '-Little',
  '-edwardsville': '-Edwardsville',
  '-cookman': '-Cookman',
  'unc': 'UNC',
  'vcu': 'VCU',
  'usc': 'USC',
  'csu': 'CSU',
  'siu': 'SIU',
  '-webb': '-Webb',
  'ut': 'UT',
  'ipfw': 'IPFW',
  'ualr': 'UALR',
  'tcu': 'TCU'
}

var replaceSpecialNames = function (name) {
  _.each(specialNames, function (newName, oldName) {
    var regexp = new RegExp('\\b' + oldName + '\\b', 'i')
    var match = name.match(regexp)
    if (match) {
      name = name.replace(match[0], newName)
    }
  })
  return name
}

var getTeamSeed = function (team) {
  return parseInt(team.trim().match(/^\d+/)[0], 10)
}

var getElText = function ($, selector) {
  return $(selector).map(function () { return $(this).text() }).get()
}

request(url, function (err, resp, body) {
  if (err) throw err

  var $ = cheerio.load(body)

  var sortedRegions = _.chunk(getElText($, '.team'), 16)
    .map(function (region) {
      return _.sortBy(region, getTeamSeed)
        .map(function (team) {
          team = team
            .trim()
            .replace(/\d/g, '')
            .toLowerCase()

          if (sport === 'ncaaw') {
            team = team.replace(/(.*)\/.*/, '$1')
          }

          return team
            .split(' ')
            .map(_.capitalize)
            .map(replaceSpecialNames)
            .join(' ')
        })
    })

  var regionIds = _.map(getElText($, '.region h3'), function (region) {
    var regionKey = region.toLowerCase()

    if (regionMap[regionKey]) {
      return regionMap[regionKey].toUpperCase()
    } else {
      return regionKey.charAt(0).toUpperCase()
    }
  })

  var teams = _.transform(regionIds, function (res, id, index) {
    res[id] = sortedRegions[index]
  }, {})

  if (year) {
    var dataDir = path.resolve(__dirname, '../data/' + sport)
    var jsonPath = dataDir + '/' + year + '.json'
    var data = require(jsonPath)
    data.teams = teams
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2))
  } else {
    process.stdout.write(JSON.stringify(teams, null, 2))
  }
})

