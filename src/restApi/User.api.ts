/* eslint-disable react-hooks/rules-of-hooks */
import {
  customReqHeaders,
  FetchUrl,
  getTxtError,
  handlerErrorCustom,
} from "../services/Helpers.service";
import { useUserReducer } from "../strore/reducer/User.reducer";
import { StateEnum } from "../strore/State";
import IUtilisateur from "../models/Utilisateur.model";

const userReducer = useUserReducer();

//get User
export const getUsersAPi = async (): Promise<boolean> => {
  try {
    userReducer.setState(StateEnum.Loading);
    const responseReq = await fetch(`${FetchUrl}/users`, {
      method: "GET",
      headers: customReqHeaders(),
    });

    handlerErrorCustom("getUsersAPi", responseReq);

    const response = await responseReq.json();
    userReducer.initEntities(response);
    userReducer.setState(StateEnum.Loaded);
    return true;
  } catch (error) {
    console.log("error getUsersAPi" + error);
    userReducer.setMessage(`${getTxtError()} de la recupération des seances`);
    userReducer.setState(StateEnum.Error);
    return false;
  }
};

//Add User
export const addUserApi = async (
  user: IUtilisateur
): Promise<boolean | IUtilisateur | undefined> => {
  try {
    userReducer.setState(StateEnum.Loading);
    const responseReq = await fetch(`${FetchUrl}/user/add`, {
      method: "POST",
      headers: customReqHeaders(),
      body: JSON.stringify(user),
    });

    handlerErrorCustom("addUserApi", responseReq);

    const response = await responseReq.json();
    let newUser: IUtilisateur = { ...response };
    userReducer.addEntity(newUser);
    getUsersAPi();
    userReducer.setState(StateEnum.Loaded);
    return newUser;
  } catch (error) {
    console.log("error addUserApi" + error);
    userReducer.setMessage(`${getTxtError()} de l'ajout de la seances`);
    userReducer.setState(StateEnum.Error);
    return false;
  }
};

//Upd User
export const updUserApi = async (user: IUtilisateur): Promise<boolean> => {
  try {
    userReducer.setState(StateEnum.Loading);
    const responseReq = await fetch(`${FetchUrl}/user/update`, {
      method: "PUT",
      headers: customReqHeaders(),
      body: JSON.stringify(user),
    });

    handlerErrorCustom("updUserApi", responseReq);

    const response = await responseReq.json();
    userReducer.updEntity(response);
    userReducer.setState(StateEnum.Loaded);
    return true;
  } catch (error) {
    console.log("error updUserApi" + error);
    userReducer.setMessage(`${getTxtError()} de la mise à jour de la seances`);
    userReducer.setState(StateEnum.Error);
    return false;
  }
};

//Del User
export const delUserApi = async (user: IUtilisateur): Promise<boolean> => {
  try {
    userReducer.setState(StateEnum.Loading);
    const responseReq = await fetch(`${FetchUrl}/user/delete`, {
      method: "DELETE",
      headers: customReqHeaders(),
      body: JSON.stringify(user),
    });

    handlerErrorCustom("delUserApi", responseReq);

    userReducer.delEntityById(user.id);
    userReducer.setState(StateEnum.Loaded);
    return true;
  } catch (error) {
    console.log("error delUserApi" + error);
    userReducer.setMessage(`${getTxtError()} de la suppression de la seances`);
    userReducer.setState(StateEnum.Error);
    return false;
  }
};
