const router = require("express").Router();
const {
  updateDisplayPicture,
  updateProfile,
} = require("../controllers/profile.controller");
const { getAccessToRoute } = require("../middleware/auth");

router.put("/updateDisplayPicture", getAccessToRoute, updateDisplayPicture);
router.put("/updateProfile", getAccessToRoute, updateProfile);

module.exports = router;
