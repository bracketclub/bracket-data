var orders = {};

module.exports = function (year) {
    return orders[year || new Date().getFullYear()] || [1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15];
};