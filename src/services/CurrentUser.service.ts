import IEffectuee from "../models/Effectuee.model";
import IGroupe from "../models/Groupe.model";

export const getTotalSeanceForTuteur = (groupes: IGroupe[]): number => {
  let nbrSeance = 0;

  groupes.forEach((groupe) => {
    if (groupe.effectues?.length !== undefined) {
      nbrSeance = groupe.effectues?.length + nbrSeance;
    }
  });
  return nbrSeance;
};

export const getTotalSeanceTermineForTuteur = (groupes: IGroupe[]): number => {
  let nbrSeanceTerminer = 0;

  groupes.forEach((groupe) => {
    const seances = groupe.effectues;
    if (seances?.length !== undefined) {
      seances.forEach((seance) => {
        if (seance.effectuer) nbrSeanceTerminer = nbrSeanceTerminer + 1;
      });
    }
  });
  return nbrSeanceTerminer;
};

export const getTotalSeanceNonTermineForTuteur = (
  groupes: IGroupe[]
): number => {
  let nbrSeanceTerminer = 0;

  groupes.forEach((groupe) => {
    const seances = groupe.effectues;
    if (seances?.length !== undefined) {
      seances.forEach((seance) => {
        if (!seance.effectuer) nbrSeanceTerminer = nbrSeanceTerminer + 1;
      });
    }
  });
  return nbrSeanceTerminer;
};
