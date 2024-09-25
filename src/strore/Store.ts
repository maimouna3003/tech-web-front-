import { effect, signal } from "@preact/signals-react";
import { State, StateEntities, StateEnum } from "./State";
import IGroupe from "../models/Groupe.model";
import IModule from "../models/Module.model";
import IEffectuee from "../models/Effectuee.model";
import ISeance from "../models/Seance.model";
import IUtilisateur from "../models/Utilisateur.model";

export class Store {
  static instanceStore: Store | null = null;

  constructor() {
    effect(() => {
      console.log("constructor Store");
    });
  }
  //
  public store: State = {
    stateApp: {
      state: signal<StateEnum>(StateEnum.Initial),
      message: signal<string | null>(null),
    },
    entities: initEntitiesStore(),
    currentUser: signal({ email: null, isConnected: false, profil: null }),
  };
}

//Use Store with patern Singleton
export const useStore = (): Store => {
  //
  if (Store.instanceStore === null) {
    Store.instanceStore = new Store();
    return Store.instanceStore;
  }
  return new Store();
};

//Initial store
const initEntitiesStore = (): StateEntities => {
  return {
    groupeStore: {
      state: signal<StateEnum>(StateEnum.Initial),
      message: signal<string | null>(null),
      groupes: signal<IGroupe[]>([]),
      groupe: signal<IGroupe | null>(null),
    },
    moduleStore: {
      state: signal<StateEnum>(StateEnum.Initial),
      message: signal<string | null>(null),
      modules: signal<IModule[]>([]),
      module: signal<IModule | null>(null),
    },
    effectuerStore: {
      state: signal<StateEnum>(StateEnum.Initial),
      message: signal<string | null>(null),
      effectues: signal<IEffectuee[]>([]),
    },
    seanceStore: {
      state: signal<StateEnum>(StateEnum.Initial),
      message: signal<string | null>(null),
      seances: signal<ISeance[]>([]),
    },
    userStore: {
      state: signal<StateEnum>(StateEnum.Initial),
      message: signal<string | null>(null),
      users: signal<IUtilisateur[]>([]),
    },
  };
};

//
export const store = new Store();
