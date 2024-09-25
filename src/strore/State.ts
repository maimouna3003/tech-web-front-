import { Signal } from "@preact/signals-react";
import IGroupe from "../models/Groupe.model";
import IModule from "../models/Module.model";
import IEffectuee from "../models/Effectuee.model";
import { ICurrentUser } from "../models/CurrentUser.model";
import ISeance from "../models/Seance.model";
import IUtilisateur from "../models/Utilisateur.model";

export interface State {
  entities: StateEntities;
  currentUser: Signal<ICurrentUser>;
  stateApp: StateApp;
}

export interface StateEntities {
  moduleStore: {
    state: Signal<StateEnum>;
    message: Signal<string | null>;
    modules: Signal<IModule[]>;
    module: Signal<IModule | null>;
  };
  groupeStore: {
    state: Signal<StateEnum>;
    message: Signal<string | null>;
    groupes: Signal<IGroupe[]>;
    groupe: Signal<IGroupe | null>;
  };
  effectuerStore: {
    message: Signal<string | null>;
    state: Signal<StateEnum>;
    effectues: Signal<IEffectuee[]>;
  };
  seanceStore: {
    state: Signal<StateEnum>;
    message: Signal<string | null>;
    seances: Signal<ISeance[]>;
  };
  userStore: {
    state: Signal<StateEnum>;
    message: Signal<string | null>;
    users: Signal<IUtilisateur[]>;
  };
}
export interface StateApp {
  state: Signal<StateEnum>;
  message: Signal<string | null>;
}

export enum StateEnum {
  Initial,
  Loaded,
  Loading,
  Error,
}
