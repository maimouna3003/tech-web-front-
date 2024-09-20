import IGlobal from "./Global.model";
import { Profil } from "./Profil.model";
import { Sexe } from "./Sexe.model";
import { Statut } from "./Statut.model";

export default interface IUtilisateur extends IGlobal {
  nom: string;
  prenom: string;
  sexe: Sexe; // Enum pour le sexe
  email: string;
  telephone: String;
  status: Statut; // Enum pour le statut
  motDePasse: String;
  profil: Profil; // Enum pour le profil
}
