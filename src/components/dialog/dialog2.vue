<template>
  <div class="pop-model custom-compare">
    <div class="custom-compare-header" @mousedown="popMousedown">
      <span>自定义对比</span>
      <i class="icon pop-close" @click="closePop"></i>
    </div>
    <div class="custom-compare-content">

    </div>
  </div>
</template>

<script>

import DragPop from "@/api/mixins/dragPop";

export default {
  mixins: [DragPop],
  components: {

  },
  data() {
    return {
    };
  },
  mounted() { },
  computed: {

  },
  watch: {

  },
  methods: {
    closePop() { 
      
    },
    popMousedown(e) {
      this.dragPopover(e, ".pop-model", ".custom-compare-header");
    },
  }
};
</script>

<style scoped>
.pop-model.custom-compare {
  height: 400px;
  width: 600px;
}

.custom-compare-header {
  height: 36px;
  line-height: 36px;
  background: linear-gradient(90deg, #3a5dab, #3a77ab);
  color: #fff;
  margin-bottom: 0;
  padding: 0 10px;
  font-size: 16px;
  border-radius: 4px 4px 0 0;
}

.custom-compare-content {
  position: relative;
  height: 324px;
  background: #f0f0f0;
}

</style>