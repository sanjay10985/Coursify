import {Router} from 'express';
import Course from '../Schemas/courseSchema.js'
import User from '../Schemas/userSchema.js';
import authJwt from '../middleware/authJwt.js';
import jwt from 'jsonwebtoken';

const router = Router();
var secret_key = 'shhhh';


// Users Signup

router.post("/signup", async(req,res) =>{
    const {name,password} = req.body;
    const user = await User.findOne({name});    
    if(user)
    res.send("username is not available");
    else{
        try{
            const newUser = new User({name,password});
            await newUser.save();
        const token = jwt.sign({name,role: 'user'},secret_key,{expiresIn: '1h'});
        res.send({message: 'user created successfully', token});
    }
        catch(err){
            res.status(500).send("Error encrypting password");
        }
    }
})

// Users Sign In

router.post("/login", async(req,res) =>{
    const {name,password} = req.body;
    const user = await User.findOne({name,password});
    if(user){
        const token = jwt.sign({name,role:'user'},secret_key,{expiresIn: '1h'});
        res.json({message: 'Logged in successfully', token});
    }
    else{
        res.status(403).send({message:"Error comparing passwords"});
    }

})

// Get All Published Courses

router.get('/courses',async (req,res) =>{
    console.log("Hello");
    const courses = await Course.find({published:true});
   res.json({courses});
})

// Get single course

router.get('/courses/:courseId',async(req,res) => {
    console.log("Hiii");
    const course = await Course.findById(req.params.courseId);
    console.log('Found course:', course);
    try{
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    }
    catch(err){
        console.log("Error fetching course:", err);
        res.status(500).json({ message: 'Internal server error' });
    }

})

// Purchase A Course

router.post('/courses/:courseId',authJwt,async(req,res) =>{
    const course = await Course.findById(req.params.courseId);
    // console.log(req.user);
    const {name} = req.user;
    if (!name) {
        return res.status(400).json({ message: "Missing 'name' in request body" });
    }
    console.log(course);
    if(course){
        const user = await User.findOne({ name});
        console.log(user);
        if (user) {
        user.purchasedCourses.push(course);
        await user.save();
            res.json({message:'Course purchased successfully'});
        }else{
            res.status(404).json({ message: "user not found" });
        }
    }
    else{
        console.error("Error purchasing course:", error);
    res.status(500).json({ message: "Internal server error" });

    }
})

// Get all purchased courses

router.get('/purchasedCourses', authJwt,async (req,res)=>{
    const user = await User.findOne({name:req.user.name}).populate('purchasedCourses');
    if(user){
    res.json({purchasedCourses: user.purchasedCourses || []});
    }
    else{
        res.status(403).json({message:'User not found'})
    }
})

export default router;