var getBestOfRange = require('./bestOfRange')

module.exports = function (data) {
  var finalData = data.finalRegion
  var regionIds = data.regions.map(function (r) { return r.id })
  var finalId = finalData.id
  var finalName = finalData.name
  var finalFullname = finalData.fullname
  var championshipName = finalData.championshipName
  var allIds = regionIds.concat(finalId)
  var teamsPerRegion = data.teams[Object.keys(data.teams)[0]].length
  var unpickedMatch = 'X'

  var constants = {
    BEST_OF: data.bestOf,
    REGION_COUNT: regionIds.length,
    REGION_IDS: regionIds,
    FINAL_ID: finalId,
    ALL_IDS: allIds,
    EMPTY: allIds.join(new Array(teamsPerRegion).join(unpickedMatch)) + new Array(regionIds.length).join(unpickedMatch),
    FINAL_NAME: finalName,
    FINAL_FULLNAME: finalFullname || finalName,
    FINAL_CHAMPIONSHIP_NAME: championshipName,
    UNPICKED_MATCH: unpickedMatch,
    TEAMS_PER_REGION: teamsPerRegion
  }

  var bestOfRange = getBestOfRange(data.bestOf)
  if (bestOfRange.length) {
    constants.BEST_OF_RANGE = bestOfRange
  }

  return constants
}
