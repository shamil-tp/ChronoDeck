const nodemailer = require('nodemailer');

async function sendMail(to) {
    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,     // replace with your Gmail
                pass: process.env.EMAIL_PASS,        // use Gmail App Password
            },
        });

        // Mail options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: "CHRONODECK News Letter Subscription",
            // text: message,
            html: `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Subscription Email</title>
</head>

<body style="margin:0; padding:0; background:#f4f4f4; font-family: Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4; padding:20px 0;">
        <tr>
            <td align="center">

                <!-- Main Email Container -->
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; padding:20px;">
                    
                    <!-- Logo Section -->
                    <tr>
                        <td align="center" style="padding:20px 0;">
                            <!-- PLACE YOUR LOGO HERE -->
                            <img src="cid:logoimg" alt="Logo" width="120" style="display:block;">
                        </td>
                    </tr>

                    <!-- Heading -->
                    <tr>
                        <td align="center" style="padding:10px 30px;">
                            <h2 style="color:#333; margin:0; font-size:24px;">Thank You for Subscribing!</h2>
                        </td>
                    </tr>

                    <!-- Message -->
                    <tr>
                        <td align="center" style="padding:10px 40px; color:#555; font-size:16px; line-height:24px;">
                            You’re now subscribed to our newsletter.  
                            We’ll send you updates, offers, and news directly to your inbox.
                        </td>
                    </tr>

                    <!-- Button -->
                    <tr>
                        <td align="center" style="padding:25px;">
                            <a href="http://localhost:3000/" 
                            style="background:#007bff; color:#ffffff; text-decoration:none; padding:12px 25px; border-radius:5px; font-size:16px;">
                                Visit Our Website
                            </a>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="padding:20px 30px; font-size:13px; color:#888;">
                            If you didn't subscribe or want to unsubscribe,  
                            <a href="#" style="color:#007bff; text-decoration:none;">click here</a>.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
    ` ,// optional HTML version
        attachments: [{
        filename: "mail.png",
        path: "C:/DATATRIBE/Revision/day76/ChronoDeck/static/images/logos/mail.png",     // your local static file
        cid: "logoimg"
    }]
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent:', info.response);
        return info; // return result if needed
    } catch (error) {
        console.error('❌ Error sending email:', error.message);
        throw error; // rethrow so caller can handle it
    }
}

module.exports = sendMail;
