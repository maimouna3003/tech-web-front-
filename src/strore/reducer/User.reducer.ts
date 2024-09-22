import IUtilisateur from "../../models/Utilisateur.model";
import { useStore } from "../Store";
import GeneriqueReducer from "./Generique.reducer";

class UserReducer extends GeneriqueReducer<IUtilisateur> {
  static instanceStore: UserReducer | null = null;

  public static usersSignal = useStore().store.entities.userStore.users;
  constructor() {
    super(UserReducer.usersSignal);
  }
}

//Use Store with patern Singleton
export const useUserReducer = (): UserReducer => {
  //
  if (UserReducer.instanceStore === null) {
    UserReducer.instanceStore = new UserReducer();
    return UserReducer.instanceStore;
  }
  return new UserReducer();
};
