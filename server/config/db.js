require("dotenv").config();
const mongoose = require("mongoose");

const connectDatabase = () => {
  const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;
  mongoose
    .connect(
      `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@ac-ctwwokb-shard-00-00.ov1ihcg.mongodb.net:27017,ac-ctwwokb-shard-00-01.ov1ihcg.mongodb.net:27017,ac-ctwwokb-shard-00-02.ov1ihcg.mongodb.net:27017/?ssl=true&replicaSet=atlas-4a0iyq-shard-0&authSource=admin&retryWrites=true&w=majority`
    )
    .then(() => {
      console.log(`Database is setup on ${mongoose.connection.host}`);
    })
    .catch((error) => {
      console.log("Database connection failed");
      console.error(error);
      process.exit(1);
    });
};

module.exports = connectDatabase;
