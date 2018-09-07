<template>
    <div ref="label" class="dg">
        <div class='title' @click="handleClick">
            {{title}}
        </div>
        <ul>
            <slot></slot>
        </ul>
    </div>
</template>

<script>
import liMixin from "../mixin.js";
import dom from "@/utils/dom";

export default {
  name: "DatFolder",
  data() {
    return {
      close: this.closed ? true : false
    };
  },
  computed: {
    liClassName() {
      if (this.close) return "folder closed";
      return "folder";
    }
  },
  props: {
    title: String,
    closed: Boolean
  },
  mixins: [liMixin],
  methods: {
    handleClick() {
      this.close = !this.close;
      let _li = this.$refs.label.parentNode;
      if (this.close) {
        dom.addClass(_li, "closed");
      } else {
        dom.removeClass(_li, "closed");
      }
    }
  },
  mounted() {
    this.$_checkParentNode();
  }
};
</script>

<style lang="scss">
@import "~@/assets/base.scss";

.vue-dat-gui li.folder {
  display: block;
  padding: 0;

  .title {
    font-weight: bold;
    user-select: none;
    display: block;
    cursor: pointer;
    padding: 5px 5px 5px 16px;
    background: $folder-open;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  ul {
    margin-left: $nest-margin;
    width: calc(100% - #{$nest-margin});
  }

  &.closed {
    .title {
      background: $folder-closed;
    }
    ul {
      display: none;
    }
  }  
}
</style>