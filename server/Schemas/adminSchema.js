import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:String,
    password:String
})

export default mongoose.model('Admin',adminSchema);