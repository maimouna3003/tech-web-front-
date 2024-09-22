import { Profil, Sexe, Statut } from "./Enum";
import IGlobal from "./Global.model";
import IGroupe from "./Groupe.model";
import IModule from "./Module.model";

export default interface IUtilisateur extends IGlobal {
  nom: string;
  prenom: string;
  sexe: Sexe; // Enum pour le sexe
  email: string;
  adresse: string;
  telephone: String;
  status: Statut; // Enum pour le statut
  motDePasse: String;
  profil: Profil; // Enum pour le profil
  groupes?: IGroupe[];
  modules?: IModule[];
}
