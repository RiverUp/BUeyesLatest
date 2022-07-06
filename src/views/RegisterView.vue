<template>
  <div class="content">
    <Register />
  </div>
</template>

<script>
// @ is an alias to /src
//import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

export default {
  name: "ContentView",
  components: {
    Register,
  },
};
</script>
