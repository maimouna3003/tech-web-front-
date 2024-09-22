/* eslint-disable react-hooks/rules-of-hooks */
import IGroupe from "../models/Groupe.model";
import { FetchConfigs } from "../services/Helpers.service";
import { useGroupeReducer } from "../strore/reducer/Groupe.reducer";
import { useStateReducer } from "../strore/reducer/State.reducer";
import { StateEnum } from "../strore/State";
import { getModulesAPi } from "./Module.api";

const stateReducer = useStateReducer();
const groupeReducer = useGroupeReducer();

//Add Groupes
export const addGroupesApi = async (groupes: IGroupe[]): Promise<IGroupe[]> => {
  try {
    console.log("json Groues" + JSON.stringify(groupes));

    const requeste = await fetch(`${FetchConfigs.url}/groupes/add`, {
      method: "POST",
      headers: FetchConfigs.headers,
      body: JSON.stringify(groupes),
    });

    const response = await requeste.json();
    console.log("json" + JSON.stringify(response));
    const listNewGroupe: IGroupe[] = [...response];
    console.log("liste groupe created" + response);
    getModulesAPi();
    return listNewGroupe;
  } catch (error) {
    console.log("error groupe add" + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return [];
  }
};

//Del Groupes
export const delGroupeApi = async (
  idModule: string,
  groupe: IGroupe
): Promise<boolean> => {
  try {
    stateReducer.stateApp(StateEnum.Loading);

    const requeste = await fetch(`${FetchConfigs.url}/groupe/delete`, {
      method: "DELETE",
      headers: FetchConfigs.headers,
      body: JSON.stringify(groupe),
    });

    if (requeste.status !== 200) {
      throw new Error();
    }
    groupeReducer.delEntityById(groupe.id);
    stateReducer.stateApp(StateEnum.Loaded);

    return true;
  } catch (error) {
    console.log("error groupe == " + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return false;
  }
};

//Del Groupes
export const delGroupesApi = async (groupes: IGroupe[]): Promise<boolean> => {
  try {
    const requeste = await fetch(`${FetchConfigs.url}/groupe/delete/all`, {
      method: "DELETE",
      headers: FetchConfigs.headers,
      body: JSON.stringify(groupes),
    });

    if (requeste.status !== 200) {
      throw new Error();
    }
    // moduleReducer.delEntityById(module.id);

    return true;
  } catch (error) {
    console.log("error groupe == " + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return false;
  }
};
