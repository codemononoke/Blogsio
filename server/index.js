require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const connectDatabase = require("./config/db");
const cloudinary = require("cloudinary").v2;
const path = require("path");

const app = express();

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.use("/api/v1/auth", require("./routes/auth.route"));
app.use("/api/v1/profile", require("./routes/profile.route"));
app.use("/api/v1/blog", require("./routes/blog.route"));

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log(`Server is setup on http://localhost:${PORT}`);
});

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
