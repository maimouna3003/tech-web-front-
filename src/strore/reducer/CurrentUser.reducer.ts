import { Signal } from "@preact/signals-react";
import { ICurrentUser } from "../../models/CurrentUser.model";
import { useStore } from "../Store";

class CurrentUserReducer {
  static instanceStore: CurrentUserReducer | null = null;

  private static currentUserStore = useStore().store.currentUser;

  //GetTuteur
  getCurrentUserSignal(): Signal<ICurrentUser> {
    return CurrentUserReducer.currentUserStore;
  }

  //SetTuteur
  setCurrentUserSignal(currentUser: ICurrentUser) {
    CurrentUserReducer.currentUserStore.value = { ...currentUser };
  }
}

//Use Store with patern Singleton
export const useCurrentUserReducer = (): CurrentUserReducer => {
  //
  if (CurrentUserReducer.instanceStore === null) {
    CurrentUserReducer.instanceStore = new CurrentUserReducer();
    return CurrentUserReducer.instanceStore;
  }
  return new CurrentUserReducer();
};
