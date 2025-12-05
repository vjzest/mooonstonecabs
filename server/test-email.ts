// Email Diagnostic Test
// Run: npm run build && node dist/test-email.js

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'noreply@moonstonecabs.com',
    pass: process.env.EMAIL_PASS || '',
  },
});

console.log('📧 Email Diagnostic Tool');
console.log('========================');
console.log('');
console.log('Configuration:');
console.log(`  Host: ${process.env.EMAIL_HOST || 'smtp.gmail.com'}`);
console.log(`  Port: ${process.env.EMAIL_PORT || 587}`);
console.log(`  User: ${process.env.EMAIL_USER || 'noreply@moonstonecabs.com'}`);
console.log(`  Pass: ${process.env.EMAIL_PASS ? '****' + process.env.EMAIL_PASS.slice(-4) : '(empty)'}`);
console.log('');

async function testEmailConnection() {
  try {
    console.log('🔌 Testing SMTP connection...');
    const verified = await transporter.verify();
    
    if (verified) {
      console.log('✅ SMTP connection successful!');
      
      // Try sending a test email
      console.log('');
      console.log('📨 Sending test email...');
      const testEmail = process.env.TEST_EMAIL || process.env.EMAIL_USER;
      
      const result = await transporter.sendMail({
        from: `"Moonstone Cabs" <${process.env.EMAIL_USER || 'noreply@moonstonecabs.com'}>`,
        to: testEmail,
        subject: 'Moonstone Cabs - Email Test',
        html: '<p>This is a test email from Moonstone Cabs booking system.</p><p>If you received this, the email configuration is working correctly.</p>',
      });
      
      console.log('✅ Test email sent successfully!');
      console.log(`   Message ID: ${result.messageId}`);
    } else {
      console.log('❌ SMTP connection failed!');
      console.log('   Check your email credentials and firewall settings.');
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    console.log('');
    console.log('Common issues:');
    console.log('  1. Wrong password (use App Password if 2FA enabled)');
    console.log('  2. Gmail account needs "Less secure apps" enabled');
    console.log('  3. Firewall blocking SMTP port 587');
    console.log('  4. Email credentials not set in .env');
  }
}

testEmailConnection();
