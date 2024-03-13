import { User } from "../schema/schema";

import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const signup = async (req, res) => {
  const user = await User.create({
    email: req.body.email,
    password: await hashPassword(req.body.password),
  });

  const token = createJWT(user);
  res.status(201);
  res.json({ token });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).lean().exec();

  if (!user) {
    res.status(400);
    // Keep it cryptic to reveal less info to potentially malicious actors
    res.json({ message: "Incorrect username or password" });
  } else {
    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
      res.status(400);
      // Keep it cryptic to reveal less info to potentially malicious actors
      res.json({ message: "Incorrect username or password" });
    } else {
      const token = createJWT(user);
      res.json({ token });
    }
  }
};

export const getAllUserData = async (req, res) => {
  const userData = await User.findById(req.user.id)
    .populate({
      path: "kids",
      populate: {
        path: "audiograms",
      },
    })
    .exec();

  res.json({ data: userData });
};

export const updateUserProfile = async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.user.id,
    { firstName: req.body.firstName, lastName: req.body.lastName },
    { new: true }
  ).exec();

  res.json({ data: updated });
};
