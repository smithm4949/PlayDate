const loginFormHandler = async (event) => {
    event.preventDefault();

    // Obtain value from the login form
    const email = document.querySelector('#email-login').value.trim(); // TO DO - get id used in handlebar for this one
    const password = document.querySelector('#password-login').value.trim(); // TO DO - get id used in handlebar for this one

    if (email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', { // TO DO - get the name of the route used for logging in
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: { 'Content-Type': 'application/json' },
        });
    }

}

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);