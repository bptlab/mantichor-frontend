<template>
  <header>
    <div class="sidebar-header">
      <img alt="Mantichor logo" src="../assets/logo.svg">
    </div>
    <router-link to="/model">Model</router-link>
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

  .sidebar-header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;
    height: @element-size;
    width: @element-size;
    img {
      height: 30px;
      width: auto;
    }
  }

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
