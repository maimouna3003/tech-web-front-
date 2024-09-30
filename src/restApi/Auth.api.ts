import IUserLogin from "../models/UserLogin.model";
import {
  customReqHeaders,
  customReqHeadersLogin,
  FetchUrl,
  handlerErrorCustom,
} from "../services/Helpers.service";
import { useCurrentUserReducer } from "../strore/reducer/CurrentUser.reducer";
import { getEffectuerAPi } from "./Effecture.api";
import { getModulesAPi } from "./Module.api";
import { getUsersAPi } from "./User.api";

// eslint-disable-next-line react-hooks/rules-of-hooks
const currentUserReducer = useCurrentUserReducer();

//Connected
export const login = async (userLogin: IUserLogin): Promise<boolean> => {
  try {
    const responseReq = await fetch(`${FetchUrl}/login`, {
      method: "POST",
      headers: customReqHeadersLogin(),
      body: JSON.stringify(userLogin),
    });

    //
    handlerErrorCustom("login", responseReq);

    const response = await responseReq.json();
    currentUserReducer.setCurrentUserSignal({
      email: userLogin.userEmail,
      isConnected: true,
      user: null,
    });

    //Saved in local storage
    localStorage.setItem("token", response.token);
    localStorage.setItem("email", userLogin.userEmail);
    localStorage.setItem("isConnected", "true");
    //Api
    getCurrentUser(userLogin.userEmail);
    getModulesAPi();
    getEffectuerAPi();
    getUsersAPi();

    return true;
  } catch (error) {
    console.log("Email ou mots de pass incorrect");

    // stateReducer.addErrorApp("Email ou mots de pass incorrect !");
    //    console.log("error getAffectationAPi" + error);
    //    effectuerReducer.setMessage(
    //      `${getTxtError()} de la recupération des effectueés`
    //    );
    //    effectuerReducer.setState(StateEnum.Error);
    return false;
  }
};

export const getCurrentUser = async (email: string): Promise<boolean> => {
  try {
    const responseReq = await fetch(`${FetchUrl}/user/currentUser/${email}`, {
      method: "GET",
      headers: customReqHeaders(),
    });

    //
    handlerErrorCustom("getCurrentUser", responseReq);

    const user = await responseReq.json();
    currentUserReducer.setCurrentUserSignal({
      email,
      isConnected: true,
      user,
    });
    localStorage.setItem(
      "currentUser",
      JSON.stringify(currentUserReducer.getCurrentUserSignal().value)
    );
    return true;
  } catch (error) {
    console.log("error getCurrentUser" + error);
    return false;
  }
};
//Disconnected
export const logOut = () => {
  //
  currentUserReducer.setCurrentUserSignal({
    email: null,
    isConnected: false,
    user: null,
  });

  //Remove in local storage
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("isConnected");
};
