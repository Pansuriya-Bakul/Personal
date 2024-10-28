(function () {
    "use strict";

    let forms = document.querySelectorAll('.php-email-form');

    forms.forEach(function (e) {
        e.addEventListener('submit', function (event) {
            event.preventDefault();

            let thisForm = this;
            let action = thisForm.getAttribute('action');

            if (!action) {
                displayError(thisForm, 'The form action property is not set!');
                return;
            }

            // Display loading and hide error/success messages
            thisForm.querySelector('.loading').classList.add('d-block');
            thisForm.querySelector('.error-message').classList.remove('d-block');
            thisForm.querySelector('.sent-message').classList.remove('d-block');

            let formData = new FormData(thisForm);

            php_email_form_submit(thisForm, action, formData);
        });
    });

    function php_email_form_submit(thisForm, action, formData) {
        fetch(action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            thisForm.querySelector('.loading').classList.remove('d-block');
            if (data && data.success) {
                thisForm.querySelector('.sent-message').classList.add('d-block');
                thisForm.reset();
            } else {
                displayError(thisForm, data.message || 'An error occurred while sending your message.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            displayError(thisForm, 'An error occurred while sending your message. Please try again later.');
        });
    }

    function displayError(thisForm, message) {
        thisForm.querySelector('.error-message').textContent = message;
        thisForm.querySelector('.error-message').classList.add('d-block');
    }
})();
