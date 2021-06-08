
function currentDay() {
  // get current day and display on top of page
  $("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));

  // color our time blocks and start interval to re-color every minute /check ediyor her dakika ve guncelliyor coloru
  colorTimeBlocks();
  setInterval(colorTimeBlocks, 60000);

  // update time blocks with data in local storage
  $(".time-block").each(function() {
    var timeBlockId = $(this).attr("id");
    // load saved data from local storage
    $("#" + timeBlockId + " textarea").text(localStorage.getItem(moment().format("DDDYYYY") + timeBlockId));
  });

  // attach our handler for the save buttons
  $(".saveBtn").on("click", reloadSave);
}

function colorTimeBlocks() {
  // for each time block
  $(".time-block").each(function() {
    // --
    var blockHour = parseInt($(this).attr("id").replace("time-", ""));
    // We define a variable which gets current hour.
    var currentHour = moment().format('H');
    // remove any class we may have added before
    $(this).removeClass("past present future");
    // color block based on past, present, future class
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour > currentHour) {
      $(this).addClass("future");
    } else {
      $(this).addClass("present");
    }
  });
}

function reloadSave(event) {
  // get the id of our parent
  var hourId = $(this).parent().attr("id");
  // save data in textarea in local storage
  localStorage.setItem(moment().format("DDDYYYY") + hourId, $("#" + hourId + " textarea").val());
}
$(currentDay);