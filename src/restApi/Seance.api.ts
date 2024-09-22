/* eslint-disable react-hooks/rules-of-hooks */
import ISeance from "../models/Seance.model";
import { FetchConfigs } from "../services/Helpers.service";
import { useSeanceReducer } from "../strore/reducer/Seance.reducer";
import { useStateReducer } from "../strore/reducer/State.reducer";
import { StateEnum } from "../strore/State";

const stateReducer = useStateReducer();
const seanceReducer = useSeanceReducer();

//Add Seances
export const addSeancesApi = async (seance: ISeance[]): Promise<ISeance[]> => {
  try {
    const requeste = await fetch(`${FetchConfigs.url}/seances/add`, {
      method: "POST",
      headers: FetchConfigs.headers,
      body: JSON.stringify(seance),
    });

    const response = await requeste.json();
    const listNewSeance: ISeance[] = [...response];
    console.log("liste seance created" + response);

    return listNewSeance;
  } catch (error) {
    console.log("error seance add" + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return [];
  }
};

//Del Seances
export const delSeanceApi = async (
  idModule: string,
  seance: ISeance
): Promise<boolean> => {
  try {
    stateReducer.stateApp(StateEnum.Loading);

    const requeste = await fetch(`${FetchConfigs.url}/seance/delete`, {
      method: "DELETE",
      headers: FetchConfigs.headers,
      body: JSON.stringify(seance),
    });

    if (requeste.status !== 200) {
      throw new Error();
    }
    seanceReducer.delEntityById(seance.id);
    stateReducer.stateApp(StateEnum.Loaded);

    return true;
  } catch (error) {
    console.log("error seance == " + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return false;
  }
};

//Del Seances
export const delSeancesApi = async (seances: ISeance[]): Promise<boolean> => {
  try {
    const requeste = await fetch(`${FetchConfigs.url}/seance/delete/all`, {
      method: "DELETE",
      headers: FetchConfigs.headers,
      body: JSON.stringify(seances),
    });

    if (requeste.status !== 200) {
      throw new Error();
    }
    // moduleReducer.delEntityById(module.id);

    return true;
  } catch (error) {
    console.log("error seance == " + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return false;
  }
};
