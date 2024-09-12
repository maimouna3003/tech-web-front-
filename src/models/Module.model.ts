import IGroupe from "./Groupe.model";

export default interface IModule {
  id: string;
  nom: string;
  heure: number;
  semaine: number;
  createdAt: Date;
  updatedAt: Date;
  groupes: IGroupe[]; // Un module peut avoir plusieurs groupes
}
