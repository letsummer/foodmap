import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
})

userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 5);
});

const Users = mongoose.model("users", userSchema);

export default Users;