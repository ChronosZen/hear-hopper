const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());

const users = [];

async function createUser() {
  const hashedPassword = await bcrypt.hash("123456", 10);
  const user = {
    id: "1",
    firstName: "Chris",
    lastName: "Arunyamitanon",
    email: "krisana@gmail.com",
    password: hashedPassword,
  };
  users.push(user);
}
createUser();

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { email: req.body.email, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch (error) {
    res.status(501).send();
    console.log(error);
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.email === req.body.email);
  if (user === undefined) {
    return res.status(400).send("Cannot find user");
  }
  try {
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const userWithoutPassword = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      res.status(200).json(userWithoutPassword);
      console.log("Success");
    } else {
      res.status(404).json({ message: "Not Found", statusCode: 404 });
      console.log("Not success");
    }
  } catch (error) {
    res.status(501).send();
    console.log(error);
  }
});
app.listen(5000);
