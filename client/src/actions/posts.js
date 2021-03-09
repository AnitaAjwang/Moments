import {FETCH_ALL, CREATE, DELETE, UPDATE, LIKE} from '../constants/actionTypes';
import * as api from '../api/index';

//action creators

export const getPosts = () => async(dispatch) => {
    try {
        //here redux will dispatch/ pass an action from the data from our backend
        const { data } = await api.fetchPosts();
        //fetch the data from the api
        //send that data through the action.payload 
        dispatch({type:FETCH_ALL, payload:data });
    } 
    catch (error) {
        console.log(error.message);
    }
   
}

export const createPost = (post) => async(dispatch) => {
    try {
        //destructure the data from the response
        const { data } = await api.createPost(post);//making a post request to the backend server

        dispatch({ type: CREATE, payload:data});

    } catch (error) {
        console.log(error);
        
    };
}

export const updatePost = (id,post) => async (dispatch) => {
    try {
       const {data} = await api.updatePost(id,post);//get the data of the updated post

       dispatch({ type: UPDATE , payload:data});
      
    } catch (error) {
        console.log(error);
        
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        //here we are not interested in the return data we just want to delete
        await api.deletePost(id);
        dispatch({ type: DELETE, payload:id});  
    } catch (error) {
        console.log(error);
        
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);
        dispatch({type:LIKE, payload:data});
    } catch (error) {
        console.log(error);
        
    }
}