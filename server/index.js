import express from 'express';
//import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';


import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();
//dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true}));// 30mb because images are also going to be sent
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
// should always be above app.use('/posts', postRoutes)
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
//every route inside the posts route is going to start with posts
app.use('/posts', postRoutes);
app.use('/user',userRoutes);


const CONNECTION_URL = 'mongodb+srv://user1:6zSRbZDc2anDuuG@cluster0.wlixl.mongodb.net/memories?retryWrites=true&w=majority';
const PORT = process.env.port || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))//if connection is successful
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
