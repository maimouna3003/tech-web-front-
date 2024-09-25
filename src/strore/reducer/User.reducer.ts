import { Profil } from "../../models/Enum";
import IUtilisateur from "../../models/Utilisateur.model";
import { useStore } from "../Store";
import GeneriqueReducer from "./Generique.reducer";

class UserReducer extends GeneriqueReducer<IUtilisateur> {
  static instanceStore: UserReducer | null = null;

  private static userStore = useStore().store.entities.userStore;
  private static stateSignal = UserReducer.userStore.state;
  private static messageSignal = UserReducer.userStore.message;
  private static usersSignal = UserReducer.userStore.users;
  constructor() {
    super(
      UserReducer.stateSignal,
      UserReducer.messageSignal,
      UserReducer.usersSignal
    );
  }

  //GetTuteur
  getTuteurs(): IUtilisateur[] {
    const users = UserReducer.usersSignal.value;
    return users.filter((user) => user.profil === Profil.TUTEUR);
  }
  //GetAdmin
  getAdmins(): IUtilisateur[] {
    const users = UserReducer.usersSignal.value;
    return users.filter((user) => user.profil === Profil.ADMINISTRATEUR);
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
