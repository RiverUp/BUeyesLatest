<template>
  <div>
    <el-button type="primary" class="login_reg" @click="DrawerValueChange">
    open
    </el-button>
  </div>
  <div>
    <!--el-drawer用于确定当前抽屉是否是打开的，是一个model-value-->
    <el-drawer 
      v-model="drawer"
      size = '90%'
      :direction="direction"
      :show-close="false">
      <template class="e" #header="{avatar}">
        <el-header class="el-header">
          <el-avatar :class="el-avatar" :id="avatar" style="position:absolute; left: 30px; top:50px; width: 70px; height:70px; " src = "@../assets/user.png" ></el-avatar>
        </el-header>
      </template>
      <!--下面是收藏图标，没写完，因为显示不出来-->
      <template #body="{b,p}">
        <el-button class="el-button">
          <el-icon :id = "b"><CollectionTag /></el-icon>
          <p :id="p">收藏</p>
        </el-button>
      </template>
      <!--收藏-->
    </el-drawer>
  </div>
</template>

<script>
import { CollectionTag } from "@element-plus/icons-vue";

export default{
  name:"UserDrawer",
  components:{
    CollectionTag
  },
  data(){
    return{
      drawer: false,
      direction :"ltr"
    }
  },
  methods:{
    DrawerValueChange(){
      this.drawer = true;
    }
  }
}
</script>
<style scoped>
.el-header{
  background-color: #4a2ac6;
  position: relative;
  height: 900px;
  padding: 0 !important;
  width:90%;
}

/* 这里还是没能解决padding有白色空隙的问题 */
.el-header.el-drawer__header{
  padding:0 !important;
  margin: 0;
}

.e{
  margin-left:40px;
  margin-top:120px;
  /* flex-grow:unset;
  flex-shrink:; */
  flex-basis: 0%;
  height: 70px;
  width:70px;
}
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
</style>