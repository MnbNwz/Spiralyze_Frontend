// Initialize tooltips with 'bottom' placement
$('.form-control').tooltip({
  trigger: 'manual',
  placement: 'bottom' // Keep the tooltip placement at 'bottom'
});

// Function to show the first empty field's tooltip
function showFirstEmptyTooltip() {
  let found = false;
  $('#contactForm .form-control').each(function () {
    if (!$(this).val()) {
      $(this).tooltip('show'); // Show tooltip for the first empty field
      found = true;
      // Hide tooltips for all other fields
      $('#contactForm .form-control').not(this).tooltip('hide');
      return false; // Stop at the first invalid field
    } else {
      $(this).tooltip('hide'); // Hide tooltip if field is not empty
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
  $('.form-control').tooltip('hide'); // Hide all tooltips initially
  if (showFirstEmptyTooltip()) {
    e.preventDefault(); // Prevent form submission if any field is empty
  }
});

// Hide tooltip on focus and recheck on blur (unfocus)
$('.form-control')
  .on('focus', function () {
    $(this).tooltip('hide'); // Hide tooltip when the user focuses on the field
  })
  .on('blur', function () {
    // Show tooltip if the field is empty after unfocusing
    if (!$(this).val()) {
      $(this).tooltip('show'); // Show tooltip again if the field is still empty
    } else {
      $(this).tooltip('hide'); // Hide tooltip if the field is filled
    }

    // Check for the first empty field
    showFirstEmptyTooltip(); // This ensures that the next empty field's tooltip shows
  });
