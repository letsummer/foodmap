import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: String
});
userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
});
const Users = mongoose.model("users", userSchema);
export default Users;