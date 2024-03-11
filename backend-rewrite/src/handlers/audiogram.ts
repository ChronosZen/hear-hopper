import { Kid, Audiogram } from "../schema/schema";

export const addAudiogram = async (req, res) => {
  const { leftEar, rightEar, owner } = req.body;

  //   Check if owner is actually user's kid
  const usersKid = await Kid.findOne({
    _id: owner,
    parent: req.user.id,
  }).exec();
  if (!usersKid) {
    res.status(400);
    res.json({ message: "Couldn't find owner matching your kid" });
  } else {
    const newAudiogram = await Audiogram.create({
      leftEar,
      rightEar,
      owner,
    });
    res.json({data: newAudiogram})
  }
};
