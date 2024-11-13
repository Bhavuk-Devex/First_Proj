const loginModal = require("../../Modal/login/login");
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

module.exports = { data, login };
