const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogSchema = new Schema(
  {
    blogTitle: {
      type: Schema.Types.String,
      required: true,
    },
    blogShortDesc: {
      type: Schema.Types.String,
      required: true,
    },
    blogCategory: {
      type: Schema.Types.String,
      required: true,
    },
    blogCover: {
      type: Schema.Types.String,
      required: true,
    },
    blogContent: {
      type: Schema.Types.String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", BlogSchema);
