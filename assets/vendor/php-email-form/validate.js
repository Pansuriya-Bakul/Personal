(function () {
  "use strict";

  // Select all forms with the class 'php-email-form'
  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission

      let action = form.getAttribute('action');

      // Validate the form inputs
      let name = form.querySelector('input[name="name"]');
      let email = form.querySelector('input[name="email"]');
      let subject = form.querySelector('input[name="subject"]');
      let message = form.querySelector('textarea[name="message"]');

      // Clear previous error messages
      clearErrorMessages(form);

      // Check if all fields are filled
      if (!name.value || !email.value || !subject.value || !message.value) {
        displayError(form, 'All fields are required!');
        return;
      }

      // Check if email is valid
      if (!validateEmail(email.value)) {
        displayError(form, 'Please enter a valid email address!');
        return;
      }

      // Proceed with form submission if validation passes
      let formData = new FormData(form);
      submitForm(form, action, formData);
    });
  });

  function displayError(form, message) {
    let errorMessage = form.querySelector('.error-message');
    errorMessage.innerHTML = message;
    errorMessage.classList.add('d-block');
  }

  function clearErrorMessages(form) {
    let errorMessage = form.querySelector('.error-message');
    errorMessage.innerHTML = '';
    errorMessage.classList.remove('d-block');
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return re.test(String(email).toLowerCase());
  }

  function submitForm(form, action, formData) {
    // Send the form data to the specified action URL using the Fetch API
    fetch(action, {
      method: 'POST', // Specify the HTTP method
      body: formData, // The form data to send
      headers: {
        'Accept': 'application/json' // Specify the expected response format
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        console.log('Success:', data);
        // Optionally, display a success message to the user
        // Example: displaySuccessMessage(form, 'Your message has been sent successfully!');
      })
      .catch(error => {
        console.error('Error:', error);
        // Optionally, display an error message to the user
        displayError(form, 'There was a problem sending your message. Please try again later.');
      });
  }

  // Optionally, create a function to display success messages
  function displaySuccessMessage(form, message) {
    let successMessage = form.querySelector('.success-message');
    successMessage.innerHTML = message;
    successMessage.classList.add('d-block');
    setTimeout(() => {
      successMessage.innerHTML = ''; // Clear the message after a few seconds
      successMessage.classList.remove('d-block');
    }, 5000);
  }

})();
