<template>
  <div>
    Hello, {{ count }} {{ name }} for {{ lang }}! <br />
    <button @click="add">add</button>

    <button @click="addAsync">add async</button>
    <div>
      <router-link to="/list">list</router-link>
    </div>
  </div>
</template>
<script>
import { mapState, dispatch, commit } from '@didi/umi-vue';
export default {
  computed: {
    ...mapState({
      isAuth: state => state.index.isAuth,
      name: state => state.index.name,
      count: state => state.index.count,
      lang: state => state.global.lang,
    }),
  },
  updated() {
    console.log(1);
  },
  methods: {
    add() {
      commit({ type: 'index/increment' });
    },
    addAsync() {
      commit({ type: 'index/incrementAsync' });
    },
  },
};
</script>
