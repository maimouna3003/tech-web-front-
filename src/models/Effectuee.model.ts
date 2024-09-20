import IGlobal from "./Global.model";
import IGroupe from "./Groupe.model";
import ISeance from "./Seance.model";

export default interface IEffectuee extends IGlobal {
  date: Date | string;
  effectuer: boolean;
  seance: ISeance | null; // Relation vers Seance
  groupe: IGroupe | null;
}
