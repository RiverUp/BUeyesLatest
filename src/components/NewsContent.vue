<template>
  <el-container>
    <el-header>
      <el-button class="back" @click="GoBack">
        <el-icon><Back /></el-icon>
      </el-button>
      <el-button class="heart" @click="Collect">
        <el-icon v-if="collectOrNot"><StarFilled /></el-icon>
        <el-icon v-else><StarOutlined /></el-icon>
      </el-button>
      <el-button class="heart" @click="Like">
        <el-icon v-if="likeOrNot"><HeartFilled /></el-icon>
        <el-icon v-else><HeartOutlined /></el-icon>
      </el-button>
      <p class="title">Text Conent</p>
    </el-header>
  </el-container>
  <el-container>
    <NewsCard :newsPiece="newsConverted" />
  </el-container>
  <el-container>
    <el-main v-html="newsConverted.content" @click="HelpReadTitle"> </el-main>
  </el-container>
</template>
<script>
import store from "@/store";
import { Back } from "@element-plus/icons-vue";
import {
  HeartOutlined,
  StarOutlined,
  HeartFilled,
  StarFilled,
} from "@ant-design/icons-vue";
import NewsCard from "./NewsCard.vue";
import router from "@/router/index";
import {
  like,
  collect,
  cancelLike,
  cancelCollection,
  click,
} from "@/request/UserActionController";
import { HelpRead, speech } from "@/tool/tts";
export default {
  name: "NewsContent",
  data() {
    return {
      likeOrNot: false,
      collectOrNot: false,
      enterTime: Date.now(),
    };
  },
  components: {
    NewsCard,
    Back,
    HeartOutlined,
    StarOutlined,
    HeartFilled,
    StarFilled,
  },
  beforeUnmount() {
    var timeOnPage = (Date.now() - this.enterTime) / 1000;
    click(this.enterTime, this.newsConverted.id, timeOnPage, this.userId);
  },
  methods: {
    GoBack: function () {
      speech.cancel();
      router.go(-1);
    },
    Like() {
      this.likeOrNot = !this.likeOrNot;
      if (this.likeOrNot) {
        like(this.userId, this.newsConverted.id);
      } else {
        cancelLike(this.userId, this.newsConverted.id);
      }
    },
    Collect() {
      this.collectOrNot = !this.collectOrNot;
      if (this.collectOrNot) {
        collect(this.userId, this.newsConverted.id);
      } else {
        cancelCollection(this.userId, this.newsConverted.id);
      }
    },
    HelpReadTitle() {
      HelpRead(this.newsConverted.content);
    },
  },
  computed: {
    newsConverted() {
      return store.state.news;
    },
    userId() {
      return store.state.userId;
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
  text-align: left;
}
</style>
