<template>
  <header>
    <router-link to="/landing">
      <div class="sidebar-header">
        <img alt="Mantichor logo" src="../assets/logo.svg">
      </div>
    </router-link>
    <router-link to="/account-manager">
      <div class="sidebar-header">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="30" fill="green" />
        </svg>
      </div>
    </router-link>
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
    flex-grow: 0;
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
