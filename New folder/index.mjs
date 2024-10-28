import AWS from 'aws-sdk';

const ses = new AWS.SES();

export const handler = async (event) => {
    // Parse the event body for form fields
    const { name, email, subject, message } = JSON.parse(event.body);

    // Set up email parameters
    const params = {
        Destination: { ToAddresses: [process.env.RECEIVER_EMAIL || 'bakulpansuriya2907@gmail.com'] }, // Use env variable or fallback
        Message: {
            Body: {
                Text: { Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` },
            },
            Subject: { Data: subject },
        },
        Source: process.env.SENDER_EMAIL || 'bakulpansuriya2907@gmail.com', // Use env variable or fallback
    };

    try {
        // Send email with SES
        await ses.sendEmail(params).promise();
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  // Or specify your domain
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ message: 'Your message has been sent!' }),
        };
        
    } catch (error) {
        console.error('Error sending email:', error); // Log full error for troubleshooting
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Failed to send message', details: error.message || 'Unknown error' }),
        };
    }
};
