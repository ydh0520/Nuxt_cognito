require('dotenv').config()

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const UserPoolId = process.env.COGNITO_USER_POOL_ID;
const ClientId = process.env.COGNITO_CLIENT_ID;

const poolData={
    UserPoolId : UserPoolId,
    ClientId : ClientId
}

const userPool=new AmazonCognitoIdentity.CognitoUserPool(poolData);

exports.signUp=function(id,password){
    var attributeList = [];
    var dataEmail = {
        Name : 'email',
        Value : id // your email here
    };        
    
    var dataNickName = {
        Name : 'nickname',
        Value : 'test' // your email here
    };

    var dataPicture = {
        Name : 'picture',
        Value : "f" // your email here
    };

    const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    const attributeNickName = new AmazonCognitoIdentity.CognitoUserAttribute(dataNickName);
    const attributePicture = new AmazonCognitoIdentity.CognitoUserAttribute(dataPicture);
        
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
}

exports.verify=function(id,verifycode){
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
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
    
}

exports.logIn=function(id,password){  
    const authenticationData = {
        Username : id,
        Password : password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    const userData={
        Username:id,
        Pool:userPool
    };
    const cognitoUser=new AmazonCognitoIdentity.CognitoUser(userData);
    return new Promise(function(reslove,reject){
        const result = cognitoUser.authenticateUser(authenticationDetails,{
            onSuccess(result){
                console.log('Success')
                console.log(result)
            },
            onFailure(err){
                console.log('Error')
                console.log(err)
            }
        });
    })
}

exports.logOut=function(){

}

exports.getUser=function(){

}