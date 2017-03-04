var B = require('../lib/index')
var walkdir = require('walkdir')
var path = require('path')
var _ = require('lodash')
var fs = require('fs')
var alce = require('alce')
var mkdirp = require('mkdirp').sync
var dataDir = path.resolve(__dirname, '../data')
var staticDir = path.resolve(__dirname, '../browser')

var stringify = function (d) {
  return alce.stringify(d, {
    seedIndent: function (parent, object) {
      object.indent = ''
    },
    objectFormatter: function (parent, object) {
      object.innerPrologue = ''
    },
    insertFormatter: function (parent, insert) {
      insert.preamble = (parent.children.length ? ',' : '')
    },
    propertyFormatter: function (parent, property) {
      property.separator = ':'
    }
  })
}

var dataFiles = _.chain(walkdir.sync(dataDir)).filter(function (dataPath) {
  return path.extname(dataPath) === '.json' && path.basename(dataPath, '.json') !== 'defaults'
}).groupBy(function (dataPath) {
  return path.basename(path.dirname(dataPath))
}).map(function (years, sport) {
  years = years.map(function (y) { return path.basename(y, '.json') })
  return {sport: sport, years: years}
}).value()

var index = {}
mkdirp(staticDir)
dataFiles.forEach(function (df) {
  df.years.forEach(function (y) {
    var data = B({sport: df.sport, year: y})
    var a = stringify(data)
    index[df.sport] || (index[df.sport] = {})
    index[df.sport][y] = data
    fs.writeFileSync(staticDir + '/' + df.sport + '-' + y + '.js', 'module.exports=' + a + ';')
  })
})

var fnWrapper = function (d) {
  return 'module.exports=function (o) {var _i=' + d + ';return _i[o.sport][o.year];};'
}
fs.writeFileSync(staticDir + '/index.js', fnWrapper(stringify(index)))
