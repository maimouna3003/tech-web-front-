import { Signal } from "@preact/signals-react";
import IGroupe from "../models/Groupe.model";
import IModule from "../models/Module.model";
import IEffectuee from "../models/Effectuee.model";
import { ICurrentUser } from "../models/CurrentUser.model";
import ISeance from "../models/Seance.model";
import IUtilisateur from "../models/Utilisateur.model";

export interface State {
  state: Signal<StateEnum>;
  entities: Entities;
  message: Signal<string | null>;
  error: Signal<string | null>;
  currentUser: Signal<ICurrentUser>;
}

export interface Entities {
  moduleStore: { modules: Signal<IModule[]>; module: Signal<IModule | null> };
  groupeStore: { groupes: Signal<IGroupe[]>; groupe: Signal<IGroupe | null> };
  effectuerStore: { effectues: Signal<IEffectuee[]> };
  seanceStore: { seances: Signal<ISeance[]> };
  userStore: { users: Signal<IUtilisateur[]> };
}

export enum StateEnum {
  Initial,
  Loaded,
  Loading,
  Error,
}
