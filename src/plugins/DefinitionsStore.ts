import _Vue from 'vue';

import BpmnModdle, { Definitions } from 'bpmn-moddle';

export default function install(Vue: typeof _Vue, options = {}) {
  Vue.prototype.$definitionsStore = new DefinitionStore();
}

export class DefinitionStore {
  private moddle = new BpmnModdle();

  private store = new _Vue({
    data() {
      return {
        definitions: null,
      };
    },
  });

  public getDefinitions(): Definitions {
    return this.store.$data.definitions;
  }

  public setDefinitions(definitions: Definitions) {
    this.store.$data.definitions = definitions;
  }

  public setDefinitionsFromXML(xml: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.moddle.fromXML(xml, (err, definitions) => {
        this.setDefinitions(definitions);
        resolve();
      });
    });
  }

}
