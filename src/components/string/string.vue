<template>
  <label ref="label">
    <span class="label-text">
      <slot></slot>
    </span>
    <div class="c">
      <input type="text" :value="currentValue" @change="handleChange" @keyup="handleChange" />
    </div>
  </label>
</template>

<script>
import liMixin from "../mixin.js";

export default {
  name: "DatString",
  data() {
    return {
      currentValue:
        this.value === undefined || this.value === null ? "" : this.value,
      liClassName: "cr string"
    };
  },
  model: {
    prop: "value",
    event: "change"
  },
  props: ["value"],
  watch: {
    value(val) {
      this.currentValue = val;
    }
  },
  mixins: [liMixin],
  methods: {
    handleChange(evt) {
      this.currentValue = evt.target.value;
      this.$emit("change", this.currentValue);
    }
  },
  mounted() {
    this.$_checkParentNode();
  }
};
</script>

<style lang="scss">
@import "~@/assets/base.scss";

.vue-dat-gui .cr.string {
  border-left: $border-left-size solid $string-color;

  input[type="text"] {
    color: $string-color;
    width: 100%;

    &:hover {
      background: lighten($input-color, $hover-lighten);
    }
    &:focus {
      background: lighten($input-color, $active-lighten);
      color: #fff;
    }
  }
}
</style>