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

function calculateenginehealth(){
}

app.get("/car", function(req,res){
    Car.findOne({CarId: 0},function(err, cardata){
        if(err){
            console.log(err);
        }else{
            console.log(cardata.EngineDaysOld)
        }
    })
    
})

app.listen(3000, ()=>{
    console.log("Server listening at port 3000");
})