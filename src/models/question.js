// import { hashHistory,routerRedux } from 'dva/router';
//import { query } from '../services/mockjs/question';//mockjs
import * as questionService from '../services/requestServer/question';//server
export default {

  namespace: 'question',

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
      console.log(history,'history in questionjs');
      history.listen(location => {
        console.log(location.pathname,'location.pathname')
        if (location.pathname === '/word/questionList') {
          dispatch({
            type: 'query',
            payload: {}
          });
        }
      });
    },
  },

  effects: {
    //根据课程查询题目
    *query({ payload:{ lesson =  1,page = 0 } }, { select, call, put }) {
      console.log(lesson,'page in query');
      yield put({ type: 'showLoading' });
      const { data } = yield call(questionService.query,{lesson});
      console.log(data,'data in model question')
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
      yield call(questionService.patch, id, values);
      yield put({ type: 'reload' });
    },
    //创建
    *create({ payload: values }, { call, put }) {
      yield call(questionService.create, values);
      yield put({ type: 'reload' });
    },
    //删除
    *remove({ payload: id }, { call, put }) {
      yield call(questionService.remove, id);
      yield put({ type: 'reload' });
    },
    //刷新
    *reload(action, { put, select }) {
      console.log("reload");
      const page = yield select(state => state.question.current);
      yield put({ type: 'query', payload: { page } });
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
