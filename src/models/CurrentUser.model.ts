import IUtilisateur from "./Utilisateur.model";

export interface ICurrentUser {
  email: string | null;
  isConnected: boolean;
  user: IUtilisateur | null;
}
