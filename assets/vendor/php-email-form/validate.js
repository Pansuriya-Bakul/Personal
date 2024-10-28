(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
      form.addEventListener('submit', function (event) {
          event.preventDefault(); // Prevent default form submission

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

          // Display loading and hide error/success messages
          form.querySelector('.loading').classList.add('d-block');
          form.querySelector('.error-message').classList.remove('d-block');
          form.querySelector('.sent-message').classList.remove('d-block');

          // Create JSON object from form data
          const jsonData = {
              name: name.value,
              email: email.value,
              subject: subject.value,
              message: message.value
          };

          // Submit the form
          submitForm(form, action, jsonData);
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

  function submitForm(form, action, jsonData) {
      fetch(action, {
          method: 'POST',
          body: JSON.stringify(jsonData), // Send JSON data
          headers: {
              'Content-Type': 'application/json', // Set content type to JSON
              'Accept': 'application/json' // Specify the expected response format
          }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok: ' + response.statusText);
          }
          return response.json();
      })
      .then(data => {
          form.querySelector('.loading').classList.remove('d-block');
          if (data.error) {
              displayError(form, data.details || 'An error occurred while sending your message.');
          } else {
              displaySuccessMessage(form, 'Your message has been sent successfully!');
              form.reset(); // Reset the form after success
          }
      })
      .catch(error => {
          console.error('Error:', error);
          displayError(form, 'There was a problem sending your message. Please try again later.');
      });
  }

  function displaySuccessMessage(form, message) {
      let successMessage = form.querySelector('.sent-message');
      successMessage.innerHTML = message;
      successMessage.classList.add('d-block');
      setTimeout(() => {
          successMessage.innerHTML = ''; // Clear the message after a few seconds
          successMessage.classList.remove('d-block');
      }, 5000);
  }
})();
