<template>
  <div class="model">
    <Executor />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Executor from '@/components/Executor.vue';
import Sidebar from '@/components/Sidebar.vue';

@Component({
  components: {
    Sidebar,
    Executor,
  },
})
export default class Execution extends Vue {}
</script>
