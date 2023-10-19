const User = require("../models/user.model");
const Profile = require("../models/profile.model");
const asyncHandler = require("express-async-handler");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

const updateDisplayPicture = asyncHandler(async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const result = await uploadImageToCloudinary(
      displayPicture,
      "profile",
      1000,
      1000
    );
    console.log(result);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { profileImage: result.secure_url },
      { new: true }
    );
    res.json({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  try {
    const { name, dateOfBirth, about, contactNumber, gender } = req.body;
    const id = req.user.id;

    const userDetails = await User.findById(id);
    const profile = await Profile.findById(userDetails.additionalDetails);

    const user = await User.findByIdAndUpdate(id, {
      name,
    });
    await user.save();

    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;
    profile.gender = gender;
    await profile.save();

    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.json({
      success: true,
      msg: "Profile Updated Successfully",
      updatedUserDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});

module.exports = { updateDisplayPicture, updateProfile };
