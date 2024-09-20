import IGlobal from "../models/Global.model";

export default class GeneniqueService<T extends IGlobal> {
  private data: T[] = [];

  public setData = (data: T[]): void => {
    this.data = data;
  };

  //
  public getEntityById = (id: string | undefined): T | undefined => {
    return this.data.find((entity) => entity.id === id);
  };
}
