<template>
  <header>
    <router-link to="/model">Model</router-link>
    <router-link to="/execution">Execution</router-link>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue { }
</script>

<style lang="less">
@import "../styles.less";

header {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  height: @element-size;
  padding: 0;
  border-bottom: 4px solid @secondary;

  a {
    flex-grow: 1;
    font-weight: bold;
    color: #ffffff;
    height: @element-size;
    font-size: 1.2rem;
    line-height: @element-size;
    margin: 0 0 0 -1px;
    border-bottom: 4px solid @secondary;
    text-decoration: none;

    &.router-link-exact-active {
      color: @accent;
      border-bottom-color: @accent;
    }

    & > img {
      height: @element-size;
    }
  }
}
</style>
