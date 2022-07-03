<template>
  <div class="user">
    <Expand>
        <!--更改了图片位置-->
        <el-avatar style="text-align: center;" src = "@../assets/user.png"></el-avatar>
    </Expand>
  </div>
  <div style="text-align: center">
    <el-button type="primary" class="login_reg" @click="PlayLoginInfo"
      ><strong>登录</strong></el-button
    >
  </div>

  <div style="text-align: center">
    <el-button type="primary" class="login_reg" @click="PlayRegisterIfo"
      ><strong>注册</strong></el-button
    >
  </div>
</template>
<script>
//import写在这里
//import { Expand } from "@element-plus/icons-vue";
//import { getTitlesByCgId } from "@/request/NewsController";
export default {
  name: "UserFace",
  data() {
    return {
      form: {
        //最终传回一张用户图片
        photo: "",
      },
    };
  },
  mounted() {
    document.body.style.backgroundColor = "#FFFED6";
  },
  methods: {},
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
}
</style>
