import IGroupe from "../../models/Groupe.model";
import { useStore } from "../Store";
import { useEffectuerReducer } from "./Effectuer.reducer";
import GeneriqueReducer from "./Generique.reducer";

class GroupeReducer extends GeneriqueReducer<IGroupe> {
  static instanceStore: GroupeReducer | null = null;

  private static groupeStore = useStore().store.entities.groupeStore;
  private static stateSignal = GroupeReducer.groupeStore.state;
  private static messageSignal = GroupeReducer.groupeStore.message;
  private static groupesSignal = GroupeReducer.groupeStore.groupes;
  constructor() {
    super(
      GroupeReducer.stateSignal,
      GroupeReducer.messageSignal,
      GroupeReducer.groupesSignal
    );
  }

  //Calcule heure effectuer et non effectuer groupe in store
  public getHeuresModule = (groupes: IGroupe[]): IGroupe[] => {
    const useEffectueReducer = useEffectuerReducer();
    groupes = groupes.map((groupe) => {
      const effectuer = useEffectueReducer.getEffectuerTrue(groupe.id).value
        .length;
      const nonEffectuer = useEffectueReducer.getEffectuerFalse(groupe.id).value
        .length;
      groupe = {
        ...groupe,
        heureTotalEffectue: effectuer * 2,
        heureTotalNonEffectue: nonEffectuer * 2,
      };
      return groupe;
    });

    return groupes;
  };
}

//Use Store with patern Singleton
export const useGroupeReducer = (): GroupeReducer => {
  //
  if (GroupeReducer.instanceStore === null) {
    GroupeReducer.instanceStore = new GroupeReducer();
    return GroupeReducer.instanceStore;
  }
  return new GroupeReducer();
};
