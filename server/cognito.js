require('dotenv').config()
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
    CookieStorage,
} from 'amazon-cognito-identity-js';

const UserPoolId = process.env.COGNITO_USER_POOL_ID;
const ClientId = process.env.COGNITO_CLIENT_ID;

const userPool = new CognitoUserPool({
    UserPoolId,
    ClientId,
});

export default{
    constructor() {
        
    },
    signUp(id,password,nickName,picture){
        var attributeList = [];
        var dataEmail = {
            Name : 'email',
            Value : id // your email here
        };        
        
        var dataNickName = {
            Name : 'nickname',
            Value : nickName // your email here
        };

        var dataPicture = {
            Name : 'picture',
            Value : picture // your email here
        };

        const attributeEmail = new CognitoUserAttribute(dataEmail);
        const attributeNickName = new CognitoUserAttribute(dataNickName);
        const attributePicture = new CognitoUserAttribute(dataPicture);
         
        attributeList.push(attributeEmail);
        attributeList.push(attributeNickName);
        attributeList.push(attributePicture);
        
        return new Promise(function (resolve, reject) {
            userPool.signUp(id, password, attributeList, null, function(err, result){
                if (err) {
                    reject(err);
                }
                else{
                    resolve(result.user);
                }
            });
        });
    },
    verify(id,verifycode){
        const cognitoUser = new CognitoUser({
            Username:id,
            Pool:userPool
        });

        return new Promise(function (resolve, reject) {
            cognitoUser.confirmRegistration(verifycode, true, function(err, result) {
                if (err) {
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    },
    login(id,password){
        const authenticationData = {
            Username : id,
            Password : password, 
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        const userData = {
            Username:id,
            Pool:userPool
        }
        const cognitoUser = new CognitoUser(userData);

        return new Promise(function (resolve, reject){
            cognitoUser.authenticateUser(authenticationDetails,{
                onSuccess(result){
                    const accessToken = result.getAccessToken().getJwtToken();
                    resolve(accessToken);
                },
                onFailure(err){
                    reject(err);
                }
            });
        });
    },
    getUser(accessToken){
        var params={
            AccessToken: accessToken
        }

// const userPool=new CognitoUserPool({
//     process.env.userPool,
//     process.env.clientid
// })