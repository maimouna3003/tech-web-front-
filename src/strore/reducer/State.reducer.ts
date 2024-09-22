import { ICurrentUser } from "../../models/CurrentUser.model";
import { StateEnum } from "../State";
import { useStore } from "../Store";

export class StateReducer {
  static instanceStore: StateReducer | null = null;

  public static store = useStore().store;
  public static stateSignal = this.store.state;
  public static errorSignal = this.store.error;
  public static messageSignal = this.store.message;
  public static currentUserSignal = this.store.currentUser;

  //Upd state in store
  public stateApp(state: StateEnum) {
    StateReducer.stateSignal.value = state;
  }

  //Add error in store
  public addErrorApp(error: string) {
    StateReducer.errorSignal.value = error;
  }
  //Dell error in store
  public delErrorApp() {
    StateReducer.errorSignal.value = null;
  }

  //Add message in store
  public addMessageApp(message: string) {
    StateReducer.messageSignal.value = message;
  }
  //Del message in store
  public delMessageApp() {
    StateReducer.messageSignal.value = null;
  }

  //Upd updCurrentUser in store
  public updCurrentUser(currentUserSignal: ICurrentUser) {
    StateReducer.currentUserSignal.value = { ...currentUserSignal };
  }
}

//Use Store with patern Singleton
export const useStateReducer = (): StateReducer => {
  //
  if (StateReducer.instanceStore === null) {
    StateReducer.instanceStore = new StateReducer();
    return StateReducer.instanceStore;
  }
  return new StateReducer();
};

// import { State, StateEnum } from "../State";
// import { useStore } from "../Store";

// export class StateReducer {
//   static instanceStore: StateReducer | null = null;

//   public store: State;
//   public stateSignal;
//   public errorSignal;
//   public messageSignal;

//   constructor(state: State) {
//     this.store = state;
//     this.stateSignal = state.state;
//     this.messageSignal = state.message;
//     this.errorSignal = state.error;
//   }
//   //Upd state in store
//   public stateApp(state: StateEnum) {
//     this.stateSignal.value = state;
//   }

//   //Add error in store
//   public addErrorApp(error: string) {
//     this.errorSignal.value = error;
//   }
//   //Dell error in store
//   public delErrorApp() {
//     this.errorSignal.value = null;
//   }

//   //Add message in store
//   public addMessageApp(message: string) {
//     this.messageSignal.value = message;
//   }
//   //Del message in store
//   public delMessageApp() {
//     this.messageSignal.value = null;
//   }
// }

// //Use Store with patern Singleton
// export const useStateReducer = (): StateReducer => {
//   const state = useStore().store;
//   console.log(JSON.stringify(state));
//   //
//   if (StateReducer.instanceStore === null) {
//     StateReducer.instanceStore = new StateReducer(state);
//     return StateReducer.instanceStore;
//   }
//   return new StateReducer(state);
// };
