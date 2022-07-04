<template>
  <UserDrawer :drawerOrNot="drawer" />
  <div v-touch:swipe.right="LastFocus">
    <div v-touch:swipe.left="NextFocus">
      <el-container>
        <el-header>
          <el-button
            class="user"
            @click="ShowUserInfo"
            id="10"
            value="用户信息"
          >
            <el-icon class="outside"><Expand /></el-icon>
          </el-button>
          <el-button
            class="search"
            @click="OcrRecognize"
            color="#626aef"
            round
            id="11"
            value="图片识别"
          >
            <el-icon class="outside"><Camera /></el-icon>
          </el-button>
          <el-button
            class="search"
            @click="ShowSearchInput"
            color="#626aef"
            round
          >
            <el-icon class="outside" v-if="sortOrSearch"><Search /></el-icon>
            <el-icon class="outside" v-else><Back /></el-icon>
          </el-button>
          <p class="title">BUeyes</p>
          <div class="menu" v-if="sortOrSearch">
            <el-menu
              :default-active="1"
              mode="horizontal"
              @select="ChangeToSelectedSort(index)"
              text-color="white"
              active-text-color="purple"
              router="true"
            >
              <el-menu-item index="1" class="menu1" id="0">{{
                sort[0]
              }}</el-menu-item>
              <el-menu-item class="menu1" index="2" id="1">{{
                sort[1]
              }}</el-menu-item>
              <el-menu-item class="menu1" index="3" id="2">{{
                sort[2]
              }}</el-menu-item>
              <el-menu-item class="menu1" index="4" id="3">{{
                sort[3]
              }}</el-menu-item>
              <el-menu-item class="menu1" index="5" id="4">{{
                sort[4]
              }}</el-menu-item>
            </el-menu>
            <el-menu
              :default-active="1"
              mode="horizontal"
              @select="ChangeToSelectedSort(index)"
              text-color="white"
              active-text-color="purple"
              router="true"
            >
              <el-menu-item class="menu2" index="6" id="5">{{
                sort[5]
              }}</el-menu-item>
              <el-menu-item class="menu2" index="7" id="6">{{
                sort[6]
              }}</el-menu-item>
              <el-menu-item class="menu2" index="8" id="7">{{
                sort[7]
              }}</el-menu-item>
              <el-menu-item class="menu2" index="9" id="8">{{
                sort[8]
              }}</el-menu-item>
              <el-menu-item class="menu2" index="10" id="9">{{
                sort[9]
              }}</el-menu-item>
            </el-menu>
          </div>
          <el-input v-else v-model="searchInfo" placeholder="Please input">
            <template #prepend>
              <el-button class="insideButton" @click="SearchNews">
                <el-icon class="inside"><Search /></el-icon
              ></el-button>
            </template>
          </el-input>
        </el-header>
      </el-container>
      <el-container class="content">
        <el-main>
          <el-dialog
            v-model="focusOnTitle"
            title="新闻题目"
            width="90%"
            top="30vh"
            @close="BlurTitle"
          >
            <div class="titleFocused">
              <p class="certainTitle">{{ newsTitle }}</p>
            </div>
          </el-dialog>
          <el-scrollbar v-infinite-scroll="GetMoreNews">
            <div style="height: 100%" v-for="news in newsPieces" :key="news.id">
              <NewsCard
                :newsPiece="news"
                @click="HelpReadTitle(news)"
                @dblclick="GoToNewsContent(news)"
                id="newspiece"
              />
            </div>
          </el-scrollbar>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
var time = null;
import { Expand, Search, Back, Camera } from "@element-plus/icons-vue";
import { getTitlesByCgId, getTitlesByKd } from "@/request/NewsController";
import NewsCard from "./NewsCard.vue";
import UserDrawer from "./UserDrawer.vue";
import router from "@/router/index";
import store from "@/store";
import { CameraTakePicture } from "@/tool/camera";
import { speech, ReadTag } from "@/tool/tts";
export default {
  name: "NewsHead",
  components: {
    Expand,
    Search,
    Back,
    Camera,
    NewsCard,
    UserDrawer,
  },
  data() {
    return {
      sort: [
        "推荐",
        "体育",
        "财经",
        "娱乐",
        "国际",
        "教育",
        "教育",
        "教育",
        "教育",
        "教育",
      ],
      sortIndex: 0,
      newsPieces: [],
      newsPiecesSaved: [],
      sortOrSearch: true,
      searchInfo: "",
      pageNo: [],
      focusOnTitle: false,
      newsTitle: "",
      currentFocus: null, //当前焦点dom对象
      tagNum: 12,
    };
  },
  mounted() {
    //第一次进入界面将每个类别的缓存都设为null
    this.currentFocus = document.getElementById(0);
    speech.speak({
      text: this.currentFocus.innerText,
      queue: false,
    });
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
    ShowUserInfo() {
      store.commit("InverseDrawer");
    },
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
      getTitlesByKd("2022_06_30", this.searchInfo).then((res) => {
        this.newsPieces = res.data.data;
      });
    },
    OcrRecognize() {
      CameraTakePicture();
    },
    GoToNewsContent(news) {
      clearTimeout(time);
      store.commit("SavePageNo", this.pageNo);
      store.commit("ConvertNews", news);
      router.push({
        name: "news",
        params: {
          id: news.id,
        },
      });
    },
    HelpReadTitle(news) {
      clearTimeout(time);
      time = setTimeout(() => {
        if (this.newsTitle === news.title) {
          if (speech.paused()) {
            speech.resume();
          } else {
            speech.pause();
          }
        } else {
          speech.cancel();
          speech.speak({ text: news.title, queue: false });
        }
        this.newsTitle = news.title;
      }, 300);
    },
    ReadConcreteTag() {
      ReadTag(this.currentFocus.innerText);
    },
    NextFocus() {
      console.log("调用next");
      var focus = this.currentFocus;
      var idNext = (parseInt(focus.id) + 1) % this.tagNum;
      this.currentFocus = document.getElementById(idNext);
      this.ReadConcreteTag();
    },
    LastFocus() {
      console.log("调用last");
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
      speech.cancel();
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
  width: 275px;
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
  height: 8vw;
}
.el-menu-item {
  font-size: 100px;
  width: 18%;
}
.el-main {
  margin-top: 70px;
  height: 3250px;
  padding: 0%;
  overflow-y: hidden;
}
</style>
<style>
.el-dialog {
  background-color: rgb(246, 246, 198);
  --el-dialog-content-font-size: x-large;
  --el-dialog-title-font-size: large;
  font-weight: bold;
}
.el-dialog .el-dialog__header {
  padding-top: 7vw;
}
.certainTitle {
  text-align: left;
  margin-top: 50px;
  color: #000;
}
</style>
