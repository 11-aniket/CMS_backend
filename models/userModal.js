import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  role: String,
  password: String,
});

export default mongoose.model("User", userSchema);
