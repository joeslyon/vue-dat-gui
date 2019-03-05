import $__dom from "../utils/dom";

export default {
  data() {
    return {
      $_liElement: null
    };
  },
  methods: {
    $_checkParentNode() {
      let _liClassName = this.liClassName;
      let _dom = this.$refs.label;
      let $_node = _dom.parentNode;
      if ($_node && $_node.nodeType === Node.ELEMENT_NODE) {
        if ($_node.tagName !== "LI") {
          let ele = document.createElement("li");
          ele.className = _liClassName;
          $_node.insertBefore(ele, _dom);
          $_node.removeChild(_dom);
          ele.appendChild(_dom);
          this.$_liElement = ele;
        } else {
          $__dom.addClass($_node, _liClassName);
          this.$_liElement = $_node;
        }
      }
    }
  }
};
