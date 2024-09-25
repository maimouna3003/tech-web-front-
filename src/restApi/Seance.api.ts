/* eslint-disable react-hooks/rules-of-hooks */
import ISeance from "../models/Seance.model";
import {
  customReqHeaders,
  FetchUrl,
  getTxtError,
  handlerErrorCustom,
} from "../services/Helpers.service";
import { useSeanceReducer } from "../strore/reducer/Seance.reducer";
import { StateEnum } from "../strore/State";
import { delEffectuersApi, getEffectuerAPi } from "./Effecture.api";
import { getModulesAPi } from "./Module.api";

const seanceReducer = useSeanceReducer();

//Add Seances
export const addSeancesApi = async (seance: ISeance[]): Promise<ISeance[]> => {
  try {
    seanceReducer.setState(StateEnum.Loading);
    const responseReq = await fetch(`${FetchUrl}/seances/add`, {
      method: "POST",
      headers: customReqHeaders(),
      body: JSON.stringify(seance),
    });
    handlerErrorCustom("addSeancesApi", responseReq);

    const response = await responseReq.json();
    const listNewSeance: ISeance[] = [...response];
    seanceReducer.setState(StateEnum.Loaded);
    return listNewSeance;
  } catch (error) {
    console.log("error addSeancesApi" + error);
    seanceReducer.setMessage(`${getTxtError()} de la recupération des seances`);
    seanceReducer.setState(StateEnum.Error);
    return [];
  }
};

//Del Seances
export const delSeanceApi = async (seance: ISeance): Promise<boolean> => {
  try {
    seanceReducer.setState(StateEnum.Loading);
    const responseDel = await delEffectuersApi(seance.effectues ?? []);

    if (responseDel) {
      seance = { ...seance, effectues: [] };
      const responseReq = await fetch(`${FetchUrl}/seance/delete`, {
        method: "DELETE",
        headers: customReqHeaders(),
        body: JSON.stringify(seance),
      });

      handlerErrorCustom("delSeanceApi", responseReq);
      getEffectuerAPi();
      getModulesAPi();
    }
    seanceReducer.setState(StateEnum.Loaded);
    return true;
  } catch (error) {
    console.log("error delSeanceApi" + error);
    seanceReducer.setMessage(`${getTxtError()} de la suppression de la seance`);
    seanceReducer.setState(StateEnum.Error);
    return false;
  }
};

//Del Seances
export const delSeancesApi = async (seances: ISeance[]): Promise<boolean> => {
  try {
    seanceReducer.setState(StateEnum.Loading);
    const responseReq = await fetch(`${FetchUrl}/seance/delete/all`, {
      method: "DELETE",
      headers: customReqHeaders(),
      body: JSON.stringify(seances),
    });

    handlerErrorCustom("delSeancesApi", responseReq);

    // moduleReducer.delEntityById(module.id);
    seanceReducer.setState(StateEnum.Loaded);
    return true;
  } catch (error) {
    console.log("error delSeancesApi" + error);
    seanceReducer.setMessage(`${getTxtError()} de la suppression des seances`);
    seanceReducer.setState(StateEnum.Error);
    return false;
  }
};
