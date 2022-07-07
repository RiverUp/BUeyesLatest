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
  <el-container @click="HelpRead">
    <el-main>
      <p>{{ content }}</p>
    </el-main>
  </el-container>
</template>
<script>
var time = null;
import store from "@/store";
import router from "@/router/index";
import { Back } from "@element-plus/icons-vue";
import { speech } from "@/tool/tts";
import { recognizeOcr } from "@/request/OCRController";
export default {
  name: "TakeOcrPhoto",
  components: {
    Back,
  },
  data() {
    return {
      reading: false,
      content: "",
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
      router.go(-1);
      speech("");
    },
    HelpRead() {
      if (!this.reading) {
        this.reading = !this.reading;
        speech(this.content);
      } else {
        this.reading = !this.reading;
        speech("");
      }
    },
  },
  mounted() {
    recognizeOcr(this.ocr).then((res) => {
      this.content = res.data.data;
    });
  },
  computed: {
    ocrSrc() {
      return "data:image/jpeg;base64," + store.state.ocrPicture;
    },
    ocr() {
      return store.state.ocrPicture;
    },
  },
  /* watch: {
    ocrSrc: function () {},
  }, */
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
