/* eslint-disable react-hooks/rules-of-hooks */
import IEffectuee from "../models/Effectuee.model";
import { FetchConfigs } from "../services/Helpers.service";
import { useEffectuerReducer } from "../strore/reducer/Effectuer.reducer";
import { useStateReducer } from "../strore/reducer/State.reducer";
import { StateEnum } from "../strore/State";

const stateReducer = useStateReducer();
const effectuerReducer = useEffectuerReducer();

//get Effcetuer
export const getEffcetuerAPi = async (): Promise<boolean> => {
  try {
    stateReducer.stateApp(StateEnum.Loading);
    const requeste = await fetch(`${FetchConfigs.url}/effectues`, {
      method: "GET",
      headers: FetchConfigs.headers,
    });

    const response = await requeste.json();
    effectuerReducer.initEntities(response);
    stateReducer.stateApp(StateEnum.Loaded);

    return true;
  } catch (error) {
    console.log("error" + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return false;
  }
};

//Add Effectuers
export const addEffectuersApi = async (
  effectuees: IEffectuee[]
): Promise<IEffectuee[]> => {
  try {
    const requeste = await fetch(`${FetchConfigs.url}/effectuees/add`, {
      method: "POST",
      headers: FetchConfigs.headers,
      body: JSON.stringify(effectuees),
    });

    const response = await requeste.json();
    const listNewEffectuer: IEffectuee[] = [...response];
    console.log("liste effectuer created" + response);

    return listNewEffectuer;
  } catch (error) {
    console.log("error effectuer add" + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return [];
  }
};

//Upd Effectuer
export const updEffectuerApi = async (
  effectuer: IEffectuee
): Promise<boolean> => {
  try {
    stateReducer.stateApp(StateEnum.Loading);
    const requeste = await fetch(`${FetchConfigs.url}/effectuer/update`, {
      method: "PUT",
      headers: FetchConfigs.headers,
      body: JSON.stringify(effectuer),
    });

    const response = await requeste.json();
    effectuerReducer.updEntity(response);
    stateReducer.stateApp(StateEnum.Loaded);

    return true;
  } catch (error) {
    console.log("error" + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return false;
  }
};

//Del Effectuers
export const delEffectuerApi = async (
  idModule: string,
  effectuer: IEffectuee
): Promise<boolean> => {
  try {
    stateReducer.stateApp(StateEnum.Loading);

    const requeste = await fetch(`${FetchConfigs.url}/effectuer/delete`, {
      method: "DELETE",
      headers: FetchConfigs.headers,
      body: JSON.stringify(effectuer),
    });

    if (requeste.status !== 200) {
      throw new Error();
    }
    effectuerReducer.delEntityById(effectuer.id);
    stateReducer.stateApp(StateEnum.Loaded);

    return true;
  } catch (error) {
    console.log("error effectuer == " + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return false;
  }
};

//Del Effectuers
export const delEffectuersApi = async (
  effectuers: IEffectuee[]
): Promise<boolean> => {
  try {
    const requeste = await fetch(`${FetchConfigs.url}/effectuer/delete/all`, {
      method: "DELETE",
      headers: FetchConfigs.headers,
      body: JSON.stringify(effectuers),
    });

    if (requeste.status !== 200) {
      throw new Error();
    }
    // moduleReducer.delEntityById(module.id);

    return true;
  } catch (error) {
    console.log("error effectuer == " + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return false;
  }
};
