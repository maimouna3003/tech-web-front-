
import IModule from './Module.model';
import IUtilisateur from './Utilisateur.model';

export default interface IAffectation {
  id: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  module:IModule; // Relation vers Module
  utilisateur:IUtilisateur ; // Relation vers Utilisateur
}
