import { hashHistory } from 'dva/router';
import { query } from '../services/article';
//import * as articleService from '../services/article';
export default {

  namespace: 'article',

  state: {
    list: [],
    total: null,
    loading: false, // 控制加载状态
    current: null, // 当前分页信息
    currentItem: {}, // 当前操作的用户对象
    modalVisible: false, // 弹出窗的显示状态
    modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/articleList') {
          dispatch({
            type: 'query',
            payload: {}
          });
        }
      });
    },
  },

  effects: {
    *query({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(query);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current
          }
        });
      }
    },
    *create(){},
    *'delete'(){},
    *update(){},

    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    showLoading(state, action){
      return { ...state, loading: true };
    },
    // querySuccess(state){
    //   const mock={
    //     total: 3,
    //     current: 1,
    //     loading: false,
    //     list:[
    //       {
    //         articleTime: '2015',
    //         articleType: '科技博客',
    //         urlAddress: 'https://www.baidu.com/',
    //       },
    //       {
    //         articleTime: '2016',
    //         articleType: '科技博客',
    //         urlAddress: 'https://www.baidu.com/',
    //       },
    //       {
    //         articleTime: '2017',
    //         articleType: '生活笔记',
    //         urlAddress: 'https://www.baidu.com/',
    //       },
    //     ]
    //   }
    //   return {...state, ...mock, loading: false};
    // },
    querySuccess(state, action){
      return {...state, ...action.payload, loading: false};
    },
    createSuccess(){},
    deleteSuccess(){},
    updateSuccess(){},
  },

};
