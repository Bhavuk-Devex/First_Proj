const { default: mongoose } = require("mongoose");

const loginSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Login", loginSchema);
