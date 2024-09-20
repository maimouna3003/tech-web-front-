import IGroupe from "../models/Groupe.model";
import DataTest from "./dataTeste";

//::::
export const getGroupeById = (id: string | undefined): IGroupe | undefined => {
  return DataTest.DataGroupes.find((groupe) => groupe.id === id);
};

//Update groupe in local
export const addGroupe = (groupeInput: IGroupe): Boolean => {
  DataTest.DataGroupes.push(groupeInput);
  return true;
};

//Update groupe in local
export const updGroupe = (groupeInput: IGroupe): Boolean => {
  DataTest.DataGroupes = DataTest.DataGroupes.map((groupe) =>
    groupe.id === groupeInput.id ? groupeInput : groupe
  );
  return true;
};

//Delete groupe in local
export const delGroupeById = (id: string | undefined): void => {
  DataTest.DataGroupes = DataTest.DataGroupes.filter(
    (groupe) => groupe.id !== id
  );
};
