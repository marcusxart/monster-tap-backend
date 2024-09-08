require('dotenv').config();
const db = require('../../database/models');
const { hashPassword } = require('../../utils/hashPassword');
const nodemailer = require('nodemailer');
const { EmailSender } = require('../email/email.service');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

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
    const hashedOtp = await hashPassword(otp);
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

    // // Email content
    // const mailOptions = {
    //   from: 'Monster tap <your-email@example.com>',
    //   to: email,
    //   subject: 'PASSWORD RESET OTP',
    //   text: `Your OTP for account verification is: ${otp}`,
    //   html: `<p>Your OTP for account verification is: <strong>${otp}</strong></p>`,
    // };

    // try {
    //   await transporter.sendMail(mailOptions);
    //   return {
    //     status: 'success',
    //     message: 'OTP has been sent to your email',
    //   };
    // } catch (error) {
    //   console.error('Error sending email:', error.message);
    // }

    const emailSender = new EmailSender();

    const emailOptions = {
      email: email,
      subject: 'Verification OTP',
      message: `Your verification OTP is ${otp}. Please use this OTP to verify your email.`,
    };

    emailSender.sendEmail(emailOptions);
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
