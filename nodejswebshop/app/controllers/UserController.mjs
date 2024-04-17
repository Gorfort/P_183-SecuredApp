const users = {
  sarah: "User: Sarah",
  john: "User: John",
  david: "User: David",
};

export const get = (req, res) => {
  const username = req.params.username;
  const user = users[username];

  if (!user) {
    res.status(404).send("User not found");
  } else {
    res.send(user);
  }
};

// npm install crypto
