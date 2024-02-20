const { UserModel } = require("../../model/userModel");

const validator = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check name length
  if (name.length < 5) {
    return res
      .status(400)
      .json({ error: "Name should be at least 5 characters long" });
  }

  try {
    // Check if email is already registered
    const user = await UserModel.findOne({ email }).exec();
    if (user) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Check password strength
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character (!@#$%^&*)",
      });
    }

    next(); // Move to the next middleware
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { validator };
