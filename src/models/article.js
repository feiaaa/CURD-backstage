//import { hashHistory } from 'dva/router';
//import { query } from '../services/mockjs/article';//mockjs
import * as articleService from '../services/requestServer/article';//server
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
        console.log(location,'location in articles');
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
    *query({ payload:{ page =  0 } }, { select, call, put }) {
      console.log(page,'page in query');
      yield put({ type: 'showLoading' });
      const { data } = yield call(articleService.query,{page});
      console.log(data,'data in model article')
      if (data.code===1000) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.result,
            total: parseInt(data.msg, 10),
            current: page
          }
        });
      }
    },
    //编辑
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(articleService.patch, id, values);

      yield put({ type: 'reload' });
    },
    //创建
    *create({ payload: values }, { call, put }) {
      yield call(articleService.create, values);
      yield put({ type: 'reload' });
    },
    //删除
    *remove({ payload: id }, { call, put }) {
      yield call(articleService.remove, id);
      yield put({ type: 'reload' });
    },
    //刷新
    *reload(action, { put, select }) {
      console.log("reload");
      const page = yield select(state => state.article.current);
      yield put({ type: 'query', payload: { page } });
    },

    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    showLoading(state, action){
      return { ...state, loading: true };
    },
    querySuccess(state, action){
      return {...state, ...action.payload, loading: false};
    },
    createSuccess(){},
    deleteSuccess(){},
    updateSuccess(){},
  },

};
