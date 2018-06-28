import {routerRedux } from 'dva/router';
//import { login } from '../services/requestServer/login';
import * as loginService from '../services/requestServer/login';//server
import {target} from "../utils/config";
import axios from "axios/index";
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
export default {

  namespace: 'app',

  state: {
    loginLoading: false,
    name:'',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      //
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      console.log( payload,' payload');
      var flag=false;
      yield put({ type: 'showLoginLoading' });
      yield call(delay, 2000);

      yield put({ type: 'hideLoginLoading' });


      var params = new URLSearchParams();
      params.append('userName',payload.userName);
      params.append('passWord',payload.passWord);
      axios.post(`${target}/cat/PCLogin`,params, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*'
        },
      })
        .then(function (res) {
          console.log(res,'then');
          if(res.data.code=='-1')
          {
            alert(res.data.msg);
          }
          else if(res.data.code=='1000')
          {
            //localStorage.setItem('_username',payload.name);
            flag=true;

          }

        })
        .catch(function (error) {
          console.log(error,'error');
        });
      //var { res }=yield call(loginService.login,payload);//调用登录接口
      yield call(delay, 2000);
      console.log(flag,'flag');
      if(flag)
      {
        yield put(routerRedux.push('/articleList'));
      }





    },
    *logout({ payload }, { call, put }) {
      //localStorage.removeItem('_username');
      yield put(routerRedux.push('/login'));
    },
    *jump({ payload }, { call, put }){
      // yield put(routerRedux.push('/articleList'));
    }
  },

  reducers: {
    showLoginLoading(state) {
      return {
        loginLoading: true,
      };
    },
    hideLoginLoading(state) {
      return {
        loginLoading: false,
      };
    },
  },

};
