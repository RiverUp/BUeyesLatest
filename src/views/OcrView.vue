<template>
  <div class="content">
    <TakeOcrPhoto />
  </div>
</template>

<script>
// @ is an alias to /src
//import TakeOcrPhoto from "@/components/TakeOcrPhoto.vue";
import TakeOcrPhoto from "@/components/TakeOcrPhoto.vue";

export default {
  name: "OcrView",
  components: {
    TakeOcrPhoto,
  },
};
</script>
