<template>
  <div class="content">
    <NewsContent />
  </div>
</template>

<script>
// @ is an alias to /src
//import NewsContent from "@/components/NewsContent.vue";
import NewsContent from "@/components/NewsContent.vue";

export default {
  name: "ContentView",
  components: {
    NewsContent,
  },
};
</script>
