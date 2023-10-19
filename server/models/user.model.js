const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: [true, "Name is required."],
    },
    email: {
      type: Schema.Types.String,
      required: [true, "Email is required."],
      unique: [true, "This email is already used by other user."],
      trim: true,
    },
    password: {
      type: Schema.Types.String,
      required: [true, "Password is required."],
    },
    role: {
      type: Schema.Types.String,
      default: "user",
      enum: ["user", "admin"],
    },
    active: {
      type: Schema.Types.Boolean,
      default: true,
    },
    approved: {
      type: Schema.Types.Boolean,
      default: true,
    },
    additionalDetails: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    token: {
      type: Schema.Types.String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    profileImage: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
