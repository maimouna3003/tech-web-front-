import IModule from "./Module.model";

export default interface IGroupe {
    id: string;
    nom: string;
    heureTotalEffectue: number;
    heureTotalNonEffectue: number;
    createdAt: Date;
    updatedAt: Date;
    module: IModule; // Un groupe est lié à un module
}