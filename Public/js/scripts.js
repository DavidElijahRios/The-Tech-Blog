// ===========================================================================
// ===========================================================================
// script for keeping color constant when user clicks on tab links
const btn = document.querySelector('a');

btn.addEventListener('click', function onClick(e) {
      e.target.style.backgroundColor = 'maroon';
      e.target.style.color = 'tan';
})


const submitBtn = document.querySelector('#submitBtn');

submitBtn.addEventListener('click', function () {
         
})