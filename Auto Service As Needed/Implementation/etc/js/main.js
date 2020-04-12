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
    tableHtml += '<td>' + value.CarLifeSpaninYears + '</td>';
    tableHtml += '<td>' + value.LastServiceDate + '</td>';
    tableHtml += '<td>' + value.MilesDuringLastService + '</td>';
    tableHtml += '<td>' + value.MilesBetweenServices + '</td>';
    tableHtml += '<td>' + value.EngineId + '</td>';
    tableHtml += '<td>' + value.EngineManufactureDate + '</td>';
    tableHtml += '<td>' + value.EngineLifeSpaninYears + '</td>';
    tableHtml += '<td>' + value.EngineLifeSpaninPercentage + '</td>';
    tableHtml += '<td>' + value.EngineDaysOld + '</td>';
    tableHtml += '<td>' + value.DaysSinceEngineLastService + '</td>';
    tableHtml += '<td>' + value.EngineServiceNeeded + '</td>';
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