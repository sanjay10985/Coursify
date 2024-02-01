import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import Admin from './Schemas/adminSchema.js';
import User from './Schemas/userSchema.js';
import Course from './Schemas/courseSchema.js';


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

var secret_key = 'shhhh';

mongoose.connect('mongodb+srv://sanjaytomar717:fDk7xjTCLByH9vzX@cluster0.7qi4rmb.mongodb.net/',{useNewUrlParser:true,useUnifiedTopology:true,dbName:"courses"});

// Authenticate the JasonWebToken


// const authenticateJwt = (req,res,next) =>{
//     const authHeader = req.headers.authorization;
//     if(authHeader){
//         console.log("there is authHeader");
//         const token = authHeader.split(' ')[1];
//         jwt.verify(token,secret_key,(err,user) => {
//             if(err){
//                 console.log("token verification error",err);
//                 return res.status(403);
//             }
//             req.user = user;
//             console.log(user);
//             next();
//         })
//     }
//     else{
//         res.status(401).json({message: 'authentication failed'});
//     }
// }


const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        console.log("There is authHeader");
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secret_key, (err, user) => {
            if (err) {
                console.log("Token verification error", err);
                return res.status(403).json({ message: 'Forbidden' });
            }
            req.user = user;
            console.log(user);
            next();
        });
    } else {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

// Admin Routes Start

// Admin Login

app.post("/admin/login", async(req,res) =>{
    const {name,password} = req.body;
    const admin = await Admin.findOne({name,password});

    try{
        if(admin){
            const token = jwt.sign({name:name,role:'admin'},secret_key,{expiresIn:'1h'})
            return res.send({message:"Logged in successfully",token});
        }
        else{
            res.status(403).json({message: 'Invalid username of password'});
        }
        
    }catch(err){
        return res.status(500).send(err.message)
    }

})

// Get All Courses

app.get('/admin/courses',authenticateJwt,async(req,res) => {
    const courses = await Course.find({});
    res.json({courses});
})

// Create A New Course

app.post('/admin/courses',authenticateJwt,async(req,res) =>{
    const course = new Course(req.body);
    await course.save();
    res.json({message: 'course created successfully', course})
});

// Update The Existing Course

app.put('/admin/courses/:courseId', authenticateJwt,async(req,res) =>{
    const course = await Course.findByIdAndUpdate(req.params.courseId,req.body,{new:true})
    if(course){
        res.json({message: 'course updated successfully'});
    }else{
        res.status(404).json({message: 'course not found'});
    }
})

// Admin Routes End

// Users Routes start

// Users Signup

app.post("/users/signup", async(req,res) =>{
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

app.post("/users/login", async(req,res) =>{
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

app.get('/users/courses',async (req,res) =>{
    console.log("Hello");
    const courses = await Course.find({published:true});
   res.json({courses});
})

// Get single course

app.get('/users/courses/:courseId',async(req,res) => {
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

app.post('/users/courses/:courseId',authenticateJwt,async(req,res) =>{
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

app.get('/users/purchasedCourses', authenticateJwt,async (req,res)=>{
    const user = await User.findOne({name:req.user.name}).populate('purchasedCourses');
    if(user){
    res.json({purchasedCourses: user.purchasedCourses || []});
    }
    else{
        res.status(403).json({message:'User not found'})
    }
})

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
