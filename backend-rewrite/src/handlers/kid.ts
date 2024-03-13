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
