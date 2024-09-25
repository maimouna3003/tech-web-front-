/* eslint-disable react-hooks/rules-of-hooks */
import IEffectuee from "../models/Effectuee.model";
import {
  customReqHeaders,
  FetchUrl,
  handlerErrorCustom,
} from "../services/Helpers.service";
import { useEffectuerReducer } from "../strore/reducer/Effectuer.reducer";
import { StateEnum } from "../strore/State";

const effectuerReducer = useEffectuerReducer();

//get Affectation
// export const getAffectationAPi = async (): Promise<boolean> => {
//   try {
//     stateReducer.stateApp(StateEnum.Loading);
//     const responseReq = await fetch(`${FetchUrl}/affectations`, {
//       method: "GET",
//       headers: customReqHeaders(),
//     });

//     handlerErrorCustom("getAffectationAPi", responseReq);

//     const response = await responseReq.json();
//     effectuerReducer.initEntities(response);
//     stateReducer.stateApp(StateEnum.Loaded);

//     return true;
//   } catch (error) {
//     console.log("error" + error);
//     stateReducer.addErrorApp("Une erreur c'est produit !");
//     stateReducer.stateApp(StateEnum.Error);
//     return false;
//   }
// };

//Add Effectuers
// export const addEffectuersApi = async (
//   effectuees: IEffectuee[]
// ): Promise<IEffectuee[]> => {
//   try {
//     const responseReq = await fetch(`${FetchUrl}/effectuees/add`, {
//       method: "POST",
//       headers: customReqHeaders(),
//       body: JSON.stringify(effectuees),
//     });

//     handlerErrorCustom("addEffectuersApi", responseReq);

//     const response = await responseReq.json();
//     const listNewEffectuer: IEffectuee[] = [...response];
//     console.log("liste effectuer created" + response);

//     return listNewEffectuer;
//   } catch (error) {
//     console.log("error effectuer add" + error);
//     stateReducer.addErrorApp("Une erreur c'est produit !");
//     stateReducer.stateApp(StateEnum.Error);
//     return [];
//   }
// };

//Upd Effectuer
export const updEffectuerApi = async (
  effectuer: IEffectuee
): Promise<boolean> => {
  try {
    const responseReq = await fetch(`${FetchUrl}/effectuer/update`, {
      method: "PUT",
      headers: customReqHeaders(),
      body: JSON.stringify(effectuer),
    });

    handlerErrorCustom("updEffectuerApi", responseReq);

    const response = await responseReq.json();
    effectuerReducer.updEntity(response);

    return true;
  } catch (error) {
    console.log("error" + error);

    return false;
  }
};

//Del Effectuers
export const delEffectuerApi = async (
  idModule: string,
  effectuer: IEffectuee
): Promise<boolean> => {
  try {
    const responseReq = await fetch(`${FetchUrl}/effectuer/delete`, {
      method: "DELETE",
      headers: customReqHeaders(),
      body: JSON.stringify(effectuer),
    });

    handlerErrorCustom("delEffectuerApi", responseReq);

    effectuerReducer.delEntityById(effectuer.id);

    return true;
  } catch (error) {
    console.log("error effectuer == " + error);
    return false;
  }
};

//Del Effectuers
export const delEffectuersApi = async (
  effectuers: IEffectuee[]
): Promise<boolean> => {
  try {
    const responseReq = await fetch(`${FetchUrl}/effectuer/delete/all`, {
      method: "DELETE",
      headers: customReqHeaders(),
      body: JSON.stringify(effectuers),
    });

    handlerErrorCustom("delEffectuersApi", responseReq);

    // moduleReducer.delEntityById(module.id);

    return true;
  } catch (error) {
    console.log("error effectuer == " + error);
    return false;
  }
};
