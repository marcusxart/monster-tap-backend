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
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.otpExpiration && user.otpExpiration < new Date()) {
      user.otp = null;
      user.otpExpiration = null;
      await this.userRepository.save(user);
      throw new BadRequestException('OTP has expired');
    }

    const isOtpMatch = await bcrypt.compare(otp, user.otp);

    if (!isOtpMatch) {
      throw new BadRequestException('OTP mismatch');
    }

    user.otp = null;
    user.otpExpiration = null;
    await this.userRepository.save(user);

    return {
      message: 'Account verified successfully',
      statusCode: HttpStatus.OK,
    };
  }
}

module.exports = OtpService;
