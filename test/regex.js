var bracketData = require('../browser/index');
var assert = require('assert');

var events = [
    {
        bracket: "W1423121E1523131FW",
        sport: "nba",
        year: "2016"
    },
    {
        bracket: "W17462434142717E17542536173717FW7",
        sport: "nba",
        year: "2016"
    },
    {
        bracket: "MW18121311372112117177W168124631028123101233S181241131028411104114E1954614721462466FFWSS",
        sport: "ncaam",
        year: "2013"
    },
    {
        bracket: "MW19513637291362966W169121311147216121421622E1681213631021612310121012S1691213637216123716316FFMWSMW",
        sport: "ncaam",
        year: "2015"
    },
    {
        bracket: "S195411372141121111W19541131021532522E195463721437131MW19546141021562522FFSMWS",
        sport: "ncaam",
        year: "2016"
    },
    {
        bracket: "B1854113721432131D185463721432131S185463721532131L1854113721532122FFBSB",
        sport: "ncaaw",
        year: "2016"
    },
    {
        bracket: "C143536P142526M142727A172727FP7M7M7",
        sport: "nhl",
        year: "2016"
    },
    {
        bracket: "C133P122M122A122FPMM",
        sport: "nhl",
        year: "2016"
    }
];

describe('Bracket Data', function () {
    it('valid regex brackets', function () {
        events.forEach(function (e) {
            var b = bracketData({
                year: e.year,
                sport: e.sport
            });

            assert.ok(b.regex.test(e.bracket), [b.regex, e.sport, e.year, e.bracket].join('--'));
        });
    });
});
