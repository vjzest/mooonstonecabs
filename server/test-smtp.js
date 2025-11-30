require('dotenv').config({ path: './.env' });
const nodemailer = require('nodemailer');

(async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log('Using SMTP host:', process.env.EMAIL_HOST, 'port:', process.env.EMAIL_PORT);

    // Verify connection/auth
    await transporter.verify();
    console.log('\nSMTP verify: OK — server accepted the credentials and is reachable (transport verified).');

    const to = process.argv[2] || process.env.EMAIL_USER;

    console.log('Attempting to send a test email to', to);

    const info = await transporter.sendMail({
      from: `"Moonstone Cabs (test)" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Moonstone Cabs — SMTP test message',
      text: 'This is a test email from the local SMTP test script. If you do not receive it, please check spam/junk and make sure your provider permits email delivery.',
      html: `<p>This is a test email from the <strong>Moonstone Cabs</strong> SMTP test script.</p><p>If you don\'t receive this email, check spam or provider restrictions.</p>`,
    });

    console.log('\nsendMail returned:');
    console.log(info);
    console.log('\nIf `accepted` contains the recipient and there is no `rejected`/`error` field, your SMTP provider accepted the message for delivery — next step is to check the destination inbox (or spam).');
  } catch (err) {
    console.error('\nSMTP test failed with error:');
    console.error(err);
    process.exit(1);
  }
})();
