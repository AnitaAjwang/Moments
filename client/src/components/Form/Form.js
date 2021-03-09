import { useState,useEffect } from 'react';
import { TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({currentId,setCurrentId}) =>
{
     //specifying the object properties on initialization
    const [postData, setPostData] = useState({title:'',message:'',tags:'',selectedFile:'' });
    const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));//we are finding the updated post whose id is equal to the current id
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    //this function will be run when the post value changes from nothing to the actual post
    useEffect(() => {
        //the useEffect will populate the values of the form
        //set post data to updated post
        if(post) setPostData(post);
    },[post]);

    const clear = () => {
        setCurrentId(0);
        setPostData({title:'', message:'', tags:'', selectedFile:''});
    }
    const handleSubmit = (e) => {
        //once the user submits all the data they have input will be sent over in a POST request
        e.preventDefault();

        //if current id is not null
        if(currentId === 0){ 
            // the createPost action will be dispatched
            dispatch(createPost({...postData,name: user?.result?.name}));      
        }
        else{
           dispatch(updatePost(currentId,{...postData,name: user?.result?.name}));
           console.log(postData);
            }
        clear();//clears data and changes current id which will affect the useEffect in App.js
    };
    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography>Please sign in to create your own moments and like other's moments</Typography>
            </Paper>
        )
    }


    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6" >{currentId ? 'Editing': 'Creating'} a Moment</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title:e.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message:e.target.value})}/>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags:e.target.value.split(',')})}/>
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData,selectedFile: base64})}/></div>
                <Button className={classes.buttonSubmit} variant="contained"  size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="large" onClick={clear} fullWidth>Clear</Button>
            </form>

        </Paper>
    );
}

export default Form;