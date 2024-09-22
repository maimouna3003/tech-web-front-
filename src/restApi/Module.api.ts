/* eslint-disable react-hooks/rules-of-hooks */
import IModule from "../models/Module.model";
import ISeance from "../models/Seance.model";
import IUtilisateur from "../models/Utilisateur.model";
import { FetchConfigs } from "../services/Helpers.service";
import { useModuleReducer } from "../strore/reducer/Module.reducer";
import { useStateReducer } from "../strore/reducer/State.reducer";
import { StateEnum } from "../strore/State";
import { addSeancesApi, delSeancesApi } from "./Seance.api";

const stateReducer = useStateReducer();
const moduleReducer = useModuleReducer();

//get Module
export const getModulesAPi = async (): Promise<boolean> => {
  try {
    stateReducer.stateApp(StateEnum.Loading);
    const requeste = await fetch(`${FetchConfigs.url}/`, {
      method: "GET",
      headers: FetchConfigs.headers,
    });

    const response = await requeste.json();
    moduleReducer.initEntities(response);
    stateReducer.stateApp(StateEnum.Loaded);

    return true;
  } catch (error) {
    console.log("error" + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return false;
  }
};

//Add Module
export const addModuleApi = async (
  module: IModule
): Promise<boolean | string | undefined> => {
  try {
    stateReducer.stateApp(StateEnum.Loading);
    const requeste = await fetch(`${FetchConfigs.url}/module/add`, {
      method: "POST",
      headers: FetchConfigs.headers,
      body: JSON.stringify(module),
    });

    const response = await requeste.json();
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

    stateReducer.stateApp(StateEnum.Loaded);

    return newModule.id;
  } catch (error) {
    console.log("error" + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return false;
  }
};

//Upd Module
export const updModuleApi = async (module: IModule): Promise<boolean> => {
  try {
    stateReducer.stateApp(StateEnum.Loading);
    module = { ...module, groupes: [], seances: [] };
    const requeste = await fetch(`${FetchConfigs.url}/module/update`, {
      method: "PUT",
      headers: FetchConfigs.headers,
      body: JSON.stringify(module),
    });

    const response = await requeste.json();
    moduleReducer.updEntity(response);
    stateReducer.stateApp(StateEnum.Loaded);

    return true;
  } catch (error) {
    console.log("error" + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return false;
  }
};

//Del Module
export const delModuleApi = async (module: IModule): Promise<boolean> => {
  try {
    stateReducer.stateApp(StateEnum.Loading);

    //Delete Cascade
    const responseDeleteSeances = await delSeancesApi(module.seances ?? []);
    const moduleDelete: IModule = { ...module, seances: [] };
    if (responseDeleteSeances) {
      const requeste = await fetch(`${FetchConfigs.url}/module/delete`, {
        method: "DELETE",
        headers: FetchConfigs.headers,
        body: JSON.stringify(moduleDelete),
      });

      if (requeste.status !== 200) {
        throw new Error();
      }
      moduleReducer.delEntityById(module.id);
      stateReducer.stateApp(StateEnum.Loaded);
    }
    return true;
  } catch (error) {
    console.log("error module  == " + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return false;
  }
};
