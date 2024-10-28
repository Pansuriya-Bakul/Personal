// Select the form element
const form = document.querySelector(".php-email-form");
const loadingElement = document.querySelector(".loading");
const errorMessageElement = document.querySelector(".error-message");
const sentMessageElement = document.querySelector(".sent-message");

// Add an event listener for form submission
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Show the loading message and hide any previous messages
    loadingElement.style.display = "block";
    errorMessageElement.style.display = "none";
    sentMessageElement.style.display = "none";

    // Collect form data
    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;

    // API Gateway endpoint URL
    const apiUrl = "https://72x08dctrd.execute-api.us-east-2.amazonaws.com/prod/ContactInformation/"; // Replace with your actual endpoint

    // Set up the request payload
    const payload = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    try {
        // Send POST request to API Gateway
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        // Check if the request was successful
        if (response.ok) {
            // Show the success message, hide the loading spinner, and reset the form
            loadingElement.style.display = "none";
            sentMessageElement.style.display = "block";
            form.reset(); // Clear the form
        } else {
            throw new Error("Failed to send message. Please try again later.");
        }
    } catch (error) {
        // Show the error message and hide the loading spinner
        loadingElement.style.display = "none";
        errorMessageElement.style.display = "block";
        errorMessageElement.textContent = error.message;
    }
});
