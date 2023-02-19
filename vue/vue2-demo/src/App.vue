<template>
  <div id="app">
    <button @click="toggle">click</button>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Foo v-if="visible" :msg="fooMsg" :dataA.sync="dataA" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Foo from "./components/Foo.vue";

export default {
  name: "App",
  data() {
    return {
      fooMsg: "233",
      visible: true,
      dataA: [],
      cool:{}
    };
  },
  components: {
    HelloWorld,
    Foo,
  },
  methods: {
    toggle() {
      /* eslint-disable */
      this.fooMsg = "hello";
      // 一开始就触发不了watch
      this.dataA = [this.cool];
      // this.visible = !this.visible
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
