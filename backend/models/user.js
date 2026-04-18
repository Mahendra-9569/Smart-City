import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    password:{
        type: String,
        required: true,
    },

})

const User = mongoose.model("User", userSchema);
export default User;