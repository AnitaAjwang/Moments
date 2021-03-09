import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'});

// using this we will send the token to the backend so that the middleware can verify if user is logged in
API.interceptors.request.use((req) => {
    //token is stored in profile
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;//bearer token
    }
    return req;
});


//url will return all the posts
export const fetchPosts = () => API.get('/posts');
//newPost is the whole post
export const createPost = (newPost) => API.post('/posts', newPost);// specify the url and the data being sent
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);