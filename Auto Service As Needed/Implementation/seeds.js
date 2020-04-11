var mongoose = require("mongoose");
var Car = require("./models/cardb");
 
var data = [
    {
        CarId: 0,
        MilesTraveled: 7400, //will be an input
        CarLifeSpaninYears: 10, //will be recomnnended by the manufacturer
        LastServiceDate: '2019-12-09',
        MilesDuringLastService: 0,
        MilesBetweenServices: 7400,
        EngineId: 0,
        EngineManufactureDate: '2018-12-5',
        EngineLifeSpaninYears: 10,
        EngineLifeSpaninPercentage: 100, //Recommend when to get it changed
        EngineDaysOld: 300,
        DaysSinceEngineLastService: 300,
        EngineServiceNeeded: false,
        CarServiceNeeded: false,
        Serviced: false
    }
]
 
function seed(){
   Car.remove({}, function(err){
        if(err){
            console.log(err);
        }
            data.forEach(function(seed){
                Car.create(seed, function(err, car){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added cardetails to the db");
                    }
                });
            });
        });
    }
 
module.exports = seed;