<template>
  <el-card class="newsTitle">
    <p class="singleTitle">{{ news.title }}</p>
    <p style="text-align: right; margin-right: 10px">
      {{ news.time }}
    </p>
  </el-card>
</template>
<script>
export default {
  name: "NewsCard",
  computed: {
    news() {
      return this.newsPiece;
    },
  },
  props: {
    newsPiece: Object,
  },
};
</script>
<style scoped>
.newsTitle {
  background-clip: content-box;
  background-color: rgb(255, 254, 214);
  margin: 40px;
  text-align: left;
  border-radius: 75px;
}
.el-card {
  --el-card-padding: 10px;
  width: 95%;
}
.singleTitle {
  font-size: large;
  font-weight: bold;
  margin: 50px;
}
</style>
