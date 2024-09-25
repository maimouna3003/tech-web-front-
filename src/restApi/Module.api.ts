/* eslint-disable react-hooks/rules-of-hooks */
import IGroupe from "../models/Groupe.model";
import IModule from "../models/Module.model";
import ISeance from "../models/Seance.model";
import {
  customReqHeaders,
  FetchUrl,
  getTxtError,
  handlerErrorCustom,
} from "../services/Helpers.service";
import { useModuleReducer } from "../strore/reducer/Module.reducer";
import { StateEnum } from "../strore/State";
import { delGroupesApi } from "./Groupe.api";
import { addSeancesApi, delSeancesApi } from "./Seance.api";

const moduleReducer = useModuleReducer();

//get Module
export const getModulesAPi = async (): Promise<boolean> => {
  try {
    moduleReducer.setState(StateEnum.Loading);
    console.log(" entrer getModulesAPi");

    const responseReq = await fetch(`${FetchUrl}/`, {
      method: "GET",
      headers: customReqHeaders(),
    });

    handlerErrorCustom("getModulesAPi", responseReq);

    const response = await responseReq.json();
    moduleReducer.initEntities(response);
    moduleReducer.setState(StateEnum.Loaded);
    console.log(" sorti getModulesAPi");

    return true;
  } catch (error) {
    console.log("error getModulesAPi" + error);
    moduleReducer.setMessage(`${getTxtError()} de la recupération des modules`);
    moduleReducer.setState(StateEnum.Error);
    return false;
  }
};

//Get Module Api
export const getModuleByIdAPi = async (id: string): Promise<boolean> => {
  try {
    moduleReducer.setState(StateEnum.Loading);
    const responseReq = await fetch(`${FetchUrl}/module/${id}`, {
      method: "GET",
      headers: customReqHeaders(),
    });

    handlerErrorCustom("getModuleByIdAPi", responseReq);

    const response = await responseReq.json();
    moduleReducer.getSignalEntities().value = { ...response };
    moduleReducer.setState(StateEnum.Loaded);
    return true;
  } catch (error) {
    console.log("error getModuleByIdAPi" + error);
    moduleReducer.setMessage(
      `${getTxtError()} de la recupération de la module`
    );
    moduleReducer.setState(StateEnum.Error);
    return false;
  }
};

//Add Module
export const addModuleApi = async (
  module: IModule
): Promise<boolean | string | undefined> => {
  try {
    moduleReducer.setState(StateEnum.Loading);
    const responseReq = await fetch(`${FetchUrl}/module/add`, {
      method: "POST",
      headers: customReqHeaders(),
      body: JSON.stringify(module),
    });

    handlerErrorCustom("addModuleApi", responseReq);

    const response = await responseReq.json();
    let newModule: IModule = { ...response };
    let nbrSeance = 1;
    if (newModule.heure !== undefined) {
      nbrSeance = newModule.heure / 2;
    }

    let listSeances: ISeance[] = [];

    for (let index = 0; index < nbrSeance; index++) {
      const seance: ISeance = {
        nom: index + 1,
        module: newModule,
      };
      listSeances.push(seance);
    }

    //Inserte Seances
    const responseSeance = await addSeancesApi(listSeances);

    newModule = { ...newModule, seances: responseSeance };
    if (responseSeance) moduleReducer.addEntity(newModule);
    moduleReducer.setState(StateEnum.Loaded);
    return newModule.id;
  } catch (error) {
    console.log("error addModuleApi" + error);
    moduleReducer.setMessage(`${getTxtError()} de l'ajout de la module`);
    moduleReducer.setState(StateEnum.Error);
    return false;
  }
};

//Upd Module
export const updModuleApi = async (module: IModule): Promise<boolean> => {
  try {
    moduleReducer.setState(StateEnum.Loading);
    module = { ...module, groupes: [], seances: [] };
    const responseReq = await fetch(`${FetchUrl}/module/update`, {
      method: "PUT",
      headers: customReqHeaders(),
      body: JSON.stringify(module),
    });

    handlerErrorCustom("updModuleApi", responseReq);
    moduleReducer.setState(StateEnum.Loaded);
    getModulesAPi();
    return true;
  } catch (error) {
    console.log("error updModuleApi" + error);
    moduleReducer.setMessage(`${getTxtError()} de la mise à jour de la module`);
    moduleReducer.setState(StateEnum.Error);
    return false;
  }
};

//Del Module
export const delModuleApi = async (module: IModule): Promise<boolean> => {
  try {
    moduleReducer.setState(StateEnum.Loading);
    const groupes: IGroupe[] | undefined = module.groupes?.map((groupe) => ({
      ...groupe,
      user: {},
    }));
    const responseDelGroupes = await delGroupesApi(groupes ?? []);
    if (responseDelGroupes) {
      const seances: ISeance[] | undefined = module.seances?.map((seance) => ({
        ...seance,
        effectues: [],
      }));
      //Delete Cascade
      const responseDeleteSeances = await delSeancesApi(seances ?? []);
      const moduleDelete: IModule = {
        ...module,
        seances: [],
        users: [],
        groupes: [],
      };

      if (responseDeleteSeances) {
        const responseReq = await fetch(`${FetchUrl}/module/delete`, {
          method: "DELETE",
          headers: customReqHeaders(),
          body: JSON.stringify(moduleDelete),
        });

        handlerErrorCustom("delModuleApi", responseReq);

        moduleReducer.delEntityById(module.id);
        moduleReducer.setState(StateEnum.Loaded);
      }
    }
    return true;
  } catch (error) {
    console.log("error delModuleApi" + error);
    moduleReducer.setMessage(
      `${getTxtError()} de la suppresssion de la module`
    );
    moduleReducer.setState(StateEnum.Error);
    return false;
  }
};
