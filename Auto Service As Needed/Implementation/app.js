var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var Car = require("./models/cardb");
var seed =  require("./seeds")
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/carapp", { useNewUrlParser: true });

seed();

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", (req,res)=>{
    res.send("This is the home page.");
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