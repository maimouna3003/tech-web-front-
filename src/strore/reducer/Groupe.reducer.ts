import IGroupe from "../../models/Groupe.model";
import { useStore } from "../Store";
import { useEffectuerReducer } from "./Effectuer.reducer";
import GeneriqueReducer from "./Generique.reducer";

class GroupeReducer extends GeneriqueReducer<IGroupe> {
  static instanceStore: GroupeReducer | null = null;

  public static groupesSignal = useStore().store.entities.groupeStore.groupes;
  constructor() {
    super(GroupeReducer.groupesSignal);
  }

  //Calcule heure effectuer et non effectuer groupe in store
  public getHeuresModule = (groupes: IGroupe[]): IGroupe[] => {
    const useReducer = useEffectuerReducer();
    groupes = groupes.map((groupe) => {
      const effectuer = useReducer.getEffectuerTrue(groupe.id).value.length;
      const nonEffectuer = useReducer.getEffectuerFalse(groupe.id).value.length;
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

// export default class GroupeReducer {
//   //
//   public static store = useStore();

//   //Get store groupes
//   public static getStoreGroupes(): Signal<IGroupe[]> {
//     let {
//       store: {
//         entities: {
//           groupeStore: { groupes },
//         },
//       },
//     } = this.store;

//     return groupes;
//   }

//   //Add groupe in store
//   public static addGroupe(groupe: IGroupe) {
//     const storeGroupes = this.getStoreGroupes();

//     storeGroupes.value = [...storeGroupes.value, groupe];
//     return true;
//   }

//   //Delete groupe in store
//   public static delGroupeById = (id: string | undefined): boolean => {
//     const storeGroupes = this.getStoreGroupes();

//     storeGroupes.value = storeGroupes.value.filter(
//       (groupe) => groupe.nom !== id
//     );

//     return true;
//   };
// }
