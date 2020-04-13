$(document).ready(function () {
    var cardata = $("#cardataInput").val();
    LoadAllCarData(cardata);
});

function LoadAllCarData(cardata) {
    cardata = JSON.parse(cardata);
    $.each(cardata, function (key, value) {
        $("#carTable").append(htmlBuider(value));
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
    $("#input_VIN").val("");
    $("#searchVIN").submit();
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