// function to Get Current Date 
function currentDay() {
  $("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));

  //Colors Time Blocks and Checks Every Minute to re-color when necessary
  colorTimeBlocks();
  setInterval(colorTimeBlocks, 60000);

  //Updates time-blocks with the Tocal Storage
  $(".time-block").each(function() {
    var timeBlockId = $(this).attr("id");
    // load saved data from local storage
    $("#" + timeBlockId + " textarea").text(localStorage.getItem(moment().format("DDDYYYY") + timeBlockId));
  });

  // Event listener for Save Button
  $(".saveBtn").on("click", reloadSave);
}

  /*Function for timeblocks - Gets the Current Hour, removes classes and colors past, present,future blocks .*/
function colorTimeBlocks() {
  $(".time-block").each(function() {
    var blockHour = parseInt($(this).attr("id").replace("time-", ""));
    var currentHour = moment().format('H');
    $(this).removeClass("past present future");
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour > currentHour) {
      $(this).addClass("future");
    } else {
      $(this).addClass("present");
    }
  });
}

/*Gets the id of the Parent Element and Saves the Textarea Data to Local Storage*/
function reloadSave(event) {
  // get the id of our parent
  var hourId = $(this).parent().attr("id");
  // save data in textarea in local storage
  localStorage.setItem(moment().format("DDDYYYY") + hourId, $("#" + hourId + " textarea").val());
}
$(currentDay);