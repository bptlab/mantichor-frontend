<template>
  <div class="model">
    <Executor />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Executor from '@/components/Executor.vue';

@Component({
  components: {
    Executor,
  },
})
export default class Execution extends Vue {}
</script>
