import { Signal } from "@preact/signals-react";
import IGlobal from "../../models/Global.model";

export default class GeneriqueReducer<T extends IGlobal> {
  //
  public entitiesSignal: Signal<T[]>;

  constructor(entitiesSignal: Signal<T[]>) {
    this.entitiesSignal = entitiesSignal;
  }

  //Get store entities
  public getStoreEntities(): Signal<T[]> {
    return this.entitiesSignal;
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
}
