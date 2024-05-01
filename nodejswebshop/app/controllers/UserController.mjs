import bcrypt from "bcrypt";

// Updated database of users with hashed passwords including an admin user
const users = {
  sarah: { name: "Sarah", password: bcrypt.hashSync("sarahspassword", 10) },
  john: { name: "John", password: bcrypt.hashSync("johnspassword", 10) },
  david: { name: "David", password: bcrypt.hashSync("davidspassword", 10) },
  admin: {
    name: "Admin",
    password: bcrypt.hashSync("adminpassword", 10),
    isAdmin: true,
  },
};

// Function to authenticate a user including admin check
export const authenticate = async (req, res) => {
  const username = req.body.username.toLowerCase();
  const { password } = req.body;

  if (!users[username]) {
    console.log("Login attempt failed for user: ", username);
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const user = users[username];
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    res.json({
      success: true,
      message: "Login successful!",
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).json({ success: false, message: "Invalid password" });
  }
};

// Function to get user details or all user names if admin
export const get = (req, res) => {
  const username = req.params.username.toLowerCase();

  if (users[username] && users[username].isAdmin) {
    // If the user is admin, list all user names except the admin
    const userNames = Object.entries(users)
      .filter(([key, _]) => key !== "admin")
      .map(([_, user]) => user.name)
      .join(", ");
    res.send(`All users: ${userNames}`);
  } else if (users[username]) {
    res.send(`User: ${users[username].name}`);
  } else {
    res.status(404).send("User not found");
  }
};
