import { effect, signal } from "@preact/signals-react";
import { Entities, State, StateEnum } from "./State";
import IGroupe from "../models/Groupe.model";
import IModule from "../models/Module.model";
import DataTest from "../services/DataTeste";
import IEffectuee from "../models/Effectuee.model";
import ISeance from "../models/Seance.model";
import IUtilisateur from "../models/Utilisateur.model";

export class Store {
  static instanceStore: Store | null = null;

  constructor() {
    effect(() => {
      console.log("action ffffff");
    });
  }
  //
  public store: State = {
    state: signal(StateEnum.Initial),
    entities: initEntitiesStore(),
    error: signal(null),
    message: signal(null),
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
const initEntitiesStore = (): Entities => {
  return {
    groupeStore: {
      groupes: signal<IGroupe[]>(DataTest.DataGroupes),
      groupe: signal<IGroupe | null>(null),
    },
    moduleStore: {
      modules: signal<IModule[]>([]),
      module: signal<IModule | null>(null),
    },
    effectuerStore: {
      effectues: signal<IEffectuee[]>([]),
    },
    seanceStore: {
      seances: signal<ISeance[]>([]),
    },
    userStore: {
      users: signal<IUtilisateur[]>([]),
    },
  };
};

//
export const store = new Store();
