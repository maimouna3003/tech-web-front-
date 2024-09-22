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
  parametres: "/parametres",
};

//CONFIG REQUESTES
const customReqHeaders = (): Headers => {
  const token = localStorage.getItem("token");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `bearer ${token}`);

  return myHeaders;
};
const customReqHeadersLogin = (): Headers => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  return myHeaders;
};

export const FetchConfigs = {
  url: process.env.REACT_APP_API_URL ?? "",
  headers: customReqHeaders(),
  headersLogin: customReqHeadersLogin(),
};
