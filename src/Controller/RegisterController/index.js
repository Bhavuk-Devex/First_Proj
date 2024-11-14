const loginModal = require("../../Modal/login/login");
const otpModal = require("../../Modal/otp/otp");
const bcrypt = require("bcrypt");

const data = (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    console.log("Req", req.body);
    const { email, password } = req.body;

    // Check if the email is already present
    const existingUser = await loginModal.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already present" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new loginModal({
      email,
      password: hashedPassword,
    });
    await user.save();

    res.status(200).json({
      success: true,
      message: `Email registered successfully ${email}`,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const sendOTP = async (req, res) => {
  console.log("Api hit");
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  const { email } = req.body;
  try {
    await otpModal.findOneAndUpdate(
      { email },
      { otp, otpExpiry },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: `otp send successfully to ${email}`,
      otp,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  const sendOTP = async (req, res) => {
    console.log("Api hit");
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    const { email } = req.body;
    try {
      await otpModal.findOneAndUpdate(
        { email },
        { otp, otpExpiry },
        { upsert: true, new: true }
      );

      res.status(200).json({
        success: true,
        message: `otp send successfully to ${email}`,
        otp,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

const verifyOTP = async (req, res) => {
  const { email, enteredOTP } = req.body;
  const user = await otpModal.findOne({ email });

  console.log(req.body);
  console.log(user);
  try {
    if (user && user.otp === enteredOTP && user.otpExpiry > new Date()) {
      user.otp = enteredOTP;
      await user.save();
      res.status(200).json({
        success: true,
        message: `OTP verified successfully`,
        enteredOTP,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Invalid or expired OTP",
        enteredOTP,
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { data, login, sendOTP, verifyOTP };
