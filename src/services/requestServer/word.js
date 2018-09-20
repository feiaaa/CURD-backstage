import request from '../../utils/request';
import { target } from '../../utils/config.js';
import axios from 'axios';
import qs from "qs";

export async function query(values) {
  console.log(values,'values');
  //普通axios尝试连接正式数据库(数据ok，跨域需要安装谷歌插件)
  return request.get(`${target}/cat/WordsPc?page=${values.page}`,
    {
      method:'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    }
  );
}
//添加
export async function create(values) {
  var params={
    'type':'add',
    'data':JSON.stringify(values)
  }
  params=qs.stringify(params);

  return axios.post(`${target}/cat/WordsPc`,params, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
//编辑
export function patch(id, values) {
  var params={
    'type':'update',
    'data':JSON.stringify(values)
  }
  params=qs.stringify(params);

  return axios.post(`${target}/cat/WordsPc`,params, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });


}
//删除
export function remove(id) {
  var params={
    'type':'delete',
    'id':id
  }
  params=qs.stringify(params);
  return axios.post(`${target}/cat/WordsPc`,params, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

}
