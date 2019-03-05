<template>
  <span ref="slider" class="slider" :style="{width:width+'px','background-size':bgWidth+'% 100%'}" @click="handleClick" @mousedown="handleMouseDown" />
</template>

<script>
import common from "../../utils/common";
import dom from "../../utils/dom";

export default {
  name: "Slider",
  data() {
    return {
      currentValue: 0
    };
  },
  props: {
    value: [Number, String],
    min: Number,
    max: Number,
    width: Number
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = common.toNumber(val);
      },
      immediate: true
    }
  },
  computed: {
    bgWidth() {
      return common.clamp(
        (this.currentValue - this.min) * 100 / (this.max - this.min),
        0,
        100
      );
    }
  },
  methods: {
    handleClick(evt) {
      evt.preventDefault();
    },
    handleMouseDown(evt) {
      this.updateState(evt.pageX);

      dom.bind(window, "mousemove", this.handleMouseMove);
      dom.bind(window, "mouseup", this.handleMouseUp);
    },
    handleMouseMove(evt) {
      this.updateState(evt.pageX);

      event.preventDefault();
    },
    handleMouseUp(evt) {
      this.updateState(evt.pageX);

      dom.unbind(window, "mousemove", this.handleMouseMove);
      dom.unbind(window, "mouseup", this.handleMouseUp);
    },
    updateState(pageX) {
      const rect = this.$refs.slider.getBoundingClientRect();
      const x = pageX - rect.left;
      const w = rect.right - rect.left;
      const val = this.min + common.clamp(x / w, 0, 1) * (this.max - this.min);

      this.$emit("updateState", val);
    }
  }
};
</script>

<style lang="scss">
@import "~../../assets/base.scss";

.vue-dat-gui .slider {
  display: block;
  position: relative;
  border: 1px solid $background-color;
  background-color: $input-color;
  background-image: linear-gradient(90deg, $number-color, $number-color);
  background-size: 0% 100%;
  background-repeat: no-repeat;
  cursor: ew-resize;
  height: 25px;
}
</style>