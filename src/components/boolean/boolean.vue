<template>
  <label ref="label">
    <span class="label-text">
      <slot></slot>
    </span>
    <div class="c">
      <input type="checkbox" :checked="currentValue" @change="handleChange" />
    </div>
  </label>
</template>

<script>
import liMixin from "../mixin.js";

export default {
  name: "DatBoolean",
  data() {
    return {
      currentValue: this.checked ? true : false,
      liClassName: "cr boolean"
    };
  },
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    checked: Boolean
  },
  watch: {
    checked(val) {
      this.currentValue = val;
    }
  },
  mixins: [liMixin],
  methods: {
    handleChange() {
      this.currentValue = !this.currentValue;
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

.vue-dat-gui .cr.boolean {
  position: relative;
  border-left: $border-left-size solid $boolean-color;
  &:hover {
    background: #111;
  }
  label {
    cursor: pointer;
  }
}
</style>