import IEffectuee from "./Effectuee.model";
import IGlobal from "./Global.model";
import IModule from "./Module.model";
import IUtilisateur from "./Utilisateur.model";

export default interface IGroupe extends IGlobal {
  nom: string;
  heureTotalEffectue: number;
  heureTotalNonEffectue: number;
  module?: IModule | null; // Un groupe est lié à un module
  user?: IUtilisateur | null;
  effectues?: Array<IEffectuee>;
}
