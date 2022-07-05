// ===========================================================================
// ===========================================================================
// script for keeping color constant when user clicks on tab links
const btn = document.querySelector('a');

btn.addEventListener('click', function onClick(e) {
      e.target.style.backgroundColor = 'maroon';
      e.target.style.color = 'tan';
})