<template>
  <el-container>
    <el-header>
      <el-button class="user" @click="ShowUserInfo">
        <el-icon><Expand /></el-icon>
      </el-button>
      <el-button class="search" @click="ShowSearchInput">
        <el-icon><Search /></el-icon>
      </el-button>
      <p class="title">BUeyes</p>
      <el-menu
        :default-active="1"
        mode="horizontal"
        ellipsis="false"
        @select="ChangeToSelectedSort"
        text-color="white"
      >
        <el-menu-item index="1">{{ sort[0] }}</el-menu-item>
        <el-menu-item index="2">{{ sort[1] }}</el-menu-item>
        <el-menu-item index="3">{{ sort[2] }}</el-menu-item>
        <el-menu-item index="4">{{ sort[3] }}</el-menu-item>
        <el-menu-item index="5">{{ sort[4] }}</el-menu-item>
        <el-menu-item index="6">{{ sort[5] }}</el-menu-item>
      </el-menu>
    </el-header>
  </el-container>
  <div class="hello">
    <el-container>
      <el-main>
        <el-scrollbar v-infinite-scroll="GetMoreNews">
          <div v-for="news in newsPieces" :key="news.id">
            <el-card class="newsTitle">
              <p class="singleTitle">{{ news.title }}</p>
              <p style="text-align: right; margin-right: 10px">
                {{ news.time }}
              </p>
            </el-card>
            <br />
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { Expand, Search } from "@element-plus/icons-vue";
import { getTitlesByCgId } from "@/request/NewsController";
export default {
  name: "NewsHead",
  components: {
    Expand,
    Search,
  },
  data() {
    return {
      sort: ["推荐", "体育", "财经", "娱乐", "国际", "教育"],
      sortIndex: 0,
      newsPieces: [],
    };
  },
  mounted() {
    getTitlesByCgId(1, "2022-06-26").then((res) => {
      this.newsPieces = res.data.data;
    });
  },
  methods: {
    ShowUserInfo() {},
    ChangeToSelectedSort() {},
    GetMoreNews() {},
  },
};
</script>
<style scoped>
.el-header {
  background-color: #4a2ac6;
  position: relative;
  height: 600px;
}
.el-button {
  height: 270px;
  padding: 0;
  width: 300px;
  background-color: #4a2ac6;
  border: 0px;
}
.user {
  float: left;
}
.search {
  float: right;
}
.el-icon {
  font-size: 150px;
  color: white;
}
.title {
  text-align: left;
  color: white;
  font-size: large;
}
.el-header {
  padding: 0%;
  width: 100%;
}
.el-menu {
  background-color: #4a2ac6;
}
.el-menu-item {
  font-size: 100px;
}
.newsTitle {
  background-clip: content-box;
  background-color: rgb(246, 246, 198);
  margin: 40px;
  text-align: left;
  border-radius: 75px;
}
.el-card {
  --el-card-padding: 10px;
}
.singleTitle {
  font-size: large;
  font-weight: bold;
}
.el-main {
  margin-top: 70px;
  height: 3250px;
  padding: 0%;
}
</style>
