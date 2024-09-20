import IEffectuee from "./Effectuee.model";
import IGlobal from "./Global.model";

export default interface ISeance extends IGlobal {
  nom: String;
  effectues?: Array<IEffectuee>;
}
