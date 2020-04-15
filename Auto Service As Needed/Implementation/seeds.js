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
        },
        {
            CarId: 109,
            MilesTraveled: 13222,
            AverageSpeed: 55,
            CarLifeSpaninYears: 10,
            LastServiceDate: '2019-03-22',
            MilesDuringLastService: 10000,
            MilesBetweenServices: 6000,
            EngineId: 12,
            EngineManufactureDate: '2018-06-12',
            EngineLifeSpaninYears: 10,
            EngineLifeSpaninPercentage: 90, //Recommend when to get it changed
            EngineDaysOld: 3213,
            AirFilterDaysOld: 212,
            FuelFilterDaysOld: 800,
            BrakeFluidDaysOld: 212,
            CoolantDaysOld: 212,
            DaysSinceGearBoxLastService: 3232,
            BatteryDaysOld: 212,
            TransmissionFluidDaysOld: 2777,
            BatteryTemperature: 70,
            TransmissionFluidTemperature: 91,
            EngineSparkPlugType: "Platinum", //Sometimes Iriduim
            CabelMilesUsed: 212,
            TimingBeltMilesUsed: 212,
            EngineSparkPlugMilesUsed: 212,
            PowerSteeringFluidMilesUsed: 212,
            HosesMilesUsed: 212,
            ClutchPlateMilesUsed: 212,
            TransmissionFluidMilesUsed: 212,
            CoolantMilesUsed: 212,
            BrakeRotersMilesUsed: 212,
            BrakeFluidMilesUsed: 212,
            DaysSinceEngineLastService: 200,
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
        },{
            CarId: 106,
            MilesTraveled: 1000,
            AverageSpeed: 67,
            CarLifeSpaninYears: 10,
            LastServiceDate: '2020-02-21',
            MilesDuringLastService: 3000,
            MilesBetweenServices: 6000,
            EngineId: 09,
            EngineManufactureDate: '2018-05-09',
            EngineLifeSpaninYears: 10,
            EngineLifeSpaninPercentage: 90, //Recommend when to get it changed
            EngineDaysOld: 124,
            AirFilterDaysOld: 124,
            FuelFilterDaysOld: 124,
            BrakeFluidDaysOld: 124,
            CoolantDaysOld: 124,
            DaysSinceGearBoxLastService: 124,
            BatteryDaysOld: 124,
            TransmissionFluidDaysOld: 124,
            BatteryTemperature: 73,
            TransmissionFluidTemperature: 71,
            EngineSparkPlugType: "Platinum", //Sometimes Iriduim
            CabelMilesUsed: 124,
            TimingBeltMilesUsed: 124,
            EngineSparkPlugMilesUsed: 124,
            PowerSteeringFluidMilesUsed: 124,
            HosesMilesUsed: 124,
            ClutchPlateMilesUsed: 124,
            TransmissionFluidMilesUsed: 123,
            CoolantMilesUsed: 231,
            BrakeRotersMilesUsed: 55000,
            BrakeFluidMilesUsed: 888,
            DaysSinceEngineLastService: 122,
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