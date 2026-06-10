const nodemailer = require('nodemailer');
require("dotenv").config();
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = process.env.EMAIL_FROM;
  }

  // Create transporter based on environment
  createTransporter() {
    // Use Mailtrap for development
    return nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST || 'sandbox.smtp.mailtrap.io',
      port: process.env.MAILTRAP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  // Define the email options
  async send(subject, message, html = null, includeUrl = false) {
  const mailOptions = {
    from: this.from,
    to: this.to,
    subject,
    text: includeUrl ? `${message}\nLink: ${this.url}` : message,
    html: html || `<p>${message}</p>`,
  };

  try {
    const transporter = this.createTransporter();

    // PROMISE VERSION (NO CALLBACK, NO MANUAL TIMEOUT)
    const info = await transporter.sendMail(mailOptions);

    if (process.env.NODE_ENV !== 'production') {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }

    console.log('Email sent successfully to:', this.to);

  } catch (error) {
    console.error('Email send failed:', error.message);
    throw error; 
  }
}

  async sendWelcome() {
    await this.send(
      'Welcome to our App!',
      `Welcome ${this.firstName}! We're excited to have you on board.`,
      `<h1>Welcome ${this.firstName}!</h1><p>We're excited to have you on board.</p>`
    );
  }

  async sendPasswordReset() {
    await this.send(
      'Password Reset Request',
      `You requested a password reset. Please click the following link to reset your password: ${this.url}`,
      `<p>You requested a password reset. Please click <a href="${this.url}">here</a> to reset your password.</p>`,
      true
    );
  }

  async sendOtp(code) {
    await this.send(
      'Your Verification Code',
      `Your verification code is: ${code}. This code will expire in 10 minutes.`,
      `<p>Your verification code is: <strong>${code}</strong></p><p>This code will expire in 10 minutes.</p>`
    );
  }
};
