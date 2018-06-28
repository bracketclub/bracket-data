module.exports = function (bestOf) {
  if (Array.isArray(bestOf)) return bestOf.map(function (__, index) { return index + 1 })
  if (bestOf === 1 || !bestOf) return []
  var min = Math.ceil(bestOf / 2)
  var max = bestOf
  var r = []
  for (; min <= max; min++) {
    r.push(min)
  }
  return r
}
