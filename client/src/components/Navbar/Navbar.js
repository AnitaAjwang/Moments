import {Link, useHistory, useLocation} from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import moments from '../../images/moments2.png';
import styles from '../../App.module.css';
import useStyles from './styles';
import {useDispatch } from 'react-redux';
import { useState,useEffect } from 'react';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();//location gets access to changes in location i.e pages
    //const user = null; // mock user

    //fetch user from local storage
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    //console.log(user);

    const logout = () => {
        dispatch({type :'LOGOUT'});
        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        //if token exists in local storage send it to token variable
        const token = user?.token;

        if(token){
            const decodedToken = decode(token);
            //if token has expired log user out , * 1000 converts time to milliseconds, gettime is already in m
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location]);

    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <img className={classes.image} src={moments} alt="moments" height="60" ></img> &nbsp; &nbsp; &nbsp;
                 <div className={styles.vl}></div> &nbsp; &nbsp; &nbsp;
                <Typography component={Link} to="/" className={classes.heading} variant="h4" align="center" >Moments</Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>LogOut</Button>
                    </div>
                ):(<Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>)}
            </Toolbar>

        </AppBar>
    )
}
export default Navbar;