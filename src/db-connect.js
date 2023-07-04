import mongoose from "mongoose";

const connectToDb = (URL) => {
  return mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to db");
    })
    .catch((error) => {
      console.log("error in  connecting to db",error);
    });
};

export { connectToDb };
