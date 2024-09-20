import IGlobal from "./Global.model";
import IModule from "./Module.model";
import IUtilisateur from "./Utilisateur.model";

export default interface IAffectation extends IGlobal {
  date: Date;
  module: IModule; // Relation vers Module
  utilisateur: IUtilisateur; // Relation vers Utilisateur
}
