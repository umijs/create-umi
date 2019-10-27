function delay(s) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, s * 1000);
  });
}

export default {
  namespace: 'index',
  state: {
    isAuth: false,
    name: 'hys',
    count: 1,
  },
  getters: {},
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    async incrementAsync({ commit }) {
      await delay(2);
      commit('increment');
    },
  },
};
