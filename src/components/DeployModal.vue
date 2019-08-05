<template>
  <modal name="deploy-modal">
    <div class="vue-dialog dialog">
      <div class="dialog-content">
        <h1 class="dialog-title">Deploy Project</h1>
        <p>Choose accounts to participate</p>
        <table>
          <tr>
            <th>Modeled Participant</th>
            <th>Blockchain Account</th>
          </tr>
          <tr v-for="participant in mapping" :key="participant.id">
            <td>{{ participant.name }}</td>
            <td>
              <select :disabled="deploying" v-model="participant.address">
                <option v-for="account in accounts" :key="account" :value="account">{{ account }}</option>
              </select>
            </td>
          </tr>
        </table>
      </div>
      <div class="vue-dialog-buttons">
        <button
          type="button"
          class="vue-dialog-button"
          style="flex: 1 1 100%;"
          @click="deployProject"
          :disabled="deploying"
        >
          {{ deploying ? 'Your project is being deployed, this can take a few minutes.' : 'DEPLOY' }}
          <div v-if="deploying" class="loader">Loading...</div>
        </button>
      </div>
    </div>
  </modal>
</template>

<script lang="js">
import { ChoreographyInstances } from '@/apis/mantichor-blockchain/mantichor-blockchain';

export default {
  name: 'DeployModal',
  data: () => {
    return {
      deploying: false,
      accounts: [],
      mapping: [],
    };
  },
  mounted: async function() {
    this.mapping = this.$modelmanagement.activeProject.getParticipants();
    this.mapping.map((participant) => participant.role = participant.name);
    this.accounts = await ChoreographyInstances.getAccounts();
  },
  methods: {
    async deployProject() {
      if (this.deploying) { return; }
      for (const participant of this.mapping) {
        if (!participant.address) {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'Please provide a blockchain address for all participants.',
            duration: 4000,
          });
          return;
        }
      }

      this.deploying = true;
      if (!this.$modelmanagement.activeProject) { return; }
      const instance = await this.$modelmanagement.activeProject.deploy(this.mapping);
      this.$instancemanagement.addProject(instance);
      this.deploying = false;
      this.$modal.hide('deploy-modal');
      this.$router.push({ name: 'execution' });
    },
  },
};

</script>

<style lang="less">
.v--modal-overlay .v--modal-box {
  height: unset !important;
}

.loader {
  font-size: 10px;
  display: inline-block;
  text-indent: -9999em;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #8b8c8d;
  background: -moz-linear-gradient(
    left,
    #8b8c8d 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -webkit-linear-gradient(
    left,
    #8b8c8d 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -o-linear-gradient(left, #8b8c8d 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(
    left,
    #8b8c8d 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: linear-gradient(
    to right,
    #8b8c8d 10%,
    rgba(255, 255, 255, 0) 42%
  );
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #8b8c8d;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
}
.loader:after {
  width: 75%;
  height: 75%;
  background-color: white;
  border-radius: 50%;
  content: "";
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
