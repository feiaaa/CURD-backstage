import request from '../utils/request';
const qs = require('qs');
// import qs from 'qs';//mock
// import { target } from '../utils/config.js';

export async function query(params) {
  console.log('server query',params,'params');
  return request(`/api/article?${qs.stringify(params)}`);
  //c尝试连接正式数据库，（失败）
  // return request(`/api/article?page=${qs.stringify(params.page)}`,
  //   {
  //     method:'GET',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //   }
  // );
}

