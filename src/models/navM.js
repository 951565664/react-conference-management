
export default {

  namespace: 'navM',

  state: {
    
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    updataSuccess(state, action) {
      return { ...state, ...action.payload };
    },
  },

};