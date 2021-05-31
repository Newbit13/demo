<template>
  <h1>{{ msg }}</h1>

  <C @smsm="formC" />

  <button
    @click="
      count++;
      oo.ha++;
    "
  >
    count is: {{ count }},{{ double }},{{ oo.ha }}
  </button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  reactive,
  toRefs,
  computed,
  watch,
  watchEffect,
} from "vue";
import C from "./C.vue";
export default defineComponent({
  name: "HelloWorld",
  components: {
    C,
  },
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const count = ref(0);

    const oo = reactive({
      ha: 1,
    });
    // console.log(oo);
    // let { ha } = oo; //这样会失去响应式,可使用下方的toRefs
    // console.log(ha);
    let refO = toRefs(oo);
    // console.log(refO);
    let { ha } = refO;
    // console.log(ha);

    const double = computed(() => count.value * 2);

    // 监听
    // watch(count, (count, prevCount) => {
    //   console.log(count, prevCount, "watch");
    // });

    // watch(
    //   () => oo.ha,
    //   // ha,
    //   (count, prevCount) => {
    //     console.log(count, prevCount, "reactive value watch");
    //   }
    // );

    // watch([ha, count], (count, prevCount) => {
    //   console.log(count, prevCount, "para list watch");
    // });

    // watchEffect(() => {
    //   // 这里除非有使用到响应式的值，否则不会在值改变时自动执行这里面的语句
    //   console.log("watchEffect");
    //   console.log(count.value);//如果只存在单独这句时,当count.value变化时，这里能监听到
    //   console.log(count);//如果只存在单独这句时,当count.value变化时，这里不能能监听到
    //   // console.log(oo.ha);
    // });

    const formC = function () {
      console.log("formC");
    };
    return { count, double, oo, formC };
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
