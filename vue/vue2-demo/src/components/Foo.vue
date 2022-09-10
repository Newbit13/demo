<template>
  <div class="hello">
    <p>{{msg}}</p>
    <div v-for="(item, index) in computedDataList" :key="index">
      <p>{{ item.age }}</p>
      <button @click="print(item)">click</button>
      <p>{{ item.loading }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooCmp",
  props: {
    msg: String,
    dataA: Array,
  },
  watch: {
    msg: function (newV) {
      console.log("watch");
      console.log(newV);
    },
    dataA: function (newV) {
      console.log("watch");
      console.log(newV);
    },
  },
  data() {
    return {
      dataList: [],
    };
  },
  computed: {
    computedDataList: function () {
      // 使用以下这句会让其他地方this.$set(item,'loading',true)失效
      // this.dataList.forEach((item) => (item.loading = false));
      return this.dataList;
    },
  },
  mounted() {
    console.log("mounted");
    console.log(this.msg);
  },
  created() {
    console.log("created");
    console.log(this.msg);
    this.getList();
  },
  methods: {
    getList() {
      this.dataList = [
        { age: 18, name: "hua" },
        { age: 27, name: "hua" },
      ];
    },
    print(item) {
      // item.loading = true;
      // 用$set设置新key无效，因为元素已有loading字段（虽然没有响应式，但是会影响$set设置loading
      this.$set(item, "loading", true);
      setTimeout(() => {
        item.loading = false;
      }, 1000);
      console.log(item);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
