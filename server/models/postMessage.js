import mongoose from 'mongoose';


//specifying what each post has to have for uniformity of the documents/collection
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes:{
        type:[String],
        default:[],
    },
    createdAt: {
        type:Date,
        deafault: new Date(),
    }
});
//turn schema to model
const PostMessage = mongoose.model('PostMessage',postSchema);

//we are exporting a mongoose model from the postmessage file
//on that model we can run commands e.g. crud comands

export default PostMessage;