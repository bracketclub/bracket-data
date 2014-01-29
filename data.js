var _extend = require('lodash-node/modern/objects/assign'),
    teamData = {
        "2012": {
            "regions": ["South", "West", "East", "MidWest"],
            "teams": {
                "South": "Kentucky,Duke,Baylor,Indiana,Wichita St,UNLV,Notre Dame,Iowa St,UConn,Xavier,Colorado,VCU,New Mexico St,S Dakota St,Lehigh,Western Kentucky",
                "West": "Mich St,Missouri,Marquette,Louisville,New Mexico,Murray St,Florida,Memphis,Saint Louis,Virginia,Colo St,L Beach St,Davidson,BYU,Norfolk St,LIU",
                "East": "Syracuse,Ohio St,Florida St,Wisconsin,Vanderbilt,Cincy,Gonzaga,Kansas St,So Miss,W Virginia,Texas,Harvard,Montana,St B'nvntre,Loyola MD,UNC-Ash",
                "MidWest": "UNC,Kansas,G'town,Michigan,Temple,SDSU,St Mary's,Creighton,Alabama,Purdue,NC State,USF,Ohio,Belmont,Detroit,UVM"
            }
        },
        "2013": {
            "regions": ["MidWest", "West", "South", "East"],
            "teams": {
                "MidWest": "Louisville,Duke,Michigan State,Saint Louis,Oklahoma State,Memphis,Creighton,Colorado State,Missouri,Cincinnati,Saint Mary's,Oregon,New Mexico State,Valparaiso,Albany,North Carolina A&T",
                "West": "Gonzaga,Ohio State,New Mexico,Kansas State,Wisconsin,Arizona,Notre Dame,Pittsburgh,Wichita State,Iowa State,Belmont,Mississippi,La Salle,Harvard,Iona,Southern",
                "South": "Kansas,Georgetown,Florida,Michigan,VCU,UCLA,San Diego State,North Carolina,Villanova,Oklahoma,Minnesota,Akron,South Dakota State,Northwestern State,Florida Gulf Coast,Western Kentucky",
                "East": "Indiana,Miami,Marquette,Syracuse,UNLV,Butler,Illinois,NC State,Temple,Colorado,Bucknell,California,Montana,Davidson,Pacific,James Madison"
            }
        }
    },
    finalData = {
        "FF": {
            "name": "Final Four"
        }
    };


module.exports = function (year) {
    var yearData = teamData[year || new Date().getFullYear()];
    if (yearData.finalData) return yearData;
    return _extend(yearData, {finalData: finalData});
};