<template>
  <el-container>
    <el-header>
      <el-button class="back" @dblclick="GoBack" @click="NoteBack">
        <el-icon><Back /></el-icon>
      </el-button>
    </el-header>
  </el-container>
  <el-container>
    <el-image :src="ocrSrc" :fit="contain" />
  </el-container>
  <el-container>
    <el-main v-html="content" @click="HelpRead"> </el-main>
  </el-container>
</template>
<script>
var time = null;
import store from "@/store";
import router from "@/router/index";
import { recognizeOcr } from "@/request/OCRController";
import { Back } from "@element-plus/icons-vue";
import { speech } from "@/tool/tts";
export default {
  name: "TakeOcrPhoto",
  components: {
    Back,
  },
  data() {
    return {
      content: "",
      reading: false,
    };
  },
  methods: {
    NoteBack() {
      clearTimeout(time);
      time = setTimeout(() => {
        speech("返回");
      }, 300);
    },
    GoBack: function () {
      clearTimeout(time);
      //speech.cancel();
      router.go(-1);
    },
    HelpRead() {
      if (!this.reading) {
        this.reading = !this.reading;
        speech(this.newsConverted.content);
      } else {
        this.reading = !this.reading;
        speech("");
      }
    },
  },
  mounted() {
    //var info = store.state.ocrPicture;
    recognizeOcr(this.ocrInfo).then((res) => {
      this.content = res.data.data;
      this.reading = true;
      speech(this.content);
    });
  },
  computed: {
    ocrSrc() {
      return "data:image/jpeg;base64," + store.state.ocrPicture;
    },
    ocrInfo() {
      return store.state.ocrPicture;
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
.el-image {
  width: 100%;
  height: 40%;
}
.el-main {
  padding: 75px;
  line-height: 150px;
  height: 2700px;
  text-align: left;
}
</style>
