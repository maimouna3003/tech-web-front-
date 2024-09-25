import { logOut } from "../restApi/Auth.api";
import { useStateAppReducer } from "../strore/reducer/StateApp.reducer";

//CONFIG DATA TABLE
export const CustomeTable = {
  styleThead: { fontSize: 20, fontWeight: "bold", height: 70 },
  styleBody: { fontSize: 15, height: 60 },
};

//CONFIG ROUTES
export const RoutesName = {
  login: "/",
  dashboard: "/dashboard",
  module: {
    modules: "/modules",
    moduleDetails: "/moduleDetails",
    moduleUpd: "/moduleUpd",
    moduleAdd: "/moduleAdd",
  },
  groupe: {
    groupes: "/groupes",
    groupeUpd: "/groupeUpd",
    groupeAdd: "/groupeAdd",
  },
  planning: "/planning",
  effectuer: "/effectuer",
  utilisateurs: "/utilisateurs",
};

//CONFIG REQUESTES
export const customReqHeaders = (): Headers => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `bearer ${token}`);

  return myHeaders;
};
export const customReqHeadersLogin = (): Headers => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  return myHeaders;
};

export const handlerErrorCustom = (
  endPoint: string,
  response: Response
): Error | void => {
  if (!(response.status >= 200 && response.status <= 300)) {
    if (response.status === 401) {
      logOut();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useStateAppReducer().setMessageAppSignal(
        "Token expiré veillez genéré un nouveau token "
      );
    }
    console.log(
      `Error_Endpoint : ${endPoint} \n Status_code : ${response.status}`
    );
    throw new Error();
  }
};

export const getTxtError = (): string => {
  return "Une erreur c'est produit lors";
};
export const FetchUrl = process.env.REACT_APP_API_URL ?? "";
