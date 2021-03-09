import {FETCH_ALL, CREATE, DELETE, UPDATE, LIKE} from '../constants/actionTypes';
export default (posts = [], action) => {
    //our posts are going to be in an posts
    switch (action.type) {
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);  
        case UPDATE :
        case LIKE:    
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
            //return action.payload is the updated post else return the post the way it was since there was no update
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts,action.payload];//spread all the posts and add a new post which is stored in action.payload   
        default:
            return posts;
    }
}