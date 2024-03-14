import { Kid } from "../schema/schema";

export const registerKid = async (req, res) => {
  const newKid = await Kid.create({
    firstName: req.body.firstName,
    birthYear: req.body.birthYear,
    gender: req.body.gender,
    hearingAid: req.body.hearingAid,
    image: req.body.image,
    parent: req.user.id,
  });

  res.status(201);
  res.json({ data: newKid });
};

export const updateQuizScore = async (req, res) => {
  //   Check if kidId is actually user's kid
  const usersKid = await Kid.findOne({
    _id: req.params.kidId,
    parent: req.user.id,
  }).exec();
  if (!usersKid) {
    res.status(400);
    res.json({ message: "Couldn't find kid belonging to you" });
  } else {
    const updated = await Kid.findByIdAndUpdate(
      req.params.kidId,
      { quizScore: req.body.quizScore },
      { new: true }
    ).exec();

    res.json({ data: updated });
  }
};
