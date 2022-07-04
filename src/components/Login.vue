<template>
  <div class="user">
    <Expand>
      <!--更改了图片位置-->
      <el-avatar
        v-if="pictured"
        style="text-align: center"
        :src="src"
        @click="Recognize"
      ></el-avatar>
      <el-avatar v-else style="text-align: center" @click="TakePicture"
        >点击进行人脸识别登录</el-avatar
      >
    </Expand>
  </div>
  <div style="text-align: center">
    <el-button type="primary" class="login_reg" @click="Recognize"
      ><strong>登录</strong></el-button
    >
  </div>

  <div style="text-align: center">
    <el-button type="primary" class="login_reg" @click="Register"
      ><strong>注册</strong></el-button
    >
  </div>
</template>
<script>
//import写在这里
//import { Expand } from "@element-plus/icons-vue";
//import { getTitlesByCgId } from "@/request/NewsController";
import { CameraTakePicture } from "@/tool/camera";
import router from "@/router/index";
import store from "@/store";
export default {
  name: "UserFace",
  data() {
    return {
      //最终传回一张用户图片
      photo: "",
      src: "", //基于图片的base64编码的图片源
      pictured: false, //是否拍摄了照片
    };
  },
  methods: {
    TakePicture() {
      CameraTakePicture()
        .then((imageInfo) => {
          this.photo = imageInfo;
        })
        .catch((error) => {
          console.error(error);
        });
      this.src = "data:image/jpeg;base64," + this.photo;
    },
    Recognize() {
      // 调用接口验证
      var success = true;
      if (success) {
        store.commit("UpLoadFace", this.photo);
        router.push({ name: "home" });
      }
    },
  },
  mounted() {
    document.body.style.backgroundColor = "#FFFED6";
  },
};
</script>
<!-- 下面是一些关于 图形设计 的代码 -->
<style scoped>
.login_reg {
  border-radius: 50px;
  font-size: 90px;
  letter-spacing: 40px;
  height: 200px;
  padding: 0;
  width: 1000px;
  margin-block: 100px;
  background-color: #4a2ac6;
  border: 0px;
  text-align: center;
}
.el-avatar {
  height: 1200px;
  width: 1200px;
  margin-block: 200px;
  margin-top: 600px;
  /* border: 100px;
  border-color :black; */
  font-size: large;
  font-weight: bold;
}
</style>
