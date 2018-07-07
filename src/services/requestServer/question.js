import request from '../../utils/request';
import { target } from '../../utils/config.js';
import axios from 'axios';

export async function query(values) {
  //根据课程查询题目
  return request.get(`${target}/cat/questions?lesson=${values.lesson}`,
    {
      method:'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
      },
    }
  );
}
//添加
export async function create(values) {
  console.log(values,'values in create')

  var params = new URLSearchParams()
  params.append('type', 'add')
  params.append('data',JSON.stringify(values));

  return axios.post(`${target}/cat/questionPC`,params, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
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
  console.log(values,'values')
  var params = new URLSearchParams()
  params.append('type', 'update')
  params.append('data',JSON.stringify(values));

  return axios.post(`${target}/cat/questionPC`,params, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
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
  console.log(id,'id in service');
  var params = new URLSearchParams()
  params.append('type', 'delete')
  params.append('questionId',id);

  return axios.post(`${target}/cat/questionPC`,params, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

}
