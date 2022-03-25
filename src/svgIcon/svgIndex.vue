<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    let iconName = computed(() => `#icon-${props.name}`);
    let svgClass = computed(() => {
      console.log(props.name, "props.name");
      if (props.name) {
        return `svg-icon icon-${props.name}`;
      } else {
        return "svg-icon";
      }
    });
    return { iconName, svgClass };
  },
};
</script>

<style lang="scss">
.svg-icon {
  width: 5em;
  height: 5em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
