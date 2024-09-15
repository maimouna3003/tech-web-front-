import IUtilisateur from "./Utilisateur.model";


export default interface ITuteur extends IUtilisateur {
  heureTotal: number;
  heureTotalEffectue: number;
  heureTotalNonEffectue: number;
  reconduit: boolean;
}
