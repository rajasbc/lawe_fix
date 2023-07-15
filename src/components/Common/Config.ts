import Amplify from 'aws-amplify';
import axios from "axios";

//TODO-JPP - pending (AWS cognito - reference)
class Config {
      
     awsCognitoAuthConfig() {
        Amplify.configure({
            Auth: {
            //identityPoolId: process.env.IDENTITY_POOL_ID,    
            userPoolId: process.env.USER_POOL_ID,
            userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID,
            region: process.env.USER_POOL_REGION,
           
            },
            oauth: {
              domain: 'nankodaiweb.auth.ap-south-1.amazoncognito.com',
              scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
              redirectSignIn: 'http://localhost:5000/userdetail',
              redirectSignOut: 'http://localhost:5000/',
              responseType: 'token' // or 'token', note that REFRESH token will only be generated when the responseType is code
          }
           
        })       
    }
    DEFAULT_LIST_INCREMENT = 10;
    
    async interceptor(){
            axios.interceptors.request.use(request => {
              const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')??'')?.[0] : null;
              if (token) {
              request.headers.Authorization = `Bearer ${token}`;
              }
                 return request;
               }, error => {
               return Promise.reject(error);
              });
              axios.interceptors.response.use(response => {
                 // Do something with response data
                 return response;
               }, error => {
               const status = error.status || (error.response ? error.response.status : 0);
                if (status === 403 || status === 401) {
                  return false;
                }
               return Promise.reject(error);
              });             
        }    
}

export const config = new Config();