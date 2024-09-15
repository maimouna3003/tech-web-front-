import ISeance from "./Seance.model";

export default interface IEffectuee {
    id: string;
    dateSeance: Date;
    effectuee: boolean;
    createdAt: Date;
    updatedAt: Date;
    seance:ISeance; // Relation vers Seance
  }
  