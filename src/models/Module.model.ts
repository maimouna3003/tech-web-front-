import IGlobal from "./Global.model";
import IGroupe from "./Groupe.model";
import ISeance from "./Seance.model";
import IUtilisateur from "./Utilisateur.model";

export default interface IModule extends IGlobal {
  nom: string;
  heure: number;
  semaine: number;
  groupes?: IGroupe[]; // Un module peut avoir plusieurs groupes
  users?: IUtilisateur[];
  seances?: ISeance[];
}
