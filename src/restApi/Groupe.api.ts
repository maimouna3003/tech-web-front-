/* eslint-disable react-hooks/rules-of-hooks */
import IGroupe from "../models/Groupe.model";
import {
  customReqHeaders,
  FetchUrl,
  getTxtError,
  handlerErrorCustom,
} from "../services/Helpers.service";
import { useGroupeReducer } from "../strore/reducer/Groupe.reducer";
import { StateEnum } from "../strore/State";
import { delEffectuersApi, getEffectuerAPi } from "./Effecture.api";
import { getModulesAPi } from "./Module.api";

const groupeReducer = useGroupeReducer();

//Add Groupes
export const addGroupesApi = async (groupes: IGroupe[]): Promise<IGroupe[]> => {
  try {
    groupeReducer.setState(StateEnum.Loading);
    const responseReq = await fetch(`${FetchUrl}/groupes/add`, {
      method: "POST",
      headers: customReqHeaders(),
      body: JSON.stringify(groupes),
    });

    handlerErrorCustom("addGroupesApi", responseReq);

    const response = await responseReq.json();
    const listNewGroupe: IGroupe[] = [...response];
    groupeReducer.setState(StateEnum.Loaded);
    return listNewGroupe;
  } catch (error) {
    console.log("error addGroupesApi" + error);
    groupeReducer.setMessage(`${getTxtError()} de la recupération des groupes`);
    groupeReducer.setState(StateEnum.Error);
    return [];
  }
};

//Upd Groupes
export const updGroupesApi = async (groupe: IGroupe) => {
  try {
    groupeReducer.setState(StateEnum.Loading);
    const responseReq = await fetch(`${FetchUrl}/groupe/update`, {
      method: "PUT",
      headers: customReqHeaders(),
      body: JSON.stringify(groupe),
    });

    handlerErrorCustom("updGroupesApi", responseReq);

    await responseReq.json();
    getModulesAPi();
    getEffectuerAPi();
    // getModuleByIdAPi(groupe.module?.id ?? "");
    // groupeReducer.updEntity(response);
    groupeReducer.setState(StateEnum.Loaded);
  } catch (error) {
    console.log("error updGroupesApi" + error);
    groupeReducer.setMessage(`${getTxtError()} de la mise à jour du groupe`);
    groupeReducer.setState(StateEnum.Error);
  }
};

//Del Groupes
export const delGroupeApi = async (groupe: IGroupe): Promise<boolean> => {
  try {
    const responseDel = await delEffectuersApi(groupe.effectues ?? []);
    if (responseDel) {
      console.log(" entrer delGroupeApi");

      groupeReducer.setState(StateEnum.Loading);
      groupe = { ...groupe, effectues: [] };
      const responseReq = await fetch(`${FetchUrl}/groupe/delete`, {
        method: "DELETE",
        headers: customReqHeaders(),
        body: JSON.stringify(groupe),
      });

      handlerErrorCustom("delGroupeApi", responseReq);

      groupeReducer.setState(StateEnum.Loaded);
      console.log(" sorti delGroupeApi");
      getModulesAPi();
    }
    return true;
  } catch (error) {
    console.log("error delGroupeApi" + error);
    groupeReducer.setMessage(`${getTxtError()} de la suppression du groupe`);
    groupeReducer.setState(StateEnum.Error);
    return false;
  }
};

//Del Groupes and effectuer
export const delGroupesApi = async (groupes: IGroupe[]): Promise<boolean> => {
  try {
    groupeReducer.setState(StateEnum.Loading);
    groupes.forEach(async (groupe) => {
      const res = await delEffectuersApi(groupe.effectues ?? []);
      if (res) delGroupeApi(groupe);
    });

    return true;
  } catch (error) {
    console.log("error delGroupesApi" + error);
    groupeReducer.setMessage(`${getTxtError()} de la suppression des groupes`);
    groupeReducer.setState(StateEnum.Error);
    return false;
  }
};

// export const delGroupesApi = async (groupes: IGroupe[]): Promise<boolean> => {
//   try {
//     groupeReducer.setState(StateEnum.Loading);
//     groupes.forEach((groupe) => {
//       delEffectuersApi(groupe.effectues ?? []);
//     });
//     const groupesDel: IGroupe[] | undefined = groupes.map((groupe) => ({
//       ...groupe,
//       user: {},
//       effectues: [],
//     }));
//     const responseReq = await fetch(`${FetchUrl}/groupe/delete/all`, {
//       method: "DELETE",
//       headers: customReqHeaders(),
//       body: JSON.stringify(groupesDel),
//     });

//     handlerErrorCustom("delGroupesApi", responseReq);

//     groupeReducer.setState(StateEnum.Loaded);
//     return true;
//   } catch (error) {
//     console.log("error delGroupesApi" + error);
//     groupeReducer.setMessage(`${getTxtError()} de la suppression des groupes`);
//     groupeReducer.setState(StateEnum.Error);
//     return false;
//   }
// };
