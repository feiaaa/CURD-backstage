import request from '../../utils/request';
import { target } from '../../utils/config.js';
import axios from 'axios';
import qs from 'qs';

export async function query(values) {
  //普通axios尝试连接正式数据库(数据ok，跨域需要安装谷歌插件)
  // console.log(qs.stringify(values),'params in serve');
  // // var params = new URLSearchParams();
  // // params.append(' page',values.page);
  //
  // return axios.get(`${target}/cat/Articles?${qs.stringify(values)}`)
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });


  return request.get(`${target}/cat/Articles?page=${values.page}`,
    {
    //   page:params.page
    // },{
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

  return axios.post(`${target}/cat/Articles`,params, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    },
  })
    .then(function (response) {
      console.log(response,'server article js');
    })
    .catch(function (error) {
      console.log(error);
    });
}
//编辑
export function patch(id, values) {
  var params = new URLSearchParams()
  params.append('type', 'update')
  params.append('data',JSON.stringify(values));

  return axios.post(`${target}/cat/Articles`,params, {
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
  var params = new URLSearchParams()
  params.append('type', 'delete')
  params.append('id',id);

  return axios.post(`${target}/cat/Articles`,params, {
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
