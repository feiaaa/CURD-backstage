
import { target } from '../../utils/config.js';
import axios from 'axios';
import qs from 'qs';

//登录
export async  function login(values) {
   console.log(values,'values in server login');
   var params =qs.stringify(values);
  // var params = new URLSearchParams();
  // console.log(params,'params before append')
  // params.append('userName',values.userName);
  // params.append('passWord',values.passWord);
    console.log(params,'params after append')
  return axios.post(`${target}/cat/PCLogin`,params, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      // 'Access-Control-Allow-Origin': '*'
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
    });



}
