const ejs = require('ejs');
const path = require('path');
const db = require('../../database/models');
const { hashPassword } = require('../../utils/hashPassword');
const EmailSender = require('../../utils/email/email.service');
const emailSender = new EmailSender();

class OtpService {
  constructor() {}

  async generateOtp() {
    const otp = Math.floor(Math.random() * 9000) + 1000;
    const otpString = otp.toString();
    return otpString;
  }

  async requestOtp(email) {
    const user = await db.users.findOne({ where: { email } });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const otp = await this.generateOtp();
    const date = new Date();
    const hashedOtp = await hashPassword(otp);
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = hashedOtp;
    user.otpExpiration = otpExpiration;
    await user.save();

    // Render the OTP email template with EJS
    const templatePath = path.join(
      __dirname,
      '../email/template/otpEmailTemplate.ejs'
    );
    const message = await ejs.renderFile(templatePath, {
      otp,
      year: date.getFullYear(),
    });

    const emailOptions = {
      email: email,
      subject: 'Reset Password OTP',
      message: message,
    };

    await emailSender.sendEmail(emailOptions);
  }

  async verifyOtp(email, otp) {
    const user = await db.users.findOne({ where: { email } });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.otpExpiration && user.otpExpiration < new Date()) {
      // OTP expired
      user.otp = null;
      user.otpExpiration = null;
      await user.save();
      throw new AppError('OTP has expired', 400);
    }

    const isOtpMatch = await bcrypt.compare(otp, user.otp);

    if (!isOtpMatch) {
      throw new AppError('OTP mismatch', 400);
    }

    user.otp = null;
    user.otpExpiration = null;
    await user.save();

    return {
      message: 'OTP verified successfully',
      statusCode: 200,
    };
  }
}

module.exports = OtpService;
