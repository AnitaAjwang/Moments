import jwt from 'jsonwebtoken';

//user wants to like post
// click the like button => auth middleware verifies (next) => like controller...

const auth = async (req, res, next) => {
    try {
        //check if token is valid
        //get token from front end, token is in the 1st position of the array
        const token = req.headers.authorization.split(" ")[1];//google auth
        const isCustomAuth = token.length < 500;

        let decodedData;//data we get from token

        if(token && isCustomAuth){
            decodedData = jwt.verify(token,'test');//test is the secret used in the controller to create token
            req.userId = decodedData?.id;
        }
        else{
            //for google auth
            decodedData = jwt.decode(token); 

            //sub - google's id that differentiates every single user
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}
export default auth;