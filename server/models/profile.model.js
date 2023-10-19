const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  gender: {
    type: Schema.Types.String,
  },
  dateOfBirth: {
    type: Schema.Types.String,
  },
  about: {
    type: Schema.Types.String,
    trim: true,
  },
  contactNumber: {
    type: Schema.Types.Number,
    trim: true,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
