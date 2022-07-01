<template>
  <el-container>
    <el-header>
      <el-button class="user" @click="ShowUserInfo">
        <el-icon class="outside"><Expand /></el-icon>
      </el-button>
      <el-button class="search" @click="ShowSearchInput" color="#626aef" round>
        <el-icon class="outside" v-if="sortOrSearch"><Search /></el-icon>
        <el-icon class="outside" v-else><Back /></el-icon>
      </el-button>
      <p class="title">BUeyes</p>
      <el-menu
        v-if="sortOrSearch"
        :default-active="1"
        mode="horizontal"
        ellipsis="false"
        @select="ChangeToSelectedSort(index)"
        text-color="white"
        active-text-color="purple"
        router="true"
      >
        <el-menu-item index="1">{{ sort[0] }}</el-menu-item>
        <el-menu-item index="2">{{ sort[1] }}</el-menu-item>
        <el-menu-item index="3">{{ sort[2] }}</el-menu-item>
        <el-menu-item index="4">{{ sort[3] }}</el-menu-item>
        <el-menu-item index="5">{{ sort[4] }}</el-menu-item>
        <el-menu-item index="6">{{ sort[5] }}</el-menu-item>
      </el-menu>
      <el-input v-else v-model="searchInfo" placeholder="Please input">
        <template #prepend>
          <el-button class="insideButton" @click="SearchNews">
            <el-icon class="inside"><Search /></el-icon
          ></el-button>
        </template>
      </el-input>
    </el-header>
  </el-container>
  <div class="hello">
    <el-container>
      <el-main>
        <el-scrollbar v-infinite-scroll="GetMoreNews">
          <div style="height: 100%" v-for="news in newsPieces" :key="news.id">
            <NewsCard :newsPiece="news" @click="GoToNewsContent(news)" />
            <br />
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { Expand, Search, Back } from "@element-plus/icons-vue";
import { getTitlesByCgId, getTitlesByKd } from "@/request/NewsController";
import NewsCard from "./NewsCard.vue";
import router from "@/router/index";
import store from "@/store";
export default {
  name: "NewsHead",
  components: {
    Expand,
    Search,
    Back,
    NewsCard,
  },
  data() {
    return {
      sort: ["推荐", "体育", "财经", "娱乐", "国际", "教育"],
      sortIndex: 0,
      newsPieces: [],
      newsPiecesSaved: [],
      sortOrSearch: true,
      searchInfo: "",
      pageNo: [],
    };
  },
  mounted() {
    //第一次进入界面将每个类别的缓存都设为null
    console.log("执行mounted");
    if (this.$route.name === "home" && this.newsSaved === null) {
      var i = 1;
      for (; i < 11; i++) {
        this.newsPiecesSaved[i] = null;
        this.pageNo[i] = 0;
      }
      getTitlesByCgId(this.pageNo[1], 1, "2022_06_30").then((res) => {
        this.newsPieces = res.data.data;
        this.newsPiecesSaved[1] = this.newsPieces;
        store.commit("ConvertNewsSaved", this.newsPiecesSaved);
      });
      this.pageNo[1]++;
    } else {
      this.pageNo = this.pageNoSaved;
      if (this.$route.name === "newsSort") {
        var caId = this.$route.params.categoryId;
        this.newsPieces = this.newsSaved[caId];
      } else {
        this.newsPieces = this.newsSaved[1];
      }
    }
  },
  methods: {
    ShowUserInfo() {},
    ChangeToSelectedSort() {},
    GetMoreNews() {
      var cgId;
      if (this.$route.name === "home") {
        cgId = 1;
      } else {
        cgId = this.$route.params.categoryId;
      }
      getTitlesByCgId(this.pageNo[cgId], cgId, "2022_06_30").then((res) => {
        this.newsPieces = this.newsPieces.concat(res.data.data);
      });
      this.pageNo[cgId]++;
    },
    ShowSearchInput() {
      this.sortOrSearch = !this.sortOrSearch;
    },
    SearchNews() {
      getTitlesByKd("2022_06_26", this.searchInfo).then((res) => {
        this.newsPieces = res.data.data;
      });
    },
    GoToNewsContent(news) {
      store.commit("SavePageNo", this.pageNo);
      store.commit("ConvertNews", news);
      router.push({
        name: "news",
        params: {
          id: news.id,
        },
      });
    },
  },
  computed: {
    newsSaved() {
      return store.state.newsPiecesSaved;
    },
    pageNoSaved() {
      return store.state.pageNo;
    },
  },
  watch: {
    $route: function () {
      console.log("执行watch$route");
      if (this.$route.name === "newsSort") {
        var caId = this.$route.params.categoryId;
        if (this.newsSaved[caId] === null) {
          getTitlesByCgId(this.pageNo[caId], caId, "2022_06_30").then((res) => {
            this.newsPieces = res.data.data;
            this.newsPiecesSaved = this.newsSaved;
            this.newsPiecesSaved[caId] = this.newsPieces; //View组件改变data会重新初始化
            store.commit("ConvertNewsSaved", this.newsPiecesSaved); //异步函数问题，要把缓存放到异步函数中
          });
          this.pageNo[caId]++;
        } else {
          this.newsPieces = this.newsSaved[caId];
        }
      }
    },
  },
};
</script>
<style scoped>
.el-header {
  background-color: #4a2ac6;
  position: relative;
  height: 600px;
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
.insideButton {
  height: 270px;
  padding: 0;
  width: 200px;
}
.el-input {
  width: 90%;
  height: 250px;
}
.el-input /deep/ .el-input__inner {
  --el-input-inner-height: 250px;
  font-size: large;
}
.user {
  float: left;
}
.search {
  float: right;
}
.outside {
  font-size: 150px;
  color: white;
}
.inside {
  font-size: 125px;
}
.title {
  text-align: left;
  color: white;
  font-size: large;
}
.el-menu {
  background-color: #4a2ac6;
  height: 275px;
}
.el-menu-item {
  font-size: 100px;
}
.el-main {
  margin-top: 70px;
  height: 3250px;
  padding: 0%;
  overflow-y: hidden;
}
</style>
