
export default {

  namespace: 'example2',

  state: {
    a:{
      value:123
    }
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
    save(state, action) {
      return { ...state, ...action.payload };
    },
    add(state, action) {
      return { 
        ...state, 
        a:{
          value:++state.a.value
        }
      };
    },
  },

};
