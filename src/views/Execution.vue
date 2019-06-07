<template>
  <div class="model">
    <ExecutionView />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ExecutionView from '@/components/ExecutionView.vue';

@Component({
  components: {
    ExecutionView,
  },
})
export default class Execution extends Vue {}
</script>
