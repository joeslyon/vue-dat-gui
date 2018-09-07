<template>
  <label ref="label">
    <span class="label-text">
      <slot></slot>
    </span>
    <div class="c">
      <select :value="currentValue" @change="handleChange">
        <option v-for="(val,index) in items" :key="index" :value="val">{{val}}</option>
      </select>
    </div>
  </label>
</template>

<script>
import liMixin from "../mixin.js";

export default {
  name: "DatSelect",
  data() {
    return {
      currentValue:
        this.value === undefined || this.value === null ? "" : this.value,
      liClassName: "cr select"
    };
  },
  model: {
    prop: "value",
    event: "change"
  },
  props: ["value", "items"],
  watch: {
    value(val) {
      this.currentValue =
        this.value === undefined || this.value === null ? "" : this.value;
    }
  },
  mixins: [liMixin],
  methods: {
    handleChange(evt) {
      this.$emit("change", evt.target.value);
    }
  },
  mounted() {
    this.$_checkParentNode();
  }
};
</script>

<style lang="scss">
@import "~@/assets/base.scss";

.vue-dat-gui .cr.select {
  border-left: $border-left-size solid $select-color;

  select {
    width: 100%;
  }
}
</style>