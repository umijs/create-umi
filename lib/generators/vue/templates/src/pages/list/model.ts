export default {
  namespace: 'list',
  state: {
    abc: 'a',
  },
  mutations: {
    changeSelect(state, { payload }) {
      state.abc = payload.value;
    },
  },
  actions: {},
};
