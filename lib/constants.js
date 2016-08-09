module.exports = function (data) {
  var finalData = data.finalRegion
  var regionIds = data.regions.map(function (r) { return r.id })
  var finalId = finalData.id
  var finalName = finalData.name
  var allIds = regionIds.concat(finalId)
  var teamsPerRegion = data.teams[Object.keys(data.teams)[0]].length
  var unpickedMatch = 'X'

  return {
    REGION_COUNT: regionIds.length,
    REGION_IDS: regionIds,
    FINAL_ID: finalId,
    ALL_IDS: allIds,
    EMPTY: allIds.join(new Array(teamsPerRegion).join(unpickedMatch)) + new Array(regionIds.length).join(unpickedMatch),
    FINAL_NAME: finalName,
    UNPICKED_MATCH: unpickedMatch,
    TEAMS_PER_REGION: teamsPerRegion
  }
}
