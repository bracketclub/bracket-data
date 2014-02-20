var walkdir = require('walkdir');
var path = require('path');
var _ = require('lodash-node');
var fs = require('fs');
var getData = require('./data/index');
var dataPaths = walkdir.sync('./data');

var dataFiles = _.chain(dataPaths).filter(function (dataPath) {
    return path.extname(dataPath) === '.json' && path.basename(dataPath, '.json') !== 'defaults';
}).groupBy(function (dataPath) {
    return path.basename(path.dirname(dataPath));
}).value();

_.each(dataFiles, function (files, sport) {
    _.each(files, function (file) {
        var year = path.basename(file, '.json');
        var uniqueFilename = sport + '-' + year + '.js';

        var bracketData;
        try {
            bracketData = JSON.stringify(getData(sport, year));
        } catch (e) {
            bracketData = '{}';
        }

        var bracketDataFn = 'function (sport, year) {';
        bracketDataFn += 'if (sport !== "' + sport + '" || year !== "' + year + '") throw new Error();';
        bracketDataFn += 'return ' + bracketData + ';}';

        var mainFile = fs.readFileSync('./index.js', {encoding: 'utf8'});
        mainFile = mainFile.replace('require(\'./data/index\')', bracketDataFn);
        mainFile = mainFile.replace(/.\/lib\//g, '../lib/');
        fs.writeFileSync('./built/' + uniqueFilename, mainFile);

        var testFile = fs.readFileSync('./test/node/' + uniqueFilename, {encoding: 'utf8'});
        testFile = testFile.replace('../../index', '../../built/' + uniqueFilename);
        fs.writeFileSync('./test/browser/' + uniqueFilename, testFile);
    });
});

var testFile = fs.readFileSync('./test/node/test.js', {encoding: 'utf8'});
testFile = testFile.replace('../../index', '../../built/ncaa-mens-basketball-2013.js');
fs.writeFileSync('./test/browser/test.js', testFile);
