import bcrypt from "bcrypt";

// Simulated database of users with hashed passwords
const users = {
  sarah: { name: "Sarah", password: bcrypt.hashSync("sarahspassword", 10) },
  john: { name: "John", password: bcrypt.hashSync("johnspassword", 10) },
  david: { name: "David", password: bcrypt.hashSync("davidspassword", 10) },
};

// Function to authenticate a user
export const authenticate = async (req, res) => {
  // Convert username to lowercase to match the case-insensitive keys
  const username = req.body.username.toLowerCase();
  const { password } = req.body;

  // Check if user exists
  if (!users[username]) {
    console.log("Login attempt failed for user: ", username); // Logging the attempt
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // Retrieve user and compare password
  const user = users[username];
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    res.json({ success: true, message: "Login successful!" });
  } else {
    res.status(401).json({ success: false, message: "Invalid password" });
  }
};

// Function to get user details
export const get = (req, res) => {
  // Username in the URL should also be converted to lowercase
  const username = req.params.username.toLowerCase();

  if (!users[username]) {
    res.status(404).send("User not found");
  } else {
    res.send(`User: ${users[username].name}`);
  }
};
