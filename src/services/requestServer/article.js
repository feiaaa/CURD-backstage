import request from '../../utils/request';
import { target } from '../../utils/config.js';


export async function query(params) {
  //普通axios尝试连接正式数据库(数据ok，跨域需要安装谷歌插件)
  return request.get(`${target}/cat/Articles`,
    {
      page:params.page
    },{
      method:'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    }
  );
}
//添加
export async function create(params) {
  console.log(params,'params in create')

  return request.post(`${target}/cat/Articles`,
    {
      type:'create',
      data:params,
    },{
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    }
  );
}
//编辑
export function patch(id, values) {
  console.log(id, values,'params in patch')
  return request.post(`${target}/cat/Articles`,
    {
      type:'update',
      data:values,
      id:id
    },{
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    }
  );

}
//删除
export function remove(id) {
  console.log(id,'remove')
  return request.post(`${target}/cat/Articles`,
    {

      id:id
    },{
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    }
  );

}
