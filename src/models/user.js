import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const comparePassword = (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    return Promise.resolve(false);
  }
  return bcrypt.compare(password, hashedPassword);
};


export default mongoose.model("User", userSchema);
export { comparePassword };
