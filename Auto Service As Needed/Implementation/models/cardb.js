var mongoose= require("mongoose");
var cardbschema = new mongoose.Schema({
    CarId: Number,
    MilesTraveled: Number,
    AverageSpeed: Number,
    CarLifeSpaninYears: Number,
    LastServiceDate: Date,
    MilesDuringLastService: Number,
    MilesBetweenServices: Number,
    EngineId: Number,
    EngineManufactureDate: Date,
    EngineLifeSpaninYears: Number,
    EngineLifeSpaninPercentage: Number, //Recommend when to get it changed
    EngineDaysOld: Number,
    DaysSinceEngineLastService: Number,
    EngineServiceNeeded: Boolean,
    CarServiceNeeded: Boolean,
    Serviced: Boolean
});

module.exports = mongoose.model("Cardb", cardbschema);