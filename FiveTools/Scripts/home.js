
var myRadarChart;

var ViewModel = function () {
    var self = this;

    self.playerOne = ko.observable();
    self.playerTwo = ko.observable();
    self.allBatters = ko.observableArray();

    self.getEveryPlayerStat = function (stat) {
        var array = [];

        for (var i = 0; i < self.allBatters().length; i++) {
            array.push(self.allBatters()[i][stat]);
        }

        return array.sort((a, b) => a - b);
    }

    self.allMappings = ko.observableArray([
        { enabled: true, label: 'Hitting', mapsTo: 'AVG'},
        { enabled: true, label: 'Power', mapsTo: 'ISO' },
        { enabled: true, label: 'Speed', mapsTo: 'UBR'}, //Spd
        { enabled: true, label: 'Glove', mapsTo: 'UZR'},
        { enabled: true, label: 'Arm', mapsTo: 'DRS'},
    ]);


    //TO DO Manage stat mappings
    ////enabled
    //this.selectedMappings = ko.pureComputed(function () {
    //    return self.allMappings().filter(function (value) {
    //        return value.enabled == true;
    //    })
    //})

    //this.availableStatMappings = ko.observableArray();

    ////computed
    //this.selectedLabels = ko.observableArray(['Hitting', 'Power', 'Speed', 'Glove', 'Arm']);


}
var vm = new ViewModel();

vm.playerOne.subscribe(function () {
    if (vm.playerOne() != null) {
        var player = vm.playerOne();
        var percentiles = playerPercentiles(player);
        var name = player.Name;
        UpdatePlayerChart(0,name, percentiles.hit, percentiles.power, percentiles.speed, percentiles.glove, percentiles.arm);
    }
});

vm.playerTwo.subscribe(function () {
    if (vm.playerTwo() != null) {
        var player = vm.playerTwo();
        var percentiles = playerPercentiles(player);
        var name = player.Name;
        UpdatePlayerChart(1,name, percentiles.hit, percentiles.power, percentiles.speed, percentiles.glove, percentiles.arm);
    }
});



function UpdatePlayerChart(dataset, name, hit, power, speed, glove, arm) {
    myRadarChart.data.datasets[dataset].label = name;
    myRadarChart.data.datasets[dataset].data[0] = hit;
    myRadarChart.data.datasets[dataset].data[1] = power;
    myRadarChart.data.datasets[dataset].data[2] = speed;
    myRadarChart.data.datasets[dataset].data[3] = glove;
    myRadarChart.data.datasets[dataset].data[4] = arm;

    myRadarChart.update();
}

function mappingItem(enabled, label, mapsTo, type) {
    return { enabled: enabled, label: label, mapsTo: mapsto, type: type };
}

var playerPercentiles = function (player) {
    //Move each to seperate
    var hit = percentRank(vm.getEveryPlayerStat('AVG'), player.AVG).toFixed(2) * 100;
    var power = percentRank(vm.getEveryPlayerStat('ISO'), player.ISO).toFixed(2) * 100;
    var speed = percentRank(vm.getEveryPlayerStat('SB'), player.SB).toFixed(2) * 100;
    var glove = percentRank(vm.getEveryPlayerStat('Def'), player.Def).toFixed(2) * 100;
    var arm = percentRank(vm.getEveryPlayerStat('WAR'), player.WAR).toFixed(2) * 100;

    return { hit: hit, power: power, speed: speed, glove: glove, arm: arm };
}



function UpdateLeagueAvgChart(hit, power, speed, glove, arm) {
    myRadarChart.data.datasets[2].data[0] = hit;
    myRadarChart.data.datasets[2].data[1] = power;
    myRadarChart.data.datasets[2].data[2] = speed;
    myRadarChart.data.datasets[2].data[3] = glove;
    myRadarChart.data.datasets[2].data[4] = arm;

    //black line no fill
    myRadarChart.update();
}


$(function () {
    initChart();
    
    ko.applyBindings(vm);

    $.get("/Home/AllBatters", function (data) {
        var stats = Object.keys(data[0]);
        stats.splice(stats.indexOf("PlayerId"), 1);
        stats.sort();
        vm.allBatters(data);
        vm.playerTwo(vm.allBatters()[1]);
    });
})


var initChart = function () {
    var pointSyle = 'rect';
    var pointRadius = 0;
    var data = {
        labels: ["Hitting", "Power", "Speed", "Glove", "Fielding"],
        datasets: [
            {
                label: "Player One",
                backgroundColor: "#01478533",
                borderColor: "#014785FF",
                pointBackgroundColor: "#014785",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#014785",
                pointHoverBorderColor: "#fff",
                data: [65, 59, 90, 81, 56],
                pointSyle: pointSyle,
                pointRadius: pointRadius
            },
            {
                label: "Player Two",
                backgroundColor: "#ed174d33",
                borderColor: "#ed174d",
                pointBackgroundColor: "#ed174d",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#ed174d",
                pointHoverBorderColor: "#fff",
                data: [28, 48, 40, 19, 96],
                pointSyle: pointSyle,
                pointRadius: pointRadius
            }
            //,
            //{
            //    label: "League Average",
            //    backgroundColor: "#ed174d33",
            //    borderColor: "#ed174d",
            //    pointBackgroundColor: "#ed174d",
            //    pointBorderColor: "#fff",
            //    pointHoverBackgroundColor: "#ed174d",
            //    pointHoverBorderColor: "#fff",
            //    data: [28, 48, 40, 19, 96]
            //}
        ]
    };
    var options = {
        //startAngle: 180,
        scale: {
            pointLabels: {
                fontFamily: 'Open Sans',
                fontSize: 14
            },
            //position: "bottom",
            ticks: {
                beginAtZero: true,
                min: 0,
                max: 100,
                stepSize: 20,
                fixedStepSize: 10
            }
        }
    };

    var ctx = document.getElementById("myChart");
    myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options
    });
}





// #region Percentiles
//https://gist.github.com/IceCreamYou/6ffa1b18c4c8f6aeaad2
// Returns the percentile of the given value in a sorted numeric array.

function percentRank(arr, v) {
    if (typeof v !== 'number') throw new TypeError('v must be a number');
    for (var i = 0, l = arr.length; i < l; i++) {
        if (v <= arr[i]) {
            while (i < l && v === arr[i]) i++;
            if (i === 0) return 0;
            if (v !== arr[i - 1]) {
                i += (v - arr[i - 1]) / (arr[i] - arr[i - 1]);
            }
            return i / l;
        }
    }
    return 1;
}


// #endregion
function Mapping(enabled, label, mapsTo) {
    this.enabled = enabled;
    this.enabled = enabled;
    this.label = mapsTo;
}