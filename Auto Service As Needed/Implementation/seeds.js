var mongoose = require("mongoose");
var Car = require("./models/cardb");
 
var data = [

        {
            CarId: 123,
            MilesTraveled: 610000,
            AverageSpeed: 60,
            CarLifeSpaninYears: 110,
            LastServiceDate: '2019-12-09',
            MilesDuringLastService: 581000,
            MilesBetweenServices: 118000,
            EngineId: 111,
            EngineManufactureDate: '2016-12-09',
            EngineLifeSpaninYears: 91,
            EngineLifeSpaninPercentage: 910, //Recommend when to get it changed
            DaysSinceEngineLastService: 4100,
            EngineDaysOld: 5150,
            AirFilterDaysOld: 11080,
            FuelFilterDaysOld: 7100,
            BrakeFluidDaysOld: 11500,
            CoolantDaysOld: 11600,
            DaysSinceGearBoxLastService: 11650,
            BatteryDaysOld: 11700,
            TransmissionFluidDaysOld: 21000,
            TransmissionFluidTemperature: 100, 
            BatteryTemperature: 515,
            EngineSparkPlugType: "Platinum", //Sometimes Iriduim
            CableMilesUsed: 1120000,
            TimingBeltMilesUsed: 1110000,
            EngineSparkPlugMilesUsed: 918000,
            PowerSteeringFluidMilesUsed: 1100002,
            HosesMilesUsed: 1105000,
            ClutchPlateMilesUsed: 1143000,
            TransmissionFluidMilesUsed: 1128000,
            CoolantMilesUsed: 1113000,
            BrakeRotersMilesUsed: 1109000,
            BrakeFluidMilesUsed: 195000,
            EngineServiceNeeded: false,
            AirFilterServiceNeeded: false,
            FuelFilterServiceNeeded: false,
            BrakeFluidServiceNeeded: false,
            BrakePadServiceNeeded: false,
            BrakeRotersServiceNeeded: false,
            CoolantServiceNeeded: false,
            TransmissionFluidServiceNeeded: false,
            GearBoxServiceNeeded: false,
            ClutchPlateServiceNeeded: false,
            HosesServiceNeeded: false,
            PowerSteeringServiceNeeded: false,
            EngineSparkPlugServiceNeeded: false,
            TimingBeltServiceNeeded:false,
            CabelServiceNeeded: false,
            BatteryServiceNeeded: false,
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