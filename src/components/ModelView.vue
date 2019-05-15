<template>
  <div class="modelview">
    <h1>{{ message }}</h1>
    <p>Here, the Chor JS needs to be implemented</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ModelView extends Vue {
  private data() {
    return {
      message: 'This is the Model View',
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
