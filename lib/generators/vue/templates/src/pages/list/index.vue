<template>
  <div>
    test
    <select :value="select" @change="onChange">
      <option value="a">a</option>
      <option value="b">b</option>
      <option value="c">c</option>
    </select>

    <div>
      <router-link :to="`list/${select}`">detail</router-link>
    </div>
  </div>
</template>
<script>
import { mapState, dispatch, commit } from '@didi/umi-vue';

export default {
  computed: {
    ...mapState({
      select: state => state.list.abc,
    }),
  },
  updated() {
    console.log(this);
  },
  methods: {
    onChange(e) {
      commit({ type: 'list/changeSelect', payload: { value: e.target.value } });
    },
  },
};
</script>
