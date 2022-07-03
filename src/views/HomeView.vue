<template>
  <div class="home">
    <NewsTitle />
  </div>
</template>

<script>
// @ is an alias to /src
import NewsTitle from "@/components/NewsTitle.vue";

export default {
  name: "HomeView",
  components: {
    NewsTitle,
  },
};
</script>
