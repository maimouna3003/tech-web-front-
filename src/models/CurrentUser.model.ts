import { Profil } from "./Enum";

export interface ICurrentUser {
  email: string | null;
  isConnected: boolean;
  profil: Profil | null;
}
