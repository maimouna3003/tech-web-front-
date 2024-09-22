import IModule from "../../models/Module.model";
import { useStore } from "../Store";
import GeneriqueReducer from "./Generique.reducer";

class ModuleReducer extends GeneriqueReducer<IModule> {
  static instanceStore: ModuleReducer | null = null;

  public static modulesSignal = useStore().store.entities.moduleStore.modules;
  constructor() {
    super(ModuleReducer.modulesSignal);
  }

  //Delete entity in store
  //TODO! A Continer...
  // public delSeanceModuleById = (id: string | undefined): boolean => {
  //   let model = this.getEntityById(id) ?? {
  //     heure: 4,
  //     nom: 4,
  //     semaine: 4,
  //     seances: [],
  //   };
  //   model.seances = model?.seances?.filter((entity) => entity.id !== id);

  //   return true;
  // };
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
