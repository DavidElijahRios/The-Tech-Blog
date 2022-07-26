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
      const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json'}
      });

      if (response.ok) {
            document.location.replace('/profile')
      } else {
            console.log(response)
            let answer = await response.json();
            console.log(answer)
            alert(answer.errors[0].message)
      }
   }
}


// Logout function
const logout = async (event) => {
      // call API logout
}


// Giving functionality to submit button
const submitBtn = document.querySelector('#submitBtn');
submitBtn.addEventListener('click', signUpHandler)