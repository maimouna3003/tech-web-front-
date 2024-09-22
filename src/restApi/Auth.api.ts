import IUserLogin from "../models/UserLogin.model";
import { FetchConfigs } from "../services/Helpers.service";
import { useStateReducer } from "../strore/reducer/State.reducer";
import { StateEnum } from "../strore/State";
import { getEffcetuerAPi } from "./Effecture.api";
import { getModulesAPi } from "./Module.api";
import { getUsersAPi } from "./User.api";
// eslint-disable-next-line react-hooks/rules-of-hooks
const stateReducer = useStateReducer();

//Connected
export const login = async (userLogin: IUserLogin): Promise<boolean> => {
  try {
    const requeste = await fetch(`${FetchConfigs.url}/login`, {
      method: "POST",
      headers: FetchConfigs.headersLogin,
      body: JSON.stringify(userLogin),
    });

    const response = await requeste.json();
    //
    stateReducer.updCurrentUser({
      email: userLogin.userEmail,
      isConnected: true,
      profil: null,
    });

    //Api
    getModulesAPi();
    getEffcetuerAPi();
    getUsersAPi();

    //Saved in local storage
    localStorage.setItem("token", response.token);
    localStorage.setItem("email", userLogin.userEmail);
    localStorage.setItem("isConnected", "true");
    return true;
  } catch (error) {
    console.log("Email ou mots de pass incorrect");

    stateReducer.addErrorApp("Email ou mots de pass incorrect !");
    stateReducer.stateApp(StateEnum.Error);
    return false;
  }
};

//Disconnected
export const logOut = () => {
  //
  stateReducer.updCurrentUser({
    email: null,
    isConnected: false,
    profil: null,
  });

  //Remove in local storage
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("isConnected");
};
