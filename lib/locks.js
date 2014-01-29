var locks = {
        "2012": "Thu Mar 15 16:15:00 +0000 2012",
        "2013": "Thur Mar 21 16:15:00 +000 2013"
    };


module.exports = function (year) {
    return locks[year || new Date().getFullYear()];
};