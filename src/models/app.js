import {routerRedux } from 'dva/router';
//import { login } from '../services/requestServer/login';
import * as loginService from '../services/requestServer/login';//server

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
      yield put({ type: 'showLoginLoading' });
      yield call(delay, 2000);

      yield put({ type: 'hideLoginLoading' });
      yield call(delay, 1000);
      var { res }=yield call(loginService.login,payload);//调用登录接口
      console.log(res,'res');
      // if(res.data.code=='-1')
      // {
      //   alert(res.data.message);
      // }
      // else if(res.data.code=='1000')
      // {
      //   //localStorage.setItem('_username',payload.name);
      //   yield put(routerRedux.push('/articleList'));
      // }

    },
    *logout({ payload }, { call, put }) {
      //localStorage.removeItem('_username');
      yield put(routerRedux.push('/login'));
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
