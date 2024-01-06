const auth = require("../auth");
const User = require("../models/User");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username exists
    const user = await User.findOne({ username });
    if (!user || !(await auth.comparePassword(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a token for the user
    const token = auth.generateToken(user);
    res.json({ token }); // Ensure this response is in proper JSON format
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if the username or email is already taken
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already taken" });
    }

    // Hash the password
    const hashedPassword = await auth.hashPassword(password);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a token for the new user
    const token = auth.generateToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
