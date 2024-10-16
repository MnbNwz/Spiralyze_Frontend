// Function to show the first empty field's tooltip
function showFirstEmptyTooltip() {
  let found = false;
  $('#contactForm .form-control').each(function () {
    if (!$(this).val()) {
      const message = $(this).data('original-title'); // Get tooltip message from data attribute
      const tooltip = $(this).siblings('.tooltip');
      tooltip.text(message).addClass('show'); // Set the message and show tooltip
      found = true;

      // Hide tooltips for all other fields
      $('#contactForm .form-control')
        .not(this)
        .siblings('.tooltip')
        .removeClass('show');
      return false; // Stop at the first invalid field
    } else {
      $(this).siblings('.tooltip').removeClass('show'); // Hide tooltip if field is not empty
    }
  });
  return found;
}

// Show tooltips on page load
$(document).ready(function () {
  showFirstEmptyTooltip();
});

// Recheck fields and show tooltip on form submit attempt
$('#contactForm').on('submit', function (e) {
  $('.tooltip').removeClass('show'); // Hide all tooltips initially
  if (showFirstEmptyTooltip()) {
    e.preventDefault(); // Prevent form submission if any field is empty
  }
});

// Hide tooltip on focus and recheck on blur (unfocus)
$('.form-control')
  .on('focus', function () {
    $(this).siblings('.tooltip').removeClass('show'); // Hide tooltip when focusing
  })
  .on('blur', function () {
    // Show tooltip if the field is empty after unfocusing
    if (!$(this).val()) {
      const message = $(this).data('original-title'); // Get tooltip message from data attribute
      $(this).siblings('.tooltip').text(message).addClass('show'); // Show tooltip if the field is still empty
    } else {
      $(this).siblings('.tooltip').removeClass('show'); // Hide tooltip if the field is filled
    }

    // Check for the first empty field
    showFirstEmptyTooltip(); // Show the next empty field's tooltip if needed
  });
