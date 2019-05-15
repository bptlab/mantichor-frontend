<template>
  <div class="model">
    <ModelView />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ModelView from '@/components/ModelView.vue'; // @ is an alias to /src

@Component({
  components: {
    ModelView,
  },
})
export default class Model extends Vue {}
</script>
