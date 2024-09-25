import IModule from "../../models/Module.model";
import { useStore } from "../Store";
import GeneriqueReducer from "./Generique.reducer";

class ModuleReducer extends GeneriqueReducer<IModule> {
  static instanceStore: ModuleReducer | null = null;

  private static moduleStore = useStore().store.entities.moduleStore;
  private static stateSignal = ModuleReducer.moduleStore.state;
  private static messageSignal = ModuleReducer.moduleStore.message;
  private static modulesSignal = ModuleReducer.moduleStore.modules;
  private static moduleSignal = ModuleReducer.moduleStore.module;
  constructor() {
    super(
      ModuleReducer.stateSignal,
      ModuleReducer.messageSignal,
      ModuleReducer.modulesSignal,
      ModuleReducer.moduleSignal
    );
  }
}

//Use Store with patern Singleton
export const useModuleReducer = (): ModuleReducer => {
  //
  if (ModuleReducer.instanceStore === null) {
    ModuleReducer.instanceStore = new ModuleReducer();

    return ModuleReducer.instanceStore;
  }
  return new ModuleReducer();
};
