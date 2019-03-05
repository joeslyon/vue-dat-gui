<template>
  <label ref="label">
    <span class="label-text">
      <slot></slot>
    </span>
    <div ref="content" class="c">
      <slider v-show="hasSlider" :min="minValue" :max="maxValue" :width="sliderWidth" :value="currentValue" @updateState="applyConstraints">
      </slider>
      <input type="number" ref="input" :min="minValue" :max="maxValue" :step="stepValue" inputMode="numeric" v-model="currentValue" :style="{'width':inputWidth+'px'}" @change="handleChange" @focus="handleFocus" @blur="handleBlur" />
    </div>
  </label>
</template>

<script>
import liMixin from "../mixin.js";
import Slider from "./slider";
import common from "../../utils/common";

export default {
  name: "DatNumber",
  components: { Slider },
  data() {
    return {
      currentValue: 0,
      maxValue: this.max === undefined ? Number.POSITIVE_INFINITY : this.max,
      minValue: this.min === undefined ? Number.NEGATIVE_INFINITY : this.min,
      liClassName: "cr number",
      inputWidth: 0,
      sliderWidth: 0
    };
  },
  computed: {
    hasSlider() {
      if (!this.showSlider) return false;
      if (!isFinite(this.maxValue) || !isFinite(this.minValue)) return false;
      return true;
    }
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = common.toNumber(val);
      },
      immediate: true
    }
  },
  mixins: [liMixin],
  props: {
    showSlider: {
      type: Boolean,
      default: true
    },
    min: Number,
    max: Number,
    step: Number,
    value: {
      type: [Number, String],
      required: true
    },
    width: Number
  },
  model: {
    prop: "value",
    event: "change"
  },
  methods: {
    stepValue() {
      if (!this.step) {
        let _val = this.maxValue - this.minValue;
        return (
          Math.pow(10, Math.floor(Math.log(Math.abs(_val)) / Math.LN10)) / 10
        );
      }
      return common.toNumber(this.step);
    },
    applyConstraints(val) {
      const [min, max, step] = [this.minValue, this.maxValue, this.step];
      const [hasMin, hasMax, hasStep] = [
        isFinite(min),
        isFinite(max),
        isFinite(step)
      ];
      let [isMin, isMax] = [false, false];

      val = common.toNumber(val);

      if (hasMin && val <= min) {
        val = min;
        isMin = true;
      }

      if (hasMax && val >= max) {
        val = max;
        isMax = true;
      }

      if (!isMin && !isMax) {
        if (hasStep) {
          let _step = this.stepValue();
          if (_step !== 0) val = Math.round(val / _step) * _step;
        }
      }
      this.currentValue = val;
      this.$emit("change", val);
    },
    handleBlur(evt) {
      this.emitChange(evt.target.value);
      document.removeEventListener("keydown", this.handleKeyDown);
      window.getSelection().removeAllRanges();
    },
    handleChange(evt) {
      this.emitChange(evt.target.value);
    },
    handleFocus() {
      document.addEventListener("keydown", this.handleKeyDown);
    },
    handleKeyDown(evt) {
      const key = evt.keyCode || evt.which;

      if (key === 13) {
        this.applyConstraints(this.$refs.input.value);
      }
    },
    emitChange(val) {
      this.applyConstraints(val);
    }
  },
  mounted() {
    this.$_checkParentNode();
    let _max = common.toNumber(this.maxValue);
    let _min = common.toNumber(this.minValue);
    if (_max <= _min) {
      [_min, _max] = [_max, _min];
    }
    [this.minValue, this.maxValue] = [_min, _max];
    let controlsWidth = this.$refs.content.clientWidth;
    if (this.hasSlider) {
      this.inputWidth =
        this.width > 0 ? this.width : Math.round(controlsWidth / 3);
      this.sliderWidth = controlsWidth - this.inputWidth;
    } else {
      this.inputWidth = controlsWidth;
    }
  }
};
</script>

<style lang="scss">
@import "~../../assets/base.scss";

.vue-dat-gui .cr.number {
  border-left: $border-left-size solid $number-color;

  .c {
    display: inline-flex;
  }

  input[type="number"] {
    color: $number-color;

    &:hover {
      background: lighten($input-color, $hover-lighten);
    }
    &:focus {
      background: lighten($input-color, $active-lighten);
      color: #fff;
    }
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>