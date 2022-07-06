<template>
  <UserDrawer :drawerOrNot="drawer" />
  <el-container>
    <el-header>
      <el-button
        class="user"
        @dblclick="ShowUserInfo"
        @click="NoteUserInfo"
        id="10"
        value="用户信息"
      >
        <el-icon class="outside"><Expand /></el-icon>
      </el-button>
      <el-button
        class="search"
        @dblclick="OcrRecognize"
        @click="NoteOcr"
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
        id="12"
        value="语音交互"
      >
        <el-icon class="outside" v-if="sortOrSearch"><Microphone /></el-icon>
        <el-icon class="outside" v-else><Back /></el-icon>
      </el-button>
      <p class="title">BUeyes</p>
      <div class="menu" v-if="sortOrSearch">
        <el-menu
          :default-active="1"
          mode="horizontal"
          @select="ChangeToSelectedSort"
          text-color="white"
          active-text-color="purple"
        >
          <el-menu-item index="1" id="0">{{ sort[0] }}</el-menu-item>
          <el-menu-item index="2" id="1">{{ sort[1] }}</el-menu-item>
          <el-menu-item index="3" id="2">{{ sort[2] }}</el-menu-item>
          <el-menu-item index="4" id="3">{{ sort[3] }}</el-menu-item>
          <el-menu-item index="5" id="4">{{ sort[4] }}</el-menu-item>
        </el-menu>
        <el-menu
          :default-active="1"
          mode="horizontal"
          @select="ChangeToSelectedSort"
          text-color="white"
          active-text-color="purple"
        >
          <el-menu-item index="6" id="5">{{ sort[5] }}</el-menu-item>
          <el-menu-item index="7" id="6">{{ sort[6] }}</el-menu-item>
          <el-menu-item index="8" id="7">{{ sort[7] }}</el-menu-item>
          <el-menu-item index="9" id="8">{{ sort[8] }}</el-menu-item>
          <el-menu-item index="10" id="9">{{ sort[9] }}</el-menu-item>
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
  <div id="page1">
    <el-container>
      <el-main>
        <el-dialog
          v-model="focusOnTitle"
          title="新闻题目"
          width="90%"
          top="30vh"
        >
          <div class="titleFocused">
            <p class="certainTitle">{{ newsTitle }}</p>
          </div>
        </el-dialog>
        <el-scrollbar v-infinite-scroll="GetMoreNews">
          <div style="height: 100%" v-for="news in newsPieces" :key="news.id">
            <NewsCard
              :newsPiece="news"
              @dblclick="GoToNewsContent(news)"
              @click="ReadTitle(news)"
              ref="newspiece"
            />
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>
<script>
var time = null;
import { Expand, Microphone, Back, Camera } from "@element-plus/icons-vue";
import { getTitlesByCgId, getTitlesByKd } from "@/request/NewsController";
import NewsCard from "./NewsCard.vue";
import UserDrawer from "./UserDrawer.vue";
import router from "@/router/index";
import store from "@/store";
import { CameraTakePicture } from "@/tool/camera";
import { speech } from "@/tool/tts";
import Hammer from "hammerjs";
export default {
  name: "NewsHead",
  components: {
    Expand,
    Microphone,
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
      currentIndex: 0,
      tagNum: 12,
    };
  },
  mounted() {
    //第一次进入界面将每个类别的缓存都设为null
    this.currentFocus = document.getElementById(0);
    //speech(this.currentFocus.innerText);
    if (this.$route.name === "home" && this.newsSaved === null) {
      var i = 1;
      for (; i < 11; i++) {
        this.newsPiecesSaved[i] = null;
        this.pageNo[i] = 0;
      }
      getTitlesByCgId(this.pageNo[1], 1).then((res) => {
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
    //this.InitGesture();
  },
  methods: {
    NoteUserInfo() {
      clearTimeout(time);
      time = setTimeout(() => {
        speech("用户信息");
      }, 300);
    },
    ShowUserInfo() {
      clearTimeout(time);
      store.commit("InverseDrawer");
    },
    ChangeToSelectedSort(index) {
      var tag = document.getElementById(index - 1).innerText;
      speech(tag);
      router.push({
        name: "newsSort",
        params: {
          categoryId: index,
        },
      });
    },
    GetMoreNews() {
      var cgId;
      if (this.$route.name === "home") {
        cgId = 1;
      } else {
        cgId = this.$route.params.categoryId;
      }
      getTitlesByCgId(this.pageNo[cgId], cgId).then((res) => {
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
    NoteOcr() {
      clearTimeout(time);
      time = setTimeout(() => {
        speech("OCR识别");
      }, 300);
    },
    OcrRecognize() {
      clearTimeout(time);
      CameraTakePicture()
        .then((imageInfo) => {
          var photo = imageInfo;
          store.commit("UpLoadOcr", photo);
          router.push({ name: "ocr" });
        })
        .catch((error) => {
          console.error(error);
        });
      router.push({ name: "ocr" });
    },
    GoToNewsContent(news) {
      clearTimeout(time);
      speech("");
      store.commit("SavePageNo", this.pageNo);
      store.commit("ConvertNews", news);
      router.push({
        name: "news",
        params: {
          id: news.id,
        },
      });
    },
    ReadTitle(news) {
      clearTimeout(time);
      time = setTimeout(() => {
        var currentTitle = news.title;
        if (currentTitle === this.newsTitle) {
          speech("");
          this.newsTitle = "";
        } else {
          speech(news.title);
          this.newsTitle = news.title;
        }
      }, 300);
    },
    /*     HelpReadTitle(news) {
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
    },*/
    ReadConcreteTag() {
      var id = parseInt(this.currentFocus.id);
      if (id < 10) {
        speech(this.currentFocus.innerText);
      } else {
        speech(this.currentFocus.value);
      }
    },
    InitGesture() {
      var that = this;
      var hammers = new Hammer.Manager(document.getElementById("page1"));
      hammers.add(new Hammer.Tap({ event: "doubletap", taps: 2 }));
      // Single tap recognizer
      hammers.add(new Hammer.Tap({ event: "singletap" }));
      hammers.add(
        new Hammer.Swipe({
          event: "swiperight",
          direction: Hammer.DIRECTION_RIGHT,
        })
      ); //单指点击重读
      hammers.add(
        new Hammer.Swipe({
          event: "swiperightdouble",
          pointer: 2,
          direction: Hammer.DIRECTION_RIGHT,
        })
      ); //双指点击确认
      hammers.add(
        new Hammer.Swipe({
          event: "swipeleft",
          direction: Hammer.DIRECTION_LEFT,
        })
      );
      hammers.add(new Hammer.Press({ event: "pressdouble", pointer: 2 }));
      // we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
      hammers.get("doubletap").recognizeWith("singletap");
      // we only want to trigger a tap, when we don't have detected a doubletap
      hammers.get("singletap").requireFailure("doubletap");
      hammers.on("swiperight swipeleft", function (e) {
        console.log(e.type);
        switch (e.type) {
          case "swipeleft":
            that.NextFocus();
            break;
          case "swiperight":
            that.LastFocus();
            break;
          default:
            break;
        }
      });
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
      var focus = this.currentFocus;
      var idNext = (parseInt(focus.id) + 11) % this.tagNum;
      this.currentFocus = document.getElementById(idNext);
      this.ReadConcreteTag();
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
      speech("");
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
