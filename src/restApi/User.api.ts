/* eslint-disable react-hooks/rules-of-hooks */
import { FetchConfigs } from "../services/Helpers.service";
import { useUserReducer } from "../strore/reducer/User.reducer";
import { useStateReducer } from "../strore/reducer/State.reducer";
import { StateEnum } from "../strore/State";
import IUtilisateur from "../models/Utilisateur.model";

const stateReducer = useStateReducer();
const userReducer = useUserReducer();

//get User
export const getUsersAPi = async (): Promise<boolean> => {
  try {
    stateReducer.stateApp(StateEnum.Loading);
    const requeste = await fetch(`${FetchConfigs.url}/users`, {
      method: "GET",
      headers: FetchConfigs.headers,
    });

    const response = await requeste.json();
    userReducer.initEntities(response);
    stateReducer.stateApp(StateEnum.Loaded);

    return true;
  } catch (error) {
    console.log("error user" + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return false;
  }
};

//Add User
export const addUserApi = async (
  user: IUtilisateur
): Promise<boolean | IUtilisateur | undefined> => {
  try {
    stateReducer.stateApp(StateEnum.Loading);
    const requeste = await fetch(`${FetchConfigs.url}/user/add`, {
      method: "POST",
      headers: FetchConfigs.headers,
      body: JSON.stringify(user),
    });

    const response = await requeste.json();
    let newUser: IUtilisateur = { ...response };
    userReducer.addEntity(newUser);

    stateReducer.stateApp(StateEnum.Loaded);
    return newUser;
  } catch (error) {
    console.log("error" + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return false;
  }
};

//Upd User
export const updUserApi = async (user: IUtilisateur): Promise<boolean> => {
  try {
    stateReducer.stateApp(StateEnum.Loading);
    const requeste = await fetch(`${FetchConfigs.url}/user/update`, {
      method: "PUT",
      headers: FetchConfigs.headers,
      body: JSON.stringify(user),
    });

    const response = await requeste.json();
    userReducer.updEntity(response);
    stateReducer.stateApp(StateEnum.Loaded);

    return true;
  } catch (error) {
    console.log("error" + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return false;
  }
};

//Del User
export const delUserApi = async (user: IUtilisateur): Promise<boolean> => {
  try {
    stateReducer.stateApp(StateEnum.Loading);

    //Delete
    const requeste = await fetch(`${FetchConfigs.url}/user/delete`, {
      method: "DELETE",
      headers: FetchConfigs.headers,
      body: JSON.stringify(user),
    });

    if (requeste.status !== 200) {
      throw new Error();
    }
    userReducer.delEntityById(user.id);
    stateReducer.stateApp(StateEnum.Loaded);
    return true;
  } catch (error) {
    console.log("error user  == " + error);
    stateReducer.addErrorApp("Une erreur c'est produit !");
    stateReducer.stateApp(StateEnum.Error);
    return false;
  }
};
