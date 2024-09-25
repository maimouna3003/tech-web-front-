import { computed, ReadonlySignal } from "@preact/signals-react";
import IEffectuee from "../../models/Effectuee.model";
import { useStore } from "../Store";
import GeneriqueReducer from "./Generique.reducer";

class EffectuerReducer extends GeneriqueReducer<IEffectuee> {
  static instanceStore: EffectuerReducer | null = null;

  private static effectuerStore = useStore().store.entities.effectuerStore;
  private static stateSignal = EffectuerReducer.effectuerStore.state;
  private static messageSignal = EffectuerReducer.effectuerStore.message;
  private static effectuersSignal = EffectuerReducer.effectuerStore.effectues;

  constructor() {
    super(
      EffectuerReducer.stateSignal,
      EffectuerReducer.messageSignal,
      EffectuerReducer.effectuersSignal
    );
  }

  //Get seance effectuer by groupe
  public getSeancesByGroupe = (id: string | undefined): IEffectuee[] => {
    const effectuer = EffectuerReducer.effectuersSignal;
    return effectuer.value.filter((effectuer) => effectuer.groupe?.id === id);
  };

  //Get Seance effectuer
  getEffectuerTrue(id: string | undefined): ReadonlySignal<IEffectuee[]> {
    return computed<IEffectuee[]>(() =>
      this.getSeancesByGroupe(id).filter((effectuer) => effectuer.effectuer)
    );
  }
  //Get Seance non effectuer
  getEffectuerFalse(id: string | undefined): ReadonlySignal<IEffectuee[]> {
    return computed<IEffectuee[]>(() =>
      this.getSeancesByGroupe(id).filter((effectuer) => !effectuer.effectuer)
    );
  }
}

//Use Store with patern Singleton
export const useEffectuerReducer = (): EffectuerReducer => {
  //
  if (EffectuerReducer.instanceStore === null) {
    EffectuerReducer.instanceStore = new EffectuerReducer();
    return EffectuerReducer.instanceStore;
  }
  return new EffectuerReducer();
};
