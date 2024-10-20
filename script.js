// Function to show the first empty field's tooltip
function showFirstEmptyTooltip() {
  let found = false;
  $('#contactForm .form-control').each(function () {
    if (!$(this).val()) {
      const message = $(this).data('original-title'); // Get tooltip message from data attribute
      const tooltip = $(this).siblings('.tooltip');

      tooltip.text(message).addClass('show'); // Set the message and show tooltip
      $(this).addClass('tooltip-active'); // Add class to the current input

      found = true;

      // Hide tooltips and remove class from all other fields
      $('#contactForm .form-control')
        .not(this)
        .removeClass('tooltip-active') // Remove class from other inputs
        .siblings('.tooltip')
        .removeClass('show');

      return false; // Stop at the first invalid field
    } else {
      $(this).removeClass('tooltip-active'); // Ensure no leftover class
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
  $('.form-control').removeClass('tooltip-active'); // Remove active class from all inputs
  if (showFirstEmptyTooltip()) {
    e.preventDefault(); // Prevent form submission if any field is empty
  }
});

// Hide tooltip on focus and recheck on blur (unfocus)
$('.form-control')
  .on('focus', function () {
    $(this).siblings('.tooltip').removeClass('show'); // Hide tooltip when focusing
    $(this).removeClass('tooltip-active'); // Remove active class
  })
  .on('blur', function () {
    // Show tooltip if the field is empty after unfocusing
    if (!$(this).val()) {
      const message = $(this).data('original-title'); // Get tooltip message from data attribute
      $(this).siblings('.tooltip').text(message).addClass('show'); // Show tooltip if the field is still empty
      $(this).addClass('tooltip-active'); // Add active class
    } else {
      $(this).siblings('.tooltip').removeClass('show'); // Hide tooltip if the field is filled
      $(this).removeClass('tooltip-active'); // Ensure no leftover class
    }

    // Check for the first empty field
    showFirstEmptyTooltip(); // Show the next empty field's tooltip if needed
  });




// Function to calculate adjusted distance from the right edge of <p> to its container
function calculateAdjustedDistanceToRight(pElement) {
  // Get the bounding rectangle of the <p> element
  const pRect = pElement.getBoundingClientRect();
  
  // Get the bounding rectangle of the container (parent element)
  const containerRect = pElement.parentElement.getBoundingClientRect();

  // Calculate 10% of the screen width
  const tenPercentScreenWidth = window.innerWidth * 0.1;

  // Calculate the distance
  const distanceToRight = containerRect.right - tenPercentScreenWidth - pRect.right;

  // Return the distance
  return distanceToRight;
}

// // Function to update the margin-right of .smallHeader based on the distance calculated
// function updateSmallHeaderMargin() {
//   const paragraphElement = document.querySelector('.contact_p'); // Replace with your selector
//   const adjustedDistanceRight = calculateAdjustedDistanceToRight(paragraphElement);
  
//   // Select the .smallHeader element
//   const smallHeaderElement = document.querySelector('.smallHeader'); // Replace with your selector

//   // Set the margin-right of the smallHeader to the negative of the calculated distance
//   smallHeaderElement.style.paddingRight = `${-adjustedDistanceRight}px`;

//   console.log(`Updated margin-right for .smallHeader: ${-adjustedDistanceRight}px`);
// }

// // Call the function to update the margin on page load or on resize
// updateSmallHeaderMargin();

// // Optionally, you can add an event listener to recalculate on window resize
// window.addEventListener('resize', updateSmallHeaderMargin);
