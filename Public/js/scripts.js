// ===========================================================================
// ===========================================================================
// script for keeping color constant when user clicks on tab links
const btn = document.querySelector('a');

btn.addEventListener('click', function onClick(e) {
      e.target.style.backgroundColor = 'maroon';
      e.target.style.color = 'tan';
})



const signUpHandler = async (event) => {
      event.preventDefault();

      // Need to collect Values from the form
   const name = document.querySelector('#name-signup').value.trim();
   const email = document.querySelector('#email-signup').value.trim();
   const password = document.querySelector('#password-signup').value.trim();

   if (name && email && password) {
      const response = await fetch('api/users', {
            method: 'POST',
            // TODO: Where is this coming from? the Models?
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json'}
      });

      if (response.ok) {
            // TODO: does this mean to show or render this handlebar?
            document.location.replace('./profile')
      } else {
            // TODO: what does this do? or mean?
            alert(response.statusText)
      }
   }
}




// Giving functionality to submit button
const submitBtn = document.querySelector('#submitBtn');
submitBtn.addEventListener('click', )