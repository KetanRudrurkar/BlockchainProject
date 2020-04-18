var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var Car = require("./models/cardb");
var seed = require("./seeds")
var path = require("path");
app.use(express.static(__dirname + "/etc")); // using CSS and images from public directory
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/carapp", { useNewUrlParser: true });

seed();

allparts = ["Engine", "Air Filter", "Fuel Filter", "brake fluid", "brake pads/shoes", "brake roters", "coolant", "Transmission fluid", "Gear box", "Clutch plate", "hoses", "Power Steering fluid", "Engine Spark Plug", "Timing belt" ]
PartsThatNeedService = []
PartsThatDontNeedService = []
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("index", { cardata: null , singleData : false, message: "" });
})

async function checkengine(data) {
    var servicerecommendedindays = 180;
    var servicerecommendedinmiles = 7500;
    var daysscore = 10 - ((data.DaysSinceEngineLastService * 10) / servicerecommendedindays);
    // console.log("engine age rating is", enginedaysscore);
    var milesscore = 10 - ((data.MilesBetweenServices * 10) / servicerecommendedinmiles);
    // console.log("engine miles rating is", enginemilesscore);
    var averagespeed = data.averagespeed;
    var averagespeedscore;
    if (averagespeed >= 60 && averagespeed <= 70) {
        averagespeedscore = 10
    }
    else if (averagespeed >= 30 && averagespeed < 60) {
        averagespeedscore = 8
    }
    else if (averagespeed > 70 && averagespeed < 100) {
        averagespeedscore = 5
    }
    else {
        averagespeedscore = 2
    }

    var totalpartscore = ((daysscore + milesscore + averagespeedscore) / 30) * 100;
    if (totalpartscore < 40) {
        updateParam = { EngineServiceNeeded: true, CarServiceNeeded: true, Serviced: false }
        needUpdate = await updateCarInfoById(updateParam, data._id)
        while(PartsThatNeedService.length > 0) {
            console.log("clearing Array 1")
            PartsThatNeedService.pop();
        }
        while(PartsThatDontNeedService.length > 0) {
            console.log("clearing Array 1")
            PartsThatDontNeedService.pop();
        }
        PartsThatNeedService.push("Engine");
        console.log(data, "TO check array");
    }
    else{
        while(PartsThatNeedService.length > 0) {
            PartsThatNeedService.pop();
        }
        while(PartsThatDontNeedService.length > 0) {
            PartsThatDontNeedService.pop();
        }
        PartsThatDontNeedService.push("Engine");
    }
}

async function checkairfilter(data) {
    var servicerecommendedindays = 1095;
    var servicerecommendedinmiles = 20000;
    var daysscore = 10 - ((data.AirFilterDaysOld * 10) / servicerecommendedindays);
    // console.log("engine age rating is", enginedaysscore);
    var milesscore = 10 - ((data.MilesBetweenServices * 10) / servicerecommendedinmiles);
    // console.log("engine miles rating is", enginemilesscore);
    var totalpartscore = ((daysscore + milesscore) / 20) * 100;
    if (totalpartscore < 40) {
        updateParam = { AirFilterServiceNeeded: true, CarServiceNeeded: true, Serviced: false }
        needUpdate = await updateCarInfoById(updateParam, data._id)
        PartsThatNeedService.push("Air Filter");
        console.log(data, "TO check array");
    }
    else{
        PartsThatDontNeedService.push("Air Filter");
    }
}

async function checkfuelfilter(data) {
    var servicerecommendedindays = 730;
    var servicerecommendedinmiles = 30000;
    var daysscore = 10 - ((data.FuelFilterDaysOld * 10) / servicerecommendedindays);
    // console.log("engine age rating is", enginedaysscore);
    var milesscore = 10 - ((data.MilesBetweenServices * 10) / servicerecommendedinmiles);
    // console.log("engine miles rating is", enginemilesscore);
    var totalpartscore = ((daysscore + milesscore) / 20) * 100;
    if (totalpartscore < 40) {
        updateParam = { FuelFilterServiceNeeded: true, CarServiceNeeded: true, Serviced: false }
        needUpdate = await updateCarInfoById(updateParam, data._id)
        PartsThatNeedService.push("Fuel Filter");
        // console.log(data, "TO check array");
    }
    else{
        PartsThatDontNeedService.push("Fuel Filter");
    }
}

async function checkbreakfluid(data) {
    var servicerecommendedindays = 730;
    var servicerecommendedinmiles = 24000;
    var daysscore = 10 - ((data.BrakeFluidDaysOld * 10) / servicerecommendedindays);
    // console.log("engine age rating is", enginedaysscore);
    var milesscore = 10 - ((data.BrakeFluidMilesUsed * 10) / servicerecommendedinmiles);
    // console.log("engine miles rating is", enginemilesscore);
    var totalpartscore = ((daysscore + milesscore) / 20) * 100;
    if (totalpartscore < 40) {
        updateParam = { BrakeFluidServiceNeeded: true, CarServiceNeeded: true, Serviced: false }
        needUpdate = await updateCarInfoById(updateParam, data._id)
        PartsThatNeedService.push("Brake Fluid");
        // console.log(data, "TO check array");
    }
    else{
        PartsThatDontNeedService.push("Brake Fluid");
    }
}


async function checkbreakpads(data) {
    var servicerecommendedinmiles = 50000;    
    if (data.MilesBetweenServices > 50000) {
        updateParam = { BrakePadServiceNeeded: true, CarServiceNeeded: true, Serviced: false }
        needUpdate = await updateCarInfoById(updateParam, data._id)
        PartsThatNeedService.push("Brake Pads");
        // console.log(data, "TO check array");
    }
    else{
        PartsThatDontNeedService.push("Brake Pads");
    }
}

async function checkbreakroters(data) {
    var servicerecommendedinmiles = 50000;    
    if (data.BrakeRotersMilesUsed > servicerecommendedinmiles) {
        updateParam = { BrakeRotersServiceNeeded: true, CarServiceNeeded: true, Serviced: false }
        needUpdate = await updateCarInfoById(updateParam, data._id)
        PartsThatNeedService.push("Brake Roters");
        // console.log(data, "TO check array");
    }
    else{
        PartsThatDontNeedService.push("Brake Roters");
    }
}

async function checkcoolant(data) {
    var servicerecommendedindays = 1460;
    var servicerecommendedinmiles = 60000;
    var daysscore = 10 - ((data.CoolantDaysOld * 10) / servicerecommendedindays);
    // console.log("engine age rating is", enginedaysscore);
    var milesscore = 10 - ((data.CoolantMilesUsed * 10) / servicerecommendedinmiles);
    // console.log("engine miles rating is", enginemilesscore);
    var totalpartscore = ((daysscore + milesscore) / 20) * 100;
    if (totalpartscore < 40) {
        updateParam = { CoolantServiceNeeded: true, CarServiceNeeded: true, Serviced: false }
        needUpdate = await updateCarInfoById(updateParam, data._id)
        PartsThatNeedService.push("Coolant");
        // console.log(data, "TO check array");
    }
    else{
        PartsThatDontNeedService.push("Coolant");
    }
}

async function checktransmissionfluid(data) {
    var servicerecommendedindays = 2555;
    var servicerecommendedinmiles = 100000;
    var daysscore = 10 - ((data.TransmissionFluidDaysOld * 10) / servicerecommendedindays);
    // console.log("engine age rating is", enginedaysscore);
    var milesscore = 10 - ((data.TransmissionFluidMilesUsed * 10) / servicerecommendedinmiles);
    // console.log("engine miles rating is", enginemilesscore);
    var totalpartscore = ((daysscore + milesscore) / 20) * 100;
    if (totalpartscore < 40) {
        updateParam = { TransmissionFluidServiceNeeded: true, CarServiceNeeded: true, Serviced: false }
        needUpdate = await updateCarInfoById(updateParam, data._id)
        PartsThatNeedService.push("Transmission Fluid");
        // console.log(data, "TO check array");
    }
    else{
        PartsThatDontNeedService.push("Transmission Fluid");
    }
}

async function checkgearbox(data) {
    var servicerecommendedindays = 2555;
    var servicerecommendedinmiles = 10000;
    var daysscore = 10 - ((data.DaysSinceGearBoxLastService * 10) / servicerecommendedindays);
    // console.log("engine age rating is", enginedaysscore);
    var milesscore = 10 - ((data.MilesBetweenServices * 10) / servicerecommendedinmiles);
    // console.log("engine miles rating is", enginemilesscore);
    var totalpartscore = ((daysscore + milesscore) / 20) * 100;
    if (totalpartscore < 40) {
        updateParam = { GearBoxServiceNeeded: true, CarServiceNeeded: true, Serviced: false }
        needUpdate = await updateCarInfoById(updateParam, data._id)
        PartsThatNeedService.push("Gear Box");
        // console.log(data, "TO check array");
    }
    else{
        PartsThatDontNeedService.push("Gear Box");
    }
}

async function checkclutchplate(data) {
    var servicerecommendedinmiles = 60000;
    if(data.TransmissionFluidTemperature>=70 && data.TransmissionFluidTemperature<=80 ){
        var temperaturescore = 10
    }
    else if(data.TransmissionFluidTemperature>=50 && data.TransmissionFluidTemperature<70 ){
        var temperaturescore = 8
    }
    else if(data.TransmissionFluidTemperature>80 && data.TransmissionFluidTemperature<110 ){
        var temperaturescore = 6
    }
    else{
        var temperaturescore = 3
    }

    // console.log("engine age rating is", enginedaysscore);
    var milesscore = 10 - ((data.TransmissionFluidMilesUsed * 10) / servicerecommendedinmiles);
    // console.log("engine miles rating is", enginemilesscore);
    var totalpartscore = ((temperaturescore + milesscore) / 20) * 100;
    if (totalpartscore < 40) {
        updateParam = { ClutchPlateServiceNeeded: true, CarServiceNeeded: true, Serviced: false }
        needUpdate = await updateCarInfoById(updateParam, data._id)
        PartsThatNeedService.push("Clutch Plate");
        // console.log(data, "TO check array");
    }
    else{
        PartsThatDontNeedService.push("Clutch Plate");
    }
}

async function checkhoses(data) {
    var servicerecommendedinmiles = 100000;    
    if (data.HosesMilesUsed > servicerecommendedinmiles) {
        updateParam = { HosesServiceNeeded: true, CarServiceNeeded: true, Serviced: false }
        needUpdate = await updateCarInfoById(updateParam, data._id)
        PartsThatNeedService.push("Hoses");
        // console.log(data, "TO check array");
    }
    else{
        PartsThatDontNeedService.push("Hoses");
    }
}

async function checkpowersteeringfluid(data) {
    var servicerecommendedinmiles = 90000;    
    if (data.PowerSteeringFluidMilesUsed > servicerecommendedinmiles) {
        updateParam = { PowerSteeringServiceNeeded: true, CarServiceNeeded: true, Serviced: false }
        needUpdate = await updateCarInfoById(updateParam, data._id)
        PartsThatNeedService.push("Power Steering Fluid");
        // console.log(data, "TO check array");
    }
    else{
        PartsThatDontNeedService.push("Power Steering Fluid");
    }
}

async function checkenginesparkplug(data) {
    if(data.EngineSparkPlugType == "Platinum" || data.EngineSparkPlugType =="Iridium"){
        var servicerecommendedinmiles = 100000;    
    }
    else{
        var servicerecommendedinmiles = 90000;
    }
    if (data.EngineSparkPlugMilesUsed > servicerecommendedinmiles) {
        updateParam = { EngineSparkPlugServiceNeeded: true, CarServiceNeeded: true, Serviced: false }
        needUpdate = await updateCarInfoById(updateParam, data._id)
        PartsThatNeedService.push("Engine Spark Plug");
        // console.log(data, "TO check array");
    }
    else{
        PartsThatDontNeedService.push("Engine Spark Plug");
    }
}

async function checktimingbelt(data) {
    var servicerecommendedinmiles = 90000;    
    if (data.TimingBeltMilesUsed > servicerecommendedinmiles) {
        updateParam = { TimingBeltServiceNeeded: true, CarServiceNeeded: true, Serviced: false }
        needUpdate = await updateCarInfoById(updateParam, data._id)
        PartsThatNeedService.push("Timing Belt");
        // console.log(data, "TO check array");
    }
    else{
        PartsThatDontNeedService.push("Timing Belt");
    }
}

async function checkcable(data) {
    var servicerecommendedinmiles = 100000;    
    if (data.CableMilesUsed > servicerecommendedinmiles) {
        updateParam = { CabelServiceNeeded: true, CarServiceNeeded: true, Serviced: false}
        needUpdate = await updateCarInfoById(updateParam, data._id)
        PartsThatNeedService.push("Cables");
        // console.log(data, "TO check array");
    } 
    else{
        PartsThatDontNeedService.push("Cables");
    }
}

async function checkbattery(data) {
    var servicerecommendedindays = 1460;
    if(data.TransmissionFluidTemperature>=70 && data.TransmissionFluidTemperature<=80 ){
        var temperaturescore = 10
    }
    else if(data.TransmissionFluidTemperature>=50 && data.TransmissionFluidTemperature<70 ){
        var temperaturescore = 8
    }
    else if(data.TransmissionFluidTemperature>80 && data.TransmissionFluidTemperature<110 ){
        var temperaturescore = 6
    }
    else{
        var temperaturescore = 3
    }

    // console.log("engine age rating is", enginedaysscore);
    var daysscore = 10 - ((data.BatteryDaysOld * 10) / servicerecommendedindays);
    // console.log("engine miles rating is", enginemilesscore);
    var averagespeed = data.averagespeed;
    var averagespeedscore;
    if (averagespeed >= 60 && averagespeed <= 70) {
        averagespeedscore = 10
    }
    else if (averagespeed >= 30 && averagespeed < 60) {
        averagespeedscore = 8
    }
    else if (averagespeed > 70 && averagespeed < 100) {
        averagespeedscore = 5
    }
    else {
        averagespeedscore = 2
    }

    var totalpartscore = ((temperaturescore + daysscore + averagespeedscore) / 30) * 100;
    if (totalpartscore < 40) {
        updateParam = { BatteryServiceNeeded: true, CarServiceNeeded: true, Serviced: false}
        needUpdate = await updateCarInfoById(updateParam, data._id)
        PartsThatNeedService.push("Battery");
        console.log(data, "TO check array");
    }
    else{
        PartsThatDontNeedService.push("Battery");
    }
}

async function loadserviceneededarray(array, data){
    update ={$addToSet: { PartsThatNeedService: array }}
    needUpdate = await updateCarInfoById(update, data._id)
}

async function loadservicenotneededarray(array, data){
    update ={$addToSet: { PartsThatDontNeedService: array }}
    needUpdate = await updateCarInfoById(update, data._id)
}

async function updateCarInfoById(updateParam, carId) {
    await Car.findByIdAndUpdate({ _id: carId }, updateParam,function (err, data) {
        if (err) {
           // console.log(data)
        }
        else {
            //console.log("update succesful", data);
            return true;
        }
    })
}

async function postServiceUpdateInfo(carId) {
    await Car.findOne({ CarId: carId }, function (err, cardata) {
        if(cardata.CarServiceNeeded){
            update={CarServiceNeeded: false, Serviced: true, MilesBetweenServices: 0, PartsThatNeedService: [], PartsThatDontNeedService: allparts}
            updateCarInfoById(update, cardata._id)
            if(cardata.EngineServiceNeeded){
                update={EngineServiceNeeded: false, DaysSinceEngineLastService: 0}
                updateCarInfoById(update, cardata._id)
            }
            if(cardata.AirFilterServiceNeeded){
                update={AirFilterServiceNeeded: false, AirFilterDaysOld: 0}
                updateCarInfoById(update, cardata._id)
            }
            if(cardata.FuelFilterServiceNeeded){
                update={FuelFilterServiceNeeded: false, FuelFilterDaysOld: 0}
                updateCarInfoById(update, cardata._id)
            }
            if(cardata.BrakeFluidServiceNeeded){
                update={BrakeFluidServiceNeeded: false, BrakeFluidDaysOld: 0, BrakeFluidMilesUsed:0}
                updateCarInfoById(update, cardata._id)
            }
            if(cardata.BrakePadServiceNeeded){
                update={BrakePadServiceNeeded: false, FuelFilterDaysOld: 0}
                updateCarInfoById(update, cardata._id)
            }
            if(cardata.BrakeRotersServiceNeeded){
                update={BrakeRotersServiceNeeded: false, BrakeRotersMilesUsed:0}
                updateCarInfoById(update, cardata._id)
            }
            if(cardata.CoolantServiceNeeded){
                update={CoolantServiceNeeded: false, CoolantDaysOld: 0, CoolantMilesUsed: 0}
                updateCarInfoById(update, cardata._id)
            }
            if(cardata.TransmissionFluidServiceNeeded){
                update={TransmissionFluidServiceNeeded: false, TransmissionFluidDaysOld: 0, TransmissionFluidMilesUsed: 0}
                updateCarInfoById(update, cardata._id)
            }
            if(cardata.GearBoxServiceNeeded){
                update={GearBoxServiceNeeded: false, DaysSinceGearBoxLastService: 0}
                updateCarInfoById(update, cardata._id)
            }
            if(cardata.ClutchPlateServiceNeeded){
                update={ClutchPlateServiceNeeded: false, TransmissionFluidTemperature: 65, TransmissionFluidMilesUsed: 0}
                updateCarInfoById(update, cardata._id)
            }
            if(cardata.HosesServiceNeeded){
                update={HosesServiceNeeded: false, HosesMilesUsed: 0}
                updateCarInfoById(update, cardata._id)
            }
            if(cardata.PowerSteeringServiceNeeded){
                update={PowerSteeringServiceNeeded: false, PowerSteeringFluidMilesUsed: 0}
                updateCarInfoById(update, cardata._id)
            }
            if(cardata.EngineSparkPlugServiceNeeded){
                update={EngineSparkPlugServiceNeeded: false, EngineSparkPlugMilesUsed: 0}
                updateCarInfoById(update, cardata._id)
            }
            if(cardata.TimingBeltServiceNeeded){
                update={TimingBeltServiceNeeded: false, TimingBeltMilesUsed: 0}
                updateCarInfoById(update, cardata._id)
            }
            if(cardata.CabelServiceNeeded){
                update={CabelServiceNeeded: false, CableMilesUsed: 0}
                updateCarInfoById(update, cardata._id)
            }
            if(cardata.BatteryServiceNeeded){
                update={BatteryServiceNeeded: false, BatteryDaysOld: 0, TransmissionFluidTemperature: 65}
                updateCarInfoById(update, cardata._id)
            }

        }
    })
}

app.post("/calculatecarhealth", async (req, res) => {
    identered = req.body.id;
    if(identered != "")
    {
    console.log("identered", identered);
    await Car.findOne({ CarId: identered }, async function (err, cardata) {
        if (err) {
            console.log(err);
        } else {
           console.log(cardata,"after enntering");
            if (cardata != null) {
                if(cardata.Serviced){
                    res.json({ cardata: JSON.stringify({ cardata: cardata }), singleData: cardata, message: "" });
                }
                else{
                    await checkengine(cardata);
                    await checkairfilter(cardata);
                    await checkfuelfilter(cardata);
                    await checkbreakfluid(cardata);
                    await checkbreakpads(cardata);
                    await checkbreakroters(cardata);
                    await checkcoolant(cardata);
                    await checktransmissionfluid(cardata);
                    await checkgearbox(cardata);
                    await checkclutchplate(cardata);
                    await checkhoses(cardata);
                    await checkpowersteeringfluid(cardata);
                    await checkenginesparkplug(cardata);
                    await checktimingbelt(cardata);
                    await checkcable(cardata);
                    await checkbattery(cardata);
                    await loadserviceneededarray(PartsThatNeedService,cardata);
                    await loadservicenotneededarray(PartsThatDontNeedService,cardata);
                    const updateCarData = await Car.findOne({ CarId: identered });
                    console.log(updateCarData, "final")
                    res.json({ cardata: JSON.stringify({ cardata: updateCarData }), singleData: updateCarData, message: "" });
                }
            }
            else {
                console.log("in else");
                res.json({ cardata: null, singleData: null, message: "No Data found for input VIN Number" });
            }

        }
    })
}
})

app.post("/servicecompleted", async (req, res) => {
    identered = req.body.id;
    if(identered != "")
    {
    await Car.findOne({ CarId: identered }, async function (err, cardata) {
        if (err) {
            console.log(err);
        } 
        else {       
            if (cardata != null && cardata.Serviced == false) {
                await postServiceUpdateInfo(cardata.CarId);
                const updateCarData = await Car.findOne({ CarId: identered });
                console.log(updateCarData, "Post service final");
                res.json({ cardata: JSON.stringify({ cardata: updateCarData }), singleData: updateCarData, message: "" });
            }
            else if (cardata.Serviced) {
                res.json({ cardata: null, singleData: null, message: "VIN - "+identered+" is already serviced on "+cardata.LastServiceDate  });
            }
            else {
                res.json({ cardata: null, singleData: null, message: "No Data found for input VIN Number" });
            }

        }
    })
}
else{
    res.render("index", { cardata: null, singleData: null, message: "" });
}
})

app.listen(3001, function(){
    console.log("Server listening at port 3001");
})