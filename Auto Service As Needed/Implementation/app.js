var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var Car = require("./models/cardb");
var seed =  require("./seeds")
var path = require("path");
app.use(express.static(__dirname + "/etc")); // using CSS and images from public directory
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/carapp", { useNewUrlParser: true });

seed();

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req,res)=>{
  
    Car.find(function(err, cardata){
        if(err){
            console.log(err);
        }else{
            data = JSON.stringify(cardata);

            res.render("index", {cardata:data});
        }
    })
})

function checkengine(id){
    var servicerecommendedindays = 180;
    var servicerecommendedinmiles = 7500;
    var enginedaysscore = 10 - ((id.DaysSinceEngineLastService*10)/servicerecommendedindays);
    console.log("engine age rating is", enginedaysscore);
    var enginemilesscore = 10 - ((id.MilesBetweenServices*10)/servicerecommendedinmiles);
    console.log("engine miles rating is", enginemilesscore);
    var averagespeed = id.averagespeed;
    var averagespeedscore;
    if(averagespeed>=60 && averagespeed<=70){
        averagespeedscore = 10
    }
    else if(averagespeed>=30 && averagespeed<60){
        averagespeedscore = 8
    }
    else if(averagespeed>70 && averagespeed<100){
        averagespeedscore= 5
    }
    else{
        averagespeedscore = 2
    }

    var totalenginescore = ((enginedaysscore + enginemilesscore + averagespeedscore)/30)*100;
    console.log("The total engine score evaluated is", totalenginescore);
    if (totalenginescore<40){
        //debugger;
        updateParam = {EngineServiceNeeded: true}
        if(updateCarInfoById(updateParam, id._id)) 
        console.log("Your Engine requires Service within the next 15 days");
    }
   else if(totalenginescore>=40 && totalenginescore<=70){
        console.log("The car health is good currently but you might need a service in the coming 3 months")
    }
    else if(totalenginescore<0){
        console.log("The Engine needs service immediately");
    }

    else{
        console.log("Your engine does not require service in the next 6 months")
    }

    console.log("This is from the check engine id function.")

}

function updateCarInfoById(updateParam,carId){
        Car.findByIdAndUpdate({_id: carId}, updateParam, function(err,data){
            if(err){
                console.log(data)
            }
            else{
                console.log("update succesful", data);
                return true;
            }
        })
}

function checkcarhealth(data){
    console.log("entered car health function");
    console.log("this is data from car functin", data);
    if(data.EngineServiceNeeded == true){
        update ={CarServiceNeeded: true}
        updateCarInfoById(update, data._id);
        console.log("this is from the car health function")
    }
}

app.post("/calculatecarhealth", (req,res)=>{
    identered = req.body.id; 
    console.log("identered", identered);
    Car.findOne({CarId: identered},async function(err, cardata){
        if(err){
            console.log(err);
        }else{
            console.log(cardata);
            if(cardata!=null){
                await checkengine(cardata);
                await checkcarhealth(cardata);
                res.redirect("/");
            }
            else
            {
                console.log("in else");
                res.redirect("/");
            }
        }
    })

})

app.get("/car", function(req,res){
    Car.findOne({CarId: 0},function(err, cardata){
        if(err){
            console.log(err);
        }else{
            console.log(cardata.EngineServiceNeeded, cardata.CarServiceNeeded);
        }
    })
    
})

app.listen(3000, ()=>{
    console.log("Server listening at port 3000");
})