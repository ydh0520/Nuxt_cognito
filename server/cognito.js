require('dotenv').config()
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
    CookieStorage,
} from 'amazon-cognito-identity-js';


// const userPool=new CognitoUserPool({
//     process.env.userPool,
//     process.env.clientid
// })