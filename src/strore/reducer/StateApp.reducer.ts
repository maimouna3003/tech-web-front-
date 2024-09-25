import { Signal } from "@preact/signals-react";
import { useStore } from "../Store";
import { StateEnum } from "../State";

class StateAppReducer {
  static instanceStore: StateAppReducer | null = null;

  private static currentUserStore = useStore().store.stateApp;

  //GetState
  getStateAppSignal(): Signal<StateEnum> {
    return StateAppReducer.currentUserStore.state;
  }

  //SetState
  setStateAppSignal(stateEnum: StateEnum) {
    StateAppReducer.currentUserStore.state.value = stateEnum;
  }

  //GetMessage
  getMessageAppSignal(): Signal<string | null> {
    return StateAppReducer.currentUserStore.message;
  }

  //SetMessage
  setMessageAppSignal(message: string | null) {
    StateAppReducer.currentUserStore.message.value = message;
  }
}

//Use Store with patern Singleton
export const useStateAppReducer = (): StateAppReducer => {
  //
  if (StateAppReducer.instanceStore === null) {
    StateAppReducer.instanceStore = new StateAppReducer();
    return StateAppReducer.instanceStore;
  }
  return new StateAppReducer();
};
