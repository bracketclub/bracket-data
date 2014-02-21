var _defaults = require('lodash-node/modern/objects/defaults');
var _each = require('lodash-node/modern/collections/forEach');
var _keys = require('lodash-node/modern/objects/keys');
var data = function (sport, year) {if (sport !== "ncaa-mens-basketball" || year !== "2013") throw new Error();return {"scoring":{"standard":[10,20,40,80,160,320],"gooley":[[1,1,1.1,1.3,1.4,1.5,1.7,2,2,2.5,3,3.4,4.5,7.9,24,155.2],[1.3,1.4,1.7,2.2,2.7,3.8,5.3,7.9,8.4,9.9,10.3,11.4,12.6,23.7,73.9,489.9],[1.8,2.3,3.2,5.2,7,9.8,12.8,20,22.5,30.3,37.2,61.2,85.1,148.7,418.1,2980.1],[2.9,4.2,6.7,11.2,16.8,26,37.3,58.5,71.3,110.5,154.9,259.9,435.3,1075.8,3891.9,33470.3],[4.8,8,14.3,26.4,43.7,73.2,112.6,188.5,247,418.8,663.8,1314.6,2736.4,8869.5,44100,538667],[8.4,15.6,31.6,65.4,119.4,216.3,355.9,636.1,897.9,1677.8,3045.8,7278.9,19477.9,86758,629567.3,11729601.9]]},"order":[1,16,8,9,5,12,4,13,6,11,3,14,7,10,2,15],"finalRegion":{"id":"FF","name":"Final Four"},"regions":[{"id":"MW","name":"Midwest","fullname":"Midwest Region"},{"id":"W","name":"West","fullname":"West Region"},{"id":"S","name":"South","fullname":"South Region"},{"id":"E","name":"East","fullname":"East Region"}],"teams":{"S":["Kansas","Georgetown","Florida","Michigan","VCU","UCLA","San Diego State","North Carolina","Villanova","Oklahoma","Minnesota","Akron","South Dakota State","Northwestern State","Florida Gulf Coast","Western Kentucky"],"W":["Gonzaga","Ohio State","New Mexico","Kansas State","Wisconsin","Arizona","Notre Dame","Pittsburgh","Wichita State","Iowa State","Belmont","Mississippi","La Salle","Harvard","Iona","Southern"],"E":["Indiana","Miami","Marquette","Syracuse","UNLV","Butler","Illinois","NC State","Temple","Colorado","Bucknell","California","Montana","Davidson","Pacific","James Madison"],"MW":["Louisville","Duke","Michigan State","Saint Louis","Oklahoma State","Memphis","Creighton","Colorado State","Missouri","Cincinnati","Saint Mary's","Oregon","New Mexico State","Valparaiso","Albany","North Carolina A&T"]},"locks":"Thur Mar 21 16:15:00 +000 2013"};};
var methods = {
    bracket: require('../lib/bracket'),
    constants: require('../lib/constants'),
    regex: require('../lib/regex'),
    order: function (data) {
        return data.order;
    },
    scoring: function (data) {
        return data.scoring;
    },
    locks: function (data) {
        return data.locks;
    }
};

function Bracket(options) {
    _defaults(options, {
        props: ['bracket'],
        year: '',
        sport: ''
    });

    var bracketData = data(options.sport, options.year);

    if (options.props === 'all' || options.props[0] === 'all') {
        options.props = _keys(methods);
    }

    _each(options.props, function (prop) {
        this[prop] = typeof methods[prop] === 'function' && methods[prop](bracketData);
    }, this);
}

module.exports = Bracket;
