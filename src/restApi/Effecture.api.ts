/* eslint-disable react-hooks/rules-of-hooks */
import IEffectuee from "../models/Effectuee.model";
import {
  customReqHeaders,
  FetchUrl,
  getTxtError,
  handlerErrorCustom,
} from "../services/Helpers.service";
import { useEffectuerReducer } from "../strore/reducer/Effectuer.reducer";
import { StateEnum } from "../strore/State";
import { getModulesAPi } from "./Module.api";

const effectuerReducer = useEffectuerReducer();

//get Effectuer
export const getEffectuerAPi = async (): Promise<boolean> => {
  try {
    effectuerReducer.setState(StateEnum.Loading);
    const responseReq = await fetch(`${FetchUrl}/effectues`, {
      method: "GET",
      headers: customReqHeaders(),
    });

    handlerErrorCustom("getEffcetuerAPi", responseReq);

    const response = await responseReq.json();
    effectuerReducer.initEntities(response);
    effectuerReducer.setState(StateEnum.Loaded);
    return true;
  } catch (error) {
    console.log("error getEffectuerAPi" + error);
    effectuerReducer.setMessage(
      `${getTxtError()} de la recupération des effectueés`
    );
    effectuerReducer.setState(StateEnum.Error);
    return false;
  }
};

//Add Effectuers
export const addEffectuersApi = async (
  effectuees: IEffectuee[]
): Promise<void> => {
  try {
    effectuerReducer.setState(StateEnum.Loading);
    const responseReq = await fetch(`${FetchUrl}/effectuees/add`, {
      method: "POST",
      headers: customReqHeaders(),
      body: JSON.stringify(effectuees),
    });

    handlerErrorCustom("addEffectuersApi", responseReq);

    await responseReq.json();
    getModulesAPi();
    effectuerReducer.setState(StateEnum.Loaded);
  } catch (error) {
    console.log("error addEffectuersApi" + error);
    effectuerReducer.setMessage(`${getTxtError()} de l'ajout d'effectueés`);
    effectuerReducer.setState(StateEnum.Error);
  }
};

//Upd Effectuer
export const updEffectuerApi = async (
  effectuer: IEffectuee
): Promise<boolean> => {
  try {
    effectuerReducer.setState(StateEnum.Loading);
    const responseReq = await fetch(`${FetchUrl}/effectuer/update`, {
      method: "PUT",
      headers: customReqHeaders(),
      body: JSON.stringify(effectuer),
    });

    handlerErrorCustom("updEffectuerApi", responseReq);

    const response = await responseReq.json();
    effectuerReducer.updEntity(response);
    effectuerReducer.setState(StateEnum.Loaded);
    return true;
  } catch (error) {
    console.log("error updEffectuerApi" + error);
    effectuerReducer.setMessage(
      `${getTxtError()} de la mise à jour de l'effectué`
    );
    effectuerReducer.setState(StateEnum.Error);
    return false;
  }
};

//Del Effectuers
export const delEffectuerApi = async (
  idModule: string,
  effectuer: IEffectuee
): Promise<boolean> => {
  try {
    effectuerReducer.setState(StateEnum.Loading);
    const responseReq = await fetch(`${FetchUrl}/effectuer/delete`, {
      method: "DELETE",
      headers: customReqHeaders(),
      body: JSON.stringify(effectuer),
    });

    handlerErrorCustom("delEffectuerApi", responseReq);

    effectuerReducer.delEntityById(effectuer.id);
    effectuerReducer.setState(StateEnum.Loaded);
    return true;
  } catch (error) {
    console.log("error updEffectuerApi" + error);
    effectuerReducer.setMessage(
      `${getTxtError()} de la suppression de l'effectué`
    );
    effectuerReducer.setState(StateEnum.Error);
    return false;
  }
};

//Del Effectuers
export const delEffectuersApi = async (
  effectuers: IEffectuee[]
): Promise<boolean> => {
  try {
    effectuerReducer.setState(StateEnum.Loading);
    console.log(" entrez delEffectuersApi");
    const responseReq = await fetch(`${FetchUrl}/effectuer/delete/all`, {
      method: "DELETE",
      headers: customReqHeaders(),
      body: JSON.stringify(effectuers),
    });

    handlerErrorCustom("delEffectuersApi", responseReq);

    effectuerReducer.setState(StateEnum.Loaded);
    console.log(" sorti delEffectuersApi");
    return true;
  } catch (error) {
    console.log("error updEffectuerApi" + error);
    effectuerReducer.setMessage(
      `${getTxtError()} de la suppression des éffectuées`
    );
    effectuerReducer.setState(StateEnum.Error);
    return false;
  }
};
