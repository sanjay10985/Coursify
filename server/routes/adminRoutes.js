import {Router} from 'express';
import Admin from '../Schemas/adminSchema.js'
import Course from '../Schemas/courseSchema.js'
import authJwt from '../middleware/authJwt.js';
import jwt from 'jsonwebtoken';

const router = Router();
var secret_key = 'shhhh';


// Login Admin

router.post("/login", async(req,res) =>{
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

router.get('/courses',authJwt,async(req,res) => {
    const courses = await Course.find({});
    res.json({courses});
})

// Create A New Course

router.post('/courses',authJwt,async(req,res) =>{
    const course = new Course(req.body);
    await course.save();
    res.json({message: 'course created successfully', course})
});

// Update The Existing Course

router.put('/courses/:courseId', authJwt,async(req,res) =>{
    const course = await Course.findByIdAndUpdate(req.params.courseId,req.body,{new:true})
    if(course){
        res.json({message: 'course updated successfully'});
    }else{
        res.status(404).json({message: 'course not found'});
    }
})

export default router;