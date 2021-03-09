import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Paper, Typography } from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './styles';


const Posts = ({setCurrentId}) =>
{
    const posts = useSelector( (state) => state.posts);//in the index.js reducer it is called posts
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    console.log(posts);
    if (!posts.length){
      return(
          <Paper className={classes.paper}>
              <Typography>Sorry. There are currently no posts</Typography>
          </Paper>
      )
  }
    return(
      // if post.length = 0 show loading spinner else show the posts  
      // !posts.length ? <CircularProgress /> : (
     
        
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map((post) =>(
                <Grid key={post._id} item xs={12} sm={6}>
                    <Post post={post} setCurrentId={setCurrentId}/>

                </Grid>)
            )}
        </Grid>
      
    

    );
}

export default Posts;