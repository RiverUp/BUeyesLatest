<template>
  <el-container>
    <el-header>
      <el-button class="back" @click="GoBack">
        <el-icon><Back /></el-icon>
      </el-button>
    </el-header>
  </el-container>
  <el-container>
    <el-image src="ocrSrc" :fit="contain" />
    <p>{{ content }}</p>
  </el-container>
</template>
<script>
import store from "@/store";
export default {
  name: "TakeOcrPhoto",
  computed: {
    ocrSrc() {
      return store.state.ocrPicture;
    },
    content() {
      return store.state.recognizedContent;
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
</style>
