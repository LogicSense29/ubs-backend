const {createMailTransporter} = require("./createMailTransporter");

const welcomeEmail = (user, full_name)=>{
// Create a nodemailer transporter using your email service configuration
const transporter = createMailTransporter();

// Define the HTML content with inline styles
const styledDivContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      /* Inline CSS for styling */
      .styled-div {
        background-color: #890709;
        padding: 20px;
        border-radius: 5px;
        font-family: Arial, sans-serif;
        color: #333;
      }
    </style>
  </head>
  <body>
  
    <!-- Styled div in the email body -->
    <div class="styled-div">
      <h2>Welcome to your Personality Test</h2>
      <p>Thank you, ${full_name} for signing up. Customize the styles as needed.</p>
      <img src="cid:unique@umerabusinesschool@outlook.com" width:"200">
    </div>
  
  </body>
  </html>
`;

// Define the email options
const mailOptions = {
  from: "UBS Personality Test <umerabusinesschool@outlook.com>",
  to: user,
  subject: 'THANK YOU FOR SIGNING UP',
  html: styledDivContent, // Use the HTML content with inline styles
  attachments: [
    {
        filename:"ubslogo",
        path:"./ubslogo.png",
        cid:"unique@umerabusinesschool@outlook.com"
    }
  ] 
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});

}

module.exports ={welcomeEmail}
