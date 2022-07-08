<template>
  <div class="login">
    <div class="user">
      <Expand>
        <!--更改了图片位置-->
        <el-avatar
          v-if="pictured"
          style="text-align: center"
          :src="src"
          @click="Recognize"
        ></el-avatar>
        <el-avatar
          v-else
          style="text-align: center"
          @dblclick="Recognize"
          @click="NoteLog"
          >请进行人脸识别登录</el-avatar
        >
      </Expand>
    </div>
    <div style="text-align: center">
      <el-button
        type="primary"
        class="login_reg"
        @dblclick="Recognize"
        @click="NoteLog"
        ><strong>登录</strong></el-button
      >
    </div>

    <div style="text-align: center">
      <el-button
        type="primary"
        class="register_reg"
        @dblclick="Register"
        @click="NoteRegister"
        ><strong>注册</strong></el-button
      >
    </div>
  </div>
</template>
<script>
var time = null;
import store from "@/store";
import router from "@/router/index";
import { register } from "@/request/UserController";
import { GetFacePicture } from "@/tool/camera";
import { speech } from "@/tool/tts";
export default {
  name: "LoginPage",
  methods: {
    NoteLog() {
      clearTimeout(time);
      time = setTimeout(() => {
        speech("登录");
      }, 300);
    },
    Recognize() {
      clearTimeout(time);
      GetFacePicture()
        .then((imageInfo) => {
          console.log(imageInfo);
          store.commit("UpLoadFace", imageInfo);
          store.commit("StoreUserId", 13415);
          router.push({ name: "home" });
          speech("登录成功");
          /* login(photo).then((res) => {
            const rw = res.data.msg;
            speech(rw);
            if (rw === "登录成功") {  
              store.commit("StoreUserId", res.data.data);
              router.push({ name: "home" });
            } //else {}
          }); */
        })
        .catch((error) => {
          console.error(error);
        });
    },
    NoteRegister() {
      clearTimeout(time);
      time = setTimeout(() => {
        speech("注册");
      }, 300);
    },
    Register() {
      clearTimeout(time);
      //调用注册接口直接跳转
      GetFacePicture()
        .then((imageInfo) => {
          var photo = imageInfo;
          register(photo).then((res) => {
            const rw = res.data.msg;
            if (rw === "注册成功") {
              store.commit("UpLoadFace", photo);
              store.commit("StoreUserId", res.data.data);
              router.push({ name: "home" });
            } //else {}
            speech(rw);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<!-- 下面是一些关于 图形设计 的代码 -->
<style scoped>
.login {
  background-color: #fffed6;
}
.login_reg {
  border-radius: 50px;
  font-size: 90px;
  letter-spacing: 40px;
  height: 200px;
  padding: 0;
  width: 1000px;
  margin-block: 100px;
  margin: 150px;
  margin-top: 250px;
  background-color: #4a2ac6;
  border: 0px;
  text-align: center;
}
.register_reg {
  border-radius: 50px;
  font-size: 90px;
  letter-spacing: 40px;
  height: 200px;
  padding: 0;
  width: 1000px;
  margin-block: 100px;
  margin: 150px;
  background-color: #4a2ac6;
  border: 0px;
  text-align: center;
  margin-bottom: 1200px;
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
