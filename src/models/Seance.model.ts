import IEffectuee from "./Effectuee.model";
import IGlobal from "./Global.model";
import IModule from "./Module.model";

export default interface ISeance extends IGlobal {
  nom?: Number;
  module?: IModule;
  effectues?: Array<IEffectuee>;
}
