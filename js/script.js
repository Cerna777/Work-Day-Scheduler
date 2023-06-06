$(function () {
  // Wrap all code that interacts with the DOM in this function

  // Add a listener for click events on the save button
  $('.saveBtn').on('click', function () {
    // Get the id of the parent time-block
    var timeBlockId = $(this).closest('.time-block').attr('id');

    // Get the user input from the textarea
    var userInput = $(this).siblings('textarea').val();

    // Save the user input in local storage using the time-block id as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply the past, present, or future class to each time block
  $('.time-block').each(function () {
    var currentHour = dayjs().hour(); // Get the current hour in 24-hour format
    var timeBlockHour = parseInt($(this).attr('id').split('-')[1]);

    if (timeBlockHour < currentHour) {
      $(this).addClass('past');
    } else if (timeBlockHour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });

  // Get the user input from local storage and set the textarea values
  $('.time-block').each(function () {
    var timeBlockId = $(this).attr('id');
    var userInput = localStorage.getItem(timeBlockId);

    if (userInput) {
      $(this).find('textarea').val(userInput);
    }
  });

  // Display the current date in the header of the page
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
});