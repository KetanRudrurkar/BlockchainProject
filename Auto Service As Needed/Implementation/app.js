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

app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("index", { cardata: null , singleData : false, message: "" });
})

async function checkengine(id) {
    var servicerecommendedindays = 180;
    var servicerecommendedinmiles = 7500;
    var enginedaysscore = 10 - ((id.DaysSinceEngineLastService * 10) / servicerecommendedindays);
    console.log("engine age rating is", enginedaysscore);
    var enginemilesscore = 10 - ((id.MilesBetweenServices * 10) / servicerecommendedinmiles);
    console.log("engine miles rating is", enginemilesscore);
    var averagespeed = id.averagespeed;
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

    var totalenginescore = ((enginedaysscore + enginemilesscore + averagespeedscore) / 30) * 100;
    console.log("The total engine score evaluated is", totalenginescore);
    if (totalenginescore < 40) {
        //debugger;
        updateParam = { EngineServiceNeeded: true, Serviced: false }
        needUpdate = await updateCarInfoById(updateParam, id._id)
        if (needUpdate)
            console.log("Your Engine requires Service within the next 15 days");
    }
    else if (totalenginescore >= 40 && totalenginescore <= 70) {
        console.log("The car health is good currently but you might need a service in the coming 3 months")
    }
    else if (totalenginescore < 0) {
        console.log("The Engine needs service immediately");
    }

    else {
        console.log("Your engine does not require service in the next 6 months")
    }

    console.log("This is from the check engine id function.")

}

async function updateCarInfoById(updateParam, carId) {
    await Car.findByIdAndUpdate({ _id: carId }, updateParam, function (err, data) {
        if (err) {
            console.log(data)
        }
        else {
            console.log("update succesful", data);
            return true;
        }
    })
}

async function checkcarhealth(data) {
    console.log("entered car health function");
    console.log("this is data from car functin", data);
    if (data.EngineServiceNeeded == true) {
        update = { CarServiceNeeded: true, Serviced: false }
        await updateCarInfoById(update, data._id);
        console.log("this is from the car health function")
    }
    else {
        console.log("In car health else")
    }
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
            console.log(cardata);
            if (cardata != null) {
                if(cardata.Serviced){
                    res.render("index", {cardata: JSON.stringify({ cardata: cardata }),singleData: cardata, message: ""} );
                }
                else{
                    await checkengine(cardata);
                    const updateCarData = await Car.findOne({ CarId: identered });
                    console.log(updateCarData);
                    await checkcarhealth(updateCarData);
                    const finalData = await Car.findOne({ CarId: identered });
                    res.render("index", { cardata: JSON.stringify({ cardata: finalData }), singleData: finalData, message: "" });
                }
            }
            else {
                console.log("in else");
                res.render("index", { cardata: null, singleData: null, message: "No Data found for input VIN Number" });
            }

        }
    })
}
})

app.post("/servicecompleted", async (req, res) => {
    identered = req.body.id;
    if(identered != "")
    {
    console.log("identered", identered);
    await Car.findOne({ CarId: identered }, async function (err, cardata) {
        if (err) {
            console.log(err);
        } 
        else {
            console.log(cardata);
            if (cardata != null && cardata.Serviced == false) {
                update = {EngineServiceNeeded: false, CarServiceNeeded: false, Serviced: true}
                await updateCarInfoById(update, cardata._id);
                const updateCarData = await Car.findOne({ CarId: identered });
                console.log("service data shoyld be", updateCarData);
                res.render("serviceneeded", { cardata: null,singleData: updateCarData, message: "" });
            }
            else {
                console.log("in else");
                res.render("serviceneeded   ", { singleData: null,cardata: null, message: "No Data found for input VIN Number" });
            }

        }
    })
}
else{
    res.render("index", { cardata: null, singleData: null, message: "" });
}
})

app.listen(3000, function(){
    console.log("Server listening at port 3000");
})