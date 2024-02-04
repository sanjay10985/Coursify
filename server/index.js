import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import adminRoutes from './routes/adminRoutes.js'
import userRoutes from './routes/userRoutes.js';


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb+srv://sanjaytomar717:fDk7xjTCLByH9vzX@cluster0.7qi4rmb.mongodb.net/',{useNewUrlParser:true,useUnifiedTopology:true,dbName:"courses"});

// Authenticate the JasonWebToken

app.use("/admin",adminRoutes);
app.use("/users",userRoutes);

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
