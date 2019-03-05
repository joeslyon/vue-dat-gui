<template>
  <label ref="label">
    <span class="label-text">
      <slot></slot>
    </span>
    <div class="c">
      <input type="text" :value="bgColor" ref="inputField" :style="{'background-color':bgColor,color:borderColor,'text-shadow':inputTextShadow}" @keydown="handleKeyDown" @blur="handleBlur" />
      <div class="selector" ref="selector" @mousedown="handleSelector" @touchstart="handleSelector">
        <div class="field-knob" :style="{'margin-top':fieldMarginTop,'margin-left':fieldMarginLeft,'background-color':bgColor,'border-color':borderColor}" @mousedown="fieldDown" @touchstart="fieldDown">
        </div>
        <div class="saturation-field" ref="saturationField">
          <div class="valueField" ref="valueField" @mousedown="fieldDown" @touchstart="fieldDown">
          </div>
        </div>
        <div class="hue-field" ref="hueField" @mousedown="fieldDownH" @touchstart="fieldDownH">
          <div class="hue-knob" :style="{'margin-top':hueMarginTop}"></div>
        </div>
      </div>
    </div>
  </label>
</template>

<script>
import liMixin from "../mixin.js";
import Color from "./lib/Color";
import interpret from "./lib/interpret";
import common from "../../utils/common";
import dom from "../../utils/dom";

const vendors = ["-moz-", "-o-", "-webkit-", "-ms-", ""];

export default {
  name: "DatColor",
  data() {
    return {
      liClassName: "cr color",
      current: this.color,
      currentColor: new Color(this.color),
      setCurrentDebounced: common.debounce(function(val) {
        this.current = val;
      }, 20)
    };
  },
  computed: {
    flip() {
      const _flip =
        this.currentColor.v < 0.5 || this.currentColor.s > 0.5 ? 255 : 0;
      return _flip;
    },
    inputTextShadow() {
      let _f = 255 - this.flip;
      return "0 1px 1px " + "rgb(" + _f + "," + _f + "," + _f + ")";
    },
    fieldMarginTop() {
      return 100 * (1 - this.currentColor.v) - 7 + "px";
    },
    fieldMarginLeft() {
      return 100 * this.currentColor.s - 7 + "px";
    },
    bgColor() {
      let __color = this.currentColor.toHexString();
      if (this.$_liElement) {
        this.$_liElement.style.borderLeftColor = __color;
      }
      return __color;
    },
    borderColor() {
      let _f = this.flip;
      return "rgb(" + _f + "," + _f + "," + _f + ")";
    },
    hueMarginTop() {
      return (1 - this.currentColor.h / 360) * 100 + "px";
    }
  },
  model: {
    prop: "color",
    event: "change"
  },
  props: {
    color: {
      required: true
    }
  },
  mixins: [liMixin],
  watch: {
    color(val) {
      this.current = val;
    },
    current(val, old) {
      try {
        this.currentColor = new Color(val);
      } catch (ex) {}
      this.linearGradient(
        this.$refs.saturationField,
        "left",
        "#fff",
        this.getCopy()
      );
      this.$emit("change", val);
    }
  },
  methods: {
    linearGradient(elem, x, a, b) {
      elem.style.background = "";
      common.each(vendors, function(vendor) {
        elem.style.cssText +=
          "background: " +
          vendor +
          "linear-gradient(" +
          x +
          ", " +
          a +
          " 0%, " +
          b +
          " 100%); ";
      });
    },
    hueGradient() {
      let elem = this.$refs.hueField;
      elem.style.background = "";
      common.each(vendors, function(vendor) {
        elem.style.cssText +=
          "background: " +
          vendor +
          "linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);";
      });
    },
    handleBlur() {
      let _inputField = this.$refs.inputField;
      let val = _inputField.value;
      if (val === this.currentColor.toHexString()) return;

      try {
        val = JSON.parse(val); //尝试将字符串转为数组或对象
      } catch (ex) {}
      const i = interpret(val);
      if (i !== false) {
        let __temp = new Color(0);
        __temp.__state = i;
        this.current = this.getOrginal(__temp);
      } else {
        _inputField.value = this.currentColor.toHexString();
      }
    },
    handleSelector() {
      let __selector = this.$refs.selector;
      dom.addClass(__selector, "drag").bind(window, "mouseup", function() {
        dom.removeClass(__selector, "drag");
      });
    },
    handleKeyDown(e) {
      if (e.keyCode === 13) {
        this.handleBlur();
      }
    },
    fieldDown(e) {
      let that = this;
      that.setSV(e);
      dom.bind(window, "mousemove", that.setSV);
      dom.bind(window, "touchmove", that.setSV);
      dom.bind(window, "mouseup", that.fieldUpSV);
      dom.bind(window, "touchend", that.fieldUpSV);
    },
    fieldDownH(e) {
      let that = this;
      that.setH(e);
      dom.bind(window, "mousemove", that.setH);
      dom.bind(window, "touchmove", that.setH);
      dom.bind(window, "mouseup", that.fieldUpH);
      dom.bind(window, "touchend", that.fieldUpH);
    },
    fieldUpSV() {
      let that = this;
      dom.unbind(window, "mousemove", that.setSV);
      dom.unbind(window, "touchmove", that.setSV);
      dom.unbind(window, "mouseup", that.fieldUpSV);
      dom.unbind(window, "touchend", that.fieldUpSV);
    },
    fieldUpH() {
      let that = this;
      dom.unbind(window, "mousemove", that.setH);
      dom.unbind(window, "touchmove", that.setH);
      dom.unbind(window, "mouseup", that.fieldUpH);
      dom.unbind(window, "touchend", that.fieldUpH);
    },
    setSV(e) {
      let that = this;
      if (e.type.indexOf("touch") === -1) {
        e.preventDefault();
      }

      const fieldRect = that.$refs.saturationField.getBoundingClientRect();
      const { clientX, clientY } = (e.touches && e.touches[0]) || e;
      let s = (clientX - fieldRect.left) / (fieldRect.right - fieldRect.left);
      let v =
        1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);

      if (v > 1) {
        v = 1;
      } else if (v < 0) {
        v = 0;
      }

      if (s > 1) {
        s = 1;
      } else if (s < 0) {
        s = 0;
      }

      that.currentColor.v = v;
      that.currentColor.s = s;
      that.setCurrentDebounced(that.currentColor.toOriginal());

      return false;
    },
    setH(e) {
      let that = this;
      if (e.type.indexOf("touch") === -1) {
        e.preventDefault();
      }

      const fieldRect = that.$refs.hueField.getBoundingClientRect();
      const { clientY } = (e.touches && e.touches[0]) || e;
      let h =
        1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);

      if (h > 1) {
        h = 1;
      } else if (h < 0) {
        h = 0;
      }

      that.currentColor.h = h * 360;
      that.setCurrentDebounced(that.currentColor.toOriginal());

      return false;
    },
    getCopy() {
      let __temp = new Color(0);
      common.extend(__temp.__state, this.currentColor.__state);
      __temp.s = 1;
      __temp.v = 1;
      return __temp.toHexString();
    },
    getOrginal(color) {
      if (color.a === undefined) color.a = this.currentColor.a;
      return this.currentColor.__state.conversion.write(color);
    }
  },
  mounted() {
    this.$_checkParentNode();
    this.hueGradient();
    this.linearGradient(this.$refs.valueField, "top", "rgba(0,0,0,0)", "#000");
    this.currentColor = new Color(this.current);
    this.linearGradient(
      this.$refs.saturationField,
      "left",
      "#fff",
      this.getCopy()
    );
  }
};
</script>

<style lang="scss">
@import "~../../assets/base.scss";

.vue-dat-gui .cr.color {
  border-left: $border-left-size solid $background-color;

  input[type="text"] {
    text-align: center;
    font-weight: bold;
    width: 100%;
  }

  .c:hover .selector,
  .selector.drag {
    display: block;
  }

  .selector {
    display: none;
    width: 122px;
    padding: 3px;
    background-color: #222;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 10;
    margin-top: -3px;

    .field-knob {
      width: 12px;
      height: 12px;
      position: absolute;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);
      border-radius: 12px;
      border: 2px solid #fff;
      cursor: pointer;
      z-index: 1;
    }

    .saturation-field {
      width: 100px;
      height: 100px;
      border: 1px solid #555;
      margin-right: 3px;
      cursor: pointer;

      .valueField {
        width: 100%;
        height: 100%;
        background: none;
      }
    }

    .hue-field {
      width: 15px;
      height: 100px;
      border: 1px solid #555;
      cursor: ns-resize;
      top: 3px;
      right: 3px;
      position: absolute;

      .hue-knob {
        width: 15px;
        height: 2px;
        border-right: 4px solid #fff;
        position: absolute;
        z-index: 1;
        top: -3px;
      }
    }
  }
}
</style>