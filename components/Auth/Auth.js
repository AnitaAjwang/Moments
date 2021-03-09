import React,{useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container,TextField} from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import {useHistory} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './icon';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import { signin,signup } from '../../actions/auth';

const initialState = { firstName:'', lastName:'', email:'', password:'',confirmPassword:''};

const Auth = () => {
     const classes = useStyles();
     const dispatch = useDispatch();
     const [showPassword,setShowPassword] = useState(false);
     const [isSignup,setIsSignUp] = useState(false);
     const [formData,setFormData] = useState(initialState);
     const history = useHistory();

     const handleSubmit = (e) =>{
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData,history));
            
        } else {
            dispatch(signin(formData,history));
        }
     };
     const handleChange = (e) => {
         //will change the specific name that you are on with the target value
        setFormData({...formData,[e.target.name]:e.target.value});

     }

     //will toggle the state of the password
     const handleShowPassword = () => {
         setShowPassword((prevShowPassword) => !prevShowPassword);
     }

     //toggle isSignUp from true to false and vice versa
     const switchMode = () => {
        setIsSignUp((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
     }
     const googleSuccess = async (res) => {
         const result = res?.profileObj;// wont get an error if res isnt there when you use ?
         const token = res?.tokenId;

         try {
             dispatch({type: 'AUTH', data: {result,token}  });
             //redirect to home
             history.push("/");
         } catch (error) {
             console.log(error);      
         }
     }   
     const googleFailure = (error) => {
         console.log(error);
         console.log('Google sign in failed');
     }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    {/*<LockOutlinedIcon/>*/}
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up':'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                                       
                            )}
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                            {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" className={classes.submit} color="primary">
                        {isSignup ? 'Sign Up':'Sign In'}
                    </Button>

                    <GoogleLogin
                     clientId="582336512607-6hqqp5sdnomid18hsid51nnkd03don50.apps.googleusercontent.com"
                     render={(renderProps) => (
                         <Button 
                            className={classes.googleButton} 
                            color="secondary" 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon />} 
                            variant="contained">
                                Google Sign In
                            </Button>
                     )}
                     onSuccess={googleSuccess}
                     onFailure={googleFailure}
                     cookiePolicy="single_host_origin"
                    />
                    
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container>
    )
}
export default Auth;
