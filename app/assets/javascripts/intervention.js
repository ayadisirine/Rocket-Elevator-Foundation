
  //	INTERVENTION FORM 
  if($('#interventions').length) { 
  var _hash = window.location.hash;

  //Hide building, battery, column and elevator sections 
  $(".building-class, .battery-class, .column-class, .elevator-class").hide();

  // Show and hide buildings for customer X
  // second dropdown is disabled while first dropdown is empty
  $("#building").prop("disabled", true); 

  $("#customer").change(function() {
    var customer = $(this).val();
    //check customer value to enabled or not building pop-down 
    if (customer == "") {
      $("#building").prop("disabled", true);
    } else {
      $("#building").prop("disabled", false);
    }
    //call ajax function to get corresponding building to the selected customer 
    $.ajax({
      //call get_building method defined in the controller 
      url: "/interventions/get_building",
      method: "GET",
      dataType: "json",
      //send customer id as parameter 
      data: { customer: customer },
      
      //error: The error function is executed if the server responds with a HTTP error.
      //XHR object will give you all of the information that you need to know about the error that just occurred
      //status: The HTTP status code that the server returned. 
      error: function(xhr, status, error) {
        console.error("AJAX Error: " + status + error);
      },
      //success: The success function is called if the Ajax request is completed successfully.
      success: function(response) {
        console.log(response);
        var buildings = response["buildings"];
        //empty the building, battery, column and elevator pop-down if customer change 
        $("#building").empty();
        $("#battery").empty();
        $("#column").empty();
        $("#elevator").empty();
        //fill them with the default values 
        $("#building").append("<option>Select Building</option>");
        $("#battery").append("<option>Select Battery</option>");
        $("#column").append("<option>-None-</option>");
        $("#elevator").append("<option>-None-</option>");

        //fill the pop-down with corresponding buildings to the selected customer 
        for (var i = 0; i < buildings.length; i++) {
          $("#building").append(
            '<option value="' +
              buildings[i]["id"] +
              '">' +
              buildings[i]["customer_id"] +
              "</option>"
          );
        }
      }
    });
  });

  // Show and hide batteries for building X
  $("#building").change(function() {
    var building = $(this).val();
    if (building == "") {
      $("#battery").prop("disabled", true);
    } else {
      $("#battery").prop("disabled", false);
    }
    $.ajax({
      url: "/interventions/get_battery",
      method: "GET",
      dataType: "json",
      data: { building: building },
      error: function(xhr, status, error) {
        console.error("AJAX Error: " + status + error);
      },
      success: function(response) {
        var batteries = response["batteries"];
        $("#battery").empty();

        $("#battery").append("<option>Select Battery</option>");
        for (var i = 0; i < batteries.length; i++) {
          $("#battery").append(
            '<option value="' +
              batteries[i]["id"] +
              '">' +
              batteries[i]["building_id"] +
              "</option>"
          );
        }
      }
    });
  });

  // Show and hide columns for battery X
  $("#battery").change(function() {
    var battery = $(this).val();
    if (battery == "") {
      $("#column").prop("disabled", true);
    } else {
      $("#column").prop("disabled", false);
    }
    $.ajax({
      url: "/interventions/get_column",
      method: "GET",
      dataType: "json",
      data: { battery: battery },
      error: function(xhr, status, error) {
        console.error("AJAX Error: " + status + error);
      },
      success: function(response) {
        var columns = response["columns"];
        $("#column").empty();

        $("#column").append("<option>-None-</option>");
        for (var i = 0; i < columns.length; i++) {
          $("#column").append(
            '<option value="' +
              columns[i]["id"] +
              '">' +
              columns[i]["battery_id"] +
              "</option>"
          );
        }
      }
    });
  });

  // Show and hide elevators for column X
  $("#column").change(function() {
    var column = $(this).val();
    if (column == "") {
      $("#elevator").prop("disabled", true);
    } else {
      $("#elevator").prop("disabled", false);
    }
    $.ajax({
      url: "/interventions/get_elevator",
      method: "GET",
      dataType: "json",
      data: { column: column },
      error: function(xhr, status, error) {
        console.error("AJAX Error: " + status + error);
      },
      success: function(response) {
        var elevators = response["elevators"];
        $("#elevator").empty();

        $("#elevator").append("<option>-None-</option>");
        for (var i = 0; i < elevators.length; i++) {
          $("#elevator").append(
            '<option value="' +
              elevators[i]["id"] +
              '">' +
              elevators[i]["id"] +
              "</option>"
          );
        }
      }
    });
  });
  // Customer drop down menu
  $(document).ready(function() {
    var choice = document.getElementById("customer");
    choice.addEventListener("change", customer);
    choice.addEventListener("change", clear);
  });

  var customer = function() {
    var choice = document.getElementById("customer").value;
    if (choice != 0) {
      $(".building-class").show();
    }
  };

  // Building drop down menu
  $(document).ready(function() {
    var choice = document.getElementById("building");
    choice.addEventListener("change", building);
    choice.addEventListener("change", clear);
  });

  var building = function() {
    var choice = document.getElementById("building").value;
    if (choice != 0) {
      $(".battery-class").show();
    }
  };

  // Battery drop down menu
  $(document).ready(function() {
    var choice = document.getElementById("battery");
    choice.addEventListener("change", battery);
    choice.addEventListener("change", clear);
  });

  var battery = function() {
    var choice = document.getElementById("battery").value;
    if (choice != 0) {
      $(".column-class").show();
    }
  };

  // Column drop down menu
  $(document).ready(function() {
    var choice = document.getElementById("column");
    choice.addEventListener("change", column);
    choice.addEventListener("change", clear);
  });

  var column = function() {
    var choice = document.getElementById("column").value;
    if (choice != 0) {
      $(".elevator-class").show();
    }
  };

  // Function that reset all inputs 
  var clear = function() {
    $(".form-control-1, .form-control-2, .form-control-3, .form-control-4").each(
      function() {
        $(this).val("");
      }
    );
  };

  jQuery(_hash).show();

  };