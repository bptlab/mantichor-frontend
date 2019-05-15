<template>
  <header>
    <router-link to="/model">Model</router-link>
    <router-link to="/about">Execution</router-link>
    <router-link to="/user"><img alt="Vue logo" src="../assets/logo.png"></router-link>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {}
</script>

<style lang="less">
header {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    height: 50px;
    padding: 0;
    border-bottom: 4px solid #CCCCCC;
  a {
    flex-grow: 1;
    font-weight: bold;
    color: #ffffff;
    height: 50px;
    font-size: 1.2rem;
    line-height: 50px;
    margin: 0 0 0 -1px;
    border-bottom: 4px solid #CCCCCC;
    text-decoration: none;
    &.router-link-exact-active {
      color: #75b900;
      border-bottom-color: #75b900;
    }
  }
  a > img {
    height: 50px;
  }
  a:last-child {
    flex-grow: 0.2;
  }
}
</style>
