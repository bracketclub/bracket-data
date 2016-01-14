module.exports = function (data) {
    var exportData = {regions: {}};

    data.regions.forEach(function (region, index) {
        exportData.regions[region.id] = {
            name: region.name,
            fullname: region.fullname,
            sameSideAs: index % 2 ? data.regions[index - 1].id : data.regions[index + 1].id,
            teams: data.teams[region.id],
            id: region.id
        };
    });

    exportData.regions[data.finalRegion.id] = data.finalRegion;

    return exportData;
};
