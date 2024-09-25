import { signal, Signal } from "@preact/signals-react";
import IGlobal from "../../models/Global.model";
import { StateEnum } from "../State";
import { useStateAppReducer } from "./StateApp.reducer";

export default class GeneriqueReducer<T extends IGlobal> {
  //
  private state: Signal<StateEnum>;
  private message: Signal<string | null>;
  private entitiesSignal: Signal<T[]>;
  private entitieSignal: Signal<T | null> = signal(null);

  constructor(
    state: Signal<StateEnum>,
    message: Signal<string | null>,
    entitiesSignal: Signal<T[]>,
    entitieSignal?: Signal<T | null>
  ) {
    this.state = state;
    this.message = message;
    this.entitiesSignal = entitiesSignal;
    this.entitieSignal = entitieSignal ?? signal(null);
  }

  //Get signal entities
  public getSignalEntities(): Signal<T[]> {
    return this.entitiesSignal;
  }

  //Get signal entity
  public getSignalEntity(): Signal<T | null> {
    return this.entitieSignal;
  }

  //Init entities in store
  public initEntities(entities: T[]) {
    this.entitiesSignal.value = [...entities];
    return true;
  }
  //Add entity in store
  public addEntity(entity: T) {
    this.entitiesSignal.value = [...this.entitiesSignal.value, entity];
    return true;
  }

  //Update groupe in store
  public updEntity = (entityInput: T): Boolean => {
    this.entitiesSignal.value = this.entitiesSignal.value.map((entity) =>
      entity.id === entityInput.id ? entityInput : entity
    );
    return true;
  };

  //Get entity in store
  public getEntityById = (id: string | undefined): T | undefined => {
    return this.entitiesSignal.value.find((entity) => entity.id === id);
  };

  //Delete entity in store
  public delEntityById = (id: string | undefined): boolean => {
    this.entitiesSignal.value = this.entitiesSignal.value.filter(
      (entity) => entity.id !== id
    );

    return true;
  };

  //Delete entities in store
  public delEntities = (entities: T[]): boolean => {
    entities.forEach((entityDelete) => {
      this.entitiesSignal.value = this.entitiesSignal.value.filter(
        (entity) => entity.id !== entityDelete.id
      );
    });

    return true;
  };

  //State

  //Upd state in store
  public setState(state: StateEnum) {
    this.state.value = state;
    //On le passe à l'etat global
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useStateAppReducer().setStateAppSignal(state);
  }

  //Upd message in store
  public setMessage(message: string | null) {
    this.message.value = message;
    //On le passe à l'etat global
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useStateAppReducer().setMessageAppSignal(message);
  }

  //Get state in store
  public getState(): Signal<StateEnum> {
    return this.state;
  }

  //Get message in store
  public getMessage(): Signal<string | null> {
    return this.message;
  }
}
