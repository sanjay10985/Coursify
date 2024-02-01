import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    password:String,
    purchasedCourses: [{type: mongoose.Schema.Types.ObjectId,ref:'Course'}]
})

export default mongoose.model('User',userSchema);