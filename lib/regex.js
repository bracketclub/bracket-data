var consts = require('./constants')
var getBestOfRange = require('./bestOfRange')

var longestStr = function (arr) {
  var l = 0
  for (var i = 0, m = arr.length; i < m; i++) {
    l = Math.max(l, arr[i].length)
  }
  return l
}

module.exports = function (data) {
  var CONSTS = consts(data)

  var regionAlphas = CONSTS.REGION_IDS.join('')
  var biggestAlphaLength = longestStr(CONSTS.REGION_IDS)

  var biggestSeedLength = CONSTS.TEAMS_PER_REGION.toString().length

  var bestOfLength = data.bestOf === 1 ? 0 : data.bestOf.toString().length
  var bestOfRange = getBestOfRange(data.bestOf)

  var maxRegionPickLength = biggestSeedLength + bestOfLength
  var maxFinalPickLength = biggestAlphaLength + bestOfLength

  var possiblePickLength = function (i, max) {
    var index = i - 1
    return index + ',' + (index * max)
  }

  var regionRegEx = '([' + regionAlphas + ']{1,' + biggestAlphaLength + '})([\\d' + CONSTS.UNPICKED_MATCH + ']{' + possiblePickLength(CONSTS.TEAMS_PER_REGION, maxRegionPickLength) + '})'
  var finalRegEx = '(' + CONSTS.FINAL_ID + ')([' + regionAlphas + CONSTS.UNPICKED_MATCH + bestOfRange.join('') + ']{' + possiblePickLength(CONSTS.REGION_COUNT, maxFinalPickLength) + '})'

  return new RegExp(new Array(CONSTS.REGION_COUNT + 1).join(regionRegEx) + finalRegEx)
}
