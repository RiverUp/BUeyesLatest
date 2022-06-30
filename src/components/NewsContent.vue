<template>
  <el-container>
    <el-header>
      <el-button class="back" @click="GoBack">
        <el-icon><Back /></el-icon>
      </el-button>
      <el-button class="heart">
        <el-icon><StarOutlined /></el-icon>
      </el-button>
      <el-button class="heart">
        <el-icon><HeartOutlined /></el-icon>
      </el-button>
      <p class="title">Text Conent</p>
    </el-header>
  </el-container>
  <el-container>
    <NewsCard :newsPiece="newsConverted" />
  </el-container>
  <el-container>
    <el-main>
      {{ newsConverted.content }}
    </el-main>
  </el-container>
</template>
<script>
import store from "@/store";
import { Back } from "@element-plus/icons-vue";
import { HeartOutlined, StarOutlined } from "@ant-design/icons-vue";
import NewsCard from "./NewsCard.vue";
import router from "@/router/index";
export default {
  name: "NewsContent",
  components: {
    NewsCard,
    Back,
    HeartOutlined,
    StarOutlined,
  },
  methods: {
    GoBack: function () {
      router.go(-1);
    },
  },
  computed: {
    newsConverted() {
      return store.state.news;
    },
  },
};
</script>
<style scoped>
.el-header {
  background-color: #4a2ac6;
  position: relative;
  height: 300px;
  padding: 0%;
  width: 100%;
}
.el-button {
  height: 270px;
  padding: 0;
  width: 300px;
  background-color: #4a2ac6;
  border: 0px;
}
.el-icon {
  font-size: 150px;
  color: white;
}
.back {
  float: left;
}
.heart {
  float: right;
  width: 200px;
}
.title {
  text-align: left;
  font-size: large;
  color: white;
}
.el-main {
  padding: 75px;
  line-height: 150px;
  height: 2700px;
}
</style>
