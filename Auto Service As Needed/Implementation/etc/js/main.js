$(document).ready(function () {
    $("#carTable").hide();
    $("#error_message").hide();
});

function searchVIN(){
    var VIN = $("#input_VIN").val();
    if(VIN=="" || typeof parseInt(VIN) !== "number") {
    $("#error_message").html("Input Data format").show(); // passthis to message span div later
    }
    else {
        $("#error_message").html('').hide();
    $.ajax({
        url : "/calculatecarhealth",
        type : "post",
        async: false,
        data: {id: VIN},
        success : function(data) {
            if(data.cardata == null)
                $("#error_message").html(data.message).show();
            else
                LoadAllCarData(data.cardata);

            if(data.singleData != null) PopulateConditions(data.singleData);
        },
        error: function() {
           connectionError();
        }
     });
    }
    
}

function PopulateConditions(singleData) {
    var redcross = '<i class="fa fa-times" style="font-size:20px; color:red; margin-top: 4px;"></i>';
    var col =  '<div class="col-md-3 col-sm-6">';
    var conditionsHtmlBuilder = '<div class="row">';

    if(singleData.CarServiceNeeded) $("#condition_message").html('<h3>Service is recommended for your car for the below parts in the next 15 days</h3><p>Your car needs service for the following parts:</p>');
    
    //console.log(singleData);
    // for( var key in singleData ) {
    //     var value = singleData[key];
    //     console.log(value);
    //   }

    if(singleData.EngineServiceNeeded) 
    conditionsHtmlBuilder += col +'<span>Engine</span>'+redcross+'</div>'; 

    if(singleData.AirFilterServiceNeeded) 
    conditionsHtmlBuilder += col +'<span>Air Filter</span>'+redcross+'</div>';

    if(singleData.FuelFilterServiceNeeded) 
    conditionsHtmlBuilder += col +'<span>Fuel Filter</span>'+redcross+'</div>';

    if(singleData.BrakeFluidServiceNeeded) 
    conditionsHtmlBuilder += col +'<span>Brake Fluid</span>'+redcross+'</div>';

    if(singleData.BrakePadServiceNeeded) 
    conditionsHtmlBuilder += col +'<span>Brake Pad</span>'+redcross+'</div>';

    if(singleData.BrakeRotersServiceNeeded) 
    conditionsHtmlBuilder += col +'<span>Brake Roters</span>'+redcross+'</div>';

    if(singleData.CoolantServiceNeeded) 
    conditionsHtmlBuilder += col +'<span>Coolant</span>'+redcross+'</div>';

    if(singleData.TransmissionFluidServiceNeeded) 
    conditionsHtmlBuilder += col +'<span>TransmissionFluid</span>'+redcross+'</div>';

    if(singleData.GearBoxServiceNeeded) 
    conditionsHtmlBuilder += col +'<span>Gear Box</span>'+redcross+'</div>';
    
    if(singleData.ClutchPlateServiceNeeded) 
    conditionsHtmlBuilder += col +'<span>Clutch Plate</span>'+redcross+'</div>';

    if(singleData.HosesServiceNeeded) 
    conditionsHtmlBuilder += col +'<span>Hoses</span>'+redcross+'</div>';

    if(singleData.PowerSteeringServiceNeeded) 
    conditionsHtmlBuilder += col +'<span>Power Steering</span>'+redcross+'</div>';

    if(singleData.TimingBeltServiceNeeded) 
    conditionsHtmlBuilder += col +'<span>Timing Belt</span>'+redcross+'</div>';

    if(singleData.CabelServiceNeeded) 
    conditionsHtmlBuilder += col +'<span>Cabel</span>'+redcross+'</div>';

    if(singleData.BatteryServiceNeeded) 
    conditionsHtmlBuilder += col +'<span>Battery</span>'+redcross+'</div>';

    conditionsHtmlBuilder+='</div></div>';
    $("#condition_cases").html(conditionsHtmlBuilder);
}

function LoadAllCarData(cardata) {
    cardata = JSON.parse(cardata);
    $("#carTable").show();
    $("#carTbody").html("");
    $.each(cardata, function (key, value) {
        $("#carTbody").append(htmlBuider(value));
    });
}

function htmlBuider(value) {
    var tableHtml = '<tr>';
    tableHtml += '<td>' + value.CarId + '</td>';
    tableHtml += '<td>' + value.MilesTraveled + '</td>';
    tableHtml += '<td>' + value.AverageSpeed + '</td>';
    tableHtml += '<td>' + value.LastServiceDate + '</td>';
    tableHtml += '<td>' + value.MilesDuringLastService + '</td>';
    tableHtml += '<td>' + value.MilesBetweenServices + '</td>';
    tableHtml += '<td>' + value.EngineId + '</td>';
    tableHtml += '<td>' + value.EngineManufactureDate + '</td>';
    tableHtml += '<td>' + value.EngineLifeSpaninYears + '</td>';
    tableHtml += '<td>' + value.EngineLifeSpaninPercentage + '</td>';
    tableHtml += '<td>' + value.DaysSinceEngineLastService + '</td>';
    tableHtml += '<td>' + value.EngineDaysOld + '</td>';
    tableHtml += '<td>' + value.AirFilterDaysOld + '</td>';
    tableHtml += '<td>' + value.FuelFilterDaysOld + '</td>';
    tableHtml += '<td>' + value.BrakeFluidDaysOld + '</td>';
    tableHtml += '<td>' + value.CoolantDaysOld + '</td>';
    tableHtml += '<td>' + value.DaysSinceGearBoxLastService + '</td>';
    tableHtml += '<td>' + value.BatteryDaysOld + '</td>';
    tableHtml += '<td>' + value.TransmissionFluidDaysOld + '</td>';
    tableHtml += '<td>' + value.TransmissionFluidTemperature + '</td>';
    tableHtml += '<td>' + value.BatteryTemperature + '</td>';
    tableHtml += '<td>' + value.EngineSparkPlugType + '</td>';
    tableHtml += '<td>' + value.CableMilesUsed + '</td>';
    tableHtml += '<td>' + value.TimingBeltMilesUsed + '</td>';
    tableHtml += '<td>' + value.EngineSparkPlugMilesUsed + '</td>';
    tableHtml += '<td>' + value.PowerSteeringFluidMilesUsed + '</td>';
    tableHtml += '<td>' + value.HosesMilesUsed + '</td>';
    tableHtml += '<td>' + value.ClutchPlateMilesUsed + '</td>';
    tableHtml += '<td>' + value.TransmissionFluidMilesUsed + '</td>';
    tableHtml += '<td>' + value.CoolantMilesUsed + '</td>';
    tableHtml += '<td>' + value.BrakeRotersMilesUsed + '</td>';
    tableHtml += '<td>' + value.BrakeFluidMilesUsed + '</td>';
    tableHtml += '<td>' + value.EngineServiceNeeded + '</td>';
    tableHtml += '<td>' + value.AirFilterServiceNeeded + '</td>';
    tableHtml += '<td>' + value.FuelFilterServiceNeeded + '</td>';
    tableHtml += '<td>' + value.BrakeFluidServiceNeeded + '</td>';
    tableHtml += '<td>' + value.BrakePadServiceNeeded + '</td>';
    tableHtml += '<td>' + value.BrakeRotersServiceNeeded + '</td>';
    tableHtml += '<td>' + value.CoolantServiceNeeded + '</td>';
    tableHtml += '<td>' + value.TransmissionFluidServiceNeeded + '</td>';
    tableHtml += '<td>' + value.GearBoxServiceNeeded + '</td>';
    tableHtml += '<td>' + value.ClutchPlateServiceNeeded + '</td>';
    tableHtml += '<td>' + value.HosesServiceNeeded + '</td>';
    tableHtml += '<td>' + value.PowerSteeringServiceNeeded + '</td>';
    tableHtml += '<td>' + value.EngineSparkPlugServiceNeeded + '</td>';
    tableHtml += '<td>' + value.TimingBeltServiceNeeded + '</td>';
    tableHtml += '<td>' + value.CabelServiceNeeded + '</td>';
    tableHtml += '<td>' + value.BatteryServiceNeeded + '</td>';
    tableHtml += '<td>' + value.CarServiceNeeded + '</td>';
    tableHtml += '<td>' + value.Serviced + '</td>';
    tableHtml += '</tr>';
    return tableHtml;
}

function ClearForm() {
    $("#carTable").hide();
    $("#input_VIN").val("");
    $("#carTable").hide();
    $("#carCondition").hide();
    $("#error_message").hide();
}

function openPage(pageName, elmnt, color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();