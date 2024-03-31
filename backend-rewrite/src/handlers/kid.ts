import { Kid } from "../schema/schema";
import { S3Client,PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
   region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }, 
});


export const registerKid = async (req, res) => {

  const image = req.body.image;
  const base64Image = image.split(";base64,").pop();
  const decodedImage = Buffer.from(base64Image, "base64");
  const key = `${uuidv4()}.jpg`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: decodedImage,
    ContentType: "image/jpeg",
  };


  try {
    await s3Client.send(new PutObjectCommand(params));
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ message: "Error uploading image" });
    return;
  }

  const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  const newKid = await Kid.create({
    firstName: req.body.firstName,
    birthYear: req.body.birthYear,
    gender: req.body.gender,
    hearingAid: req.body.hearingAid,
    image: imageUrl,
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
