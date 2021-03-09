import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
//This file will execute the routes functions

export const getPosts = async (req,res) => {
    try{
        //retrieving all the posts from the database
        // async functions take time so await has to be used
        const postMessages = await PostMessage.find();
        console.log(postMessages);
        //function will return OK and a json with the messages
        res.status(200).json(postMessages);

    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req,res) => {
    const post = req.body;
    // pass the values we are receiving from req.body
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try{
        await newPost.save();

        res.status(201).json(newPost);//201 - successful creation
    }
    catch(error){
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req,res) => {
    //extract id 
    //rename id to _id
    const { id:_id } = req.params;
    const post = req.body;
    //check to see if _id ia a mongoose object id
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    //...post spreads all the props we are rceiving from the frontend
    const updatedPost= await PostMessage.findByIdAndUpdate(_id, {...post,_id}, { new:true }); 
    res.json(updatedPost);
    
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
   // console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req,res) => {
    const {id} = req.params;
    //like post has userId because auth was passed before it in the posts route
    if (!req.userId) return res.json({ message: 'Unauthenticated'});

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await PostMessage.findById(id);
    //each like is gooing to be the id of a specific person
    const index = post.likes.findIndex((id) => id=== String(req.userId));

    if(index === -1){
        //like the post
        post.likes.push(req.userId);
    }
    else{
        //unlike the post
        //remove id from the likes array
        post.likes = post.likes.filter((id) => id !== String(req.userId));//returns array of all the likes except frm the id 

    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});//{ likeCount: post.likeCount + 1}

    res.json(updatedPost);
}