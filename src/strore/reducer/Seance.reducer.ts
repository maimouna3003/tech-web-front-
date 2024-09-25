import { useStore } from "../Store";
import GeneriqueReducer from "./Generique.reducer";
import ISeance from "../../models/Seance.model";

class SeanceReducer extends GeneriqueReducer<ISeance> {
  static instanceStore: SeanceReducer | null = null;

  private static seanceStore = useStore().store.entities.seanceStore;
  private static stateSignal = SeanceReducer.seanceStore.state;
  private static messageSignal = SeanceReducer.seanceStore.message;
  private static seancesSignal = SeanceReducer.seanceStore.seances;
  constructor() {
    super(
      SeanceReducer.stateSignal,
      SeanceReducer.messageSignal,
      SeanceReducer.seancesSignal
    );
  }

  //Get seance  by module
  public getSeancesByModule = (id: string | undefined): ISeance[] => {
    const seance = SeanceReducer.seancesSignal;
    return seance.value.filter((seance) => seance.module?.id === id);
  };
}

//Use Store with patern Singleton
export const useSeanceReducer = (): SeanceReducer => {
  //
  if (SeanceReducer.instanceStore === null) {
    SeanceReducer.instanceStore = new SeanceReducer();
    return SeanceReducer.instanceStore;
  }
  return new SeanceReducer();
};
