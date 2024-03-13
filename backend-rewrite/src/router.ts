import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { getAllUserData, updateUserProfile } from "./handlers/user";
import { registerKid } from "./handlers/kid";
import { addAudiogram } from "./handlers/audiogram";

const router = Router();

// Get all user data with nested kids and nested audiograms
router.get("/me", getAllUserData);

// Patch the user's full name onto the profile
router.patch(
  "/my-name",
  body("firstName").exists().isString(),
  body("lastName").exists().isString(),
  handleInputErrors,
  updateUserProfile
);

// Add a kid
router.post(
  "/kid",
  body("firstName").exists().isString(),
  body("birthYear").exists(),
  body("gender").exists().isIn(["Boy", "Girl", "Non-binary","Prefer not to say"]),
  body("hearingAid").exists(),
  handleInputErrors,
  registerKid
);

// Add audiogram
router.post(
  "/audiogram",
  body("leftEar").exists(),
  body("rightEar").exists(),
  body("owner").exists(),
  handleInputErrors,
  addAudiogram
);

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke with our server!");
});

export default router;
