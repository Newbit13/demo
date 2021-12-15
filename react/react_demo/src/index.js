import dva from "dva";
import router from "./router";
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model({
  namespace: "example",
  state: {
    a: {
      value: 123,
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    add(state, action) {
      return {
        ...state,
        a: {
          value: ++state.a.value,
        },
      };
    },
  },
});

app.model({
  namespace: "example2",
  state: {
    a: {
      value: 123,
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    add(state, action) {
      return {
        ...state,
        a: {
          value: ++state.a.value,
        },
      };
    },
  },
});

// 4. Router
app.router(router);

// 5. Start
app.start("#root");
