import request from '../../utils/request-mock';
const qs = require('qs');
// import qs from 'qs';//mock


export async function query(params) {
   console.log('server query',params,'params');
   //mock js使用
   return request(`/api/article?${qs.stringify(params)}`);

}

