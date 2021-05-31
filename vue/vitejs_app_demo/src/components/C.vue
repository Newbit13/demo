<template>
  <div class="btn" @click="emmm">click</div>
  <div class="btn" @click="$emit('smsm')">click2</div>
  <input type="text" :value="msg" @input="msg = $event.target.value" />
  <!-- <input type="text" v-model="msg" /> -->
  <p>{{ msg }}</p>
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
export default defineComponent({
  name: "MyBtn",
  //   props: {
  //     msg: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  setup: () => {
    const msg = ref("666");
    // interface Context {
    //   $emit: (eventname: string) => void;
    // }
    // const emmm = function (this: Context) {
    const emmm = function () {
      console.log(111);
      this.$emit("smsm");
    };
    return { emmm, msg };
  },
});
</script>

<style scoped>
.btn {
  width: 80px;
  height: 40px;
  line-height: 40px;
  color: #ffffff;
  text-align: center;
  background: #db4646;
  border-radius: 4px;
  margin-bottom: 5px;
}
</style>