<template>
  <div class="home">
    <UserDrawer></UserDrawer>
  </div>
</template>

<script>
// @ is an alias to /src
import UserDrawer from "@/components/UserDrawer.vue";

export default {
  name: "HomeView",
  components: {
    UserDrawer,
  },
};
</script>
