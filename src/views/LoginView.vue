<template>
  <div class="content">
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
//import Login from "@/components/Login.vue";
import Login from "@/components/Login.vue";

export default {
  name: "ContentView",
  components: {
    Login,
  },
};
</script>
