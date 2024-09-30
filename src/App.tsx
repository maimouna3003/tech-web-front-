import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ModulePage from "./ui/pages/module/module.page";
import DashboardPage from "./ui/pages/home.page";
import { Grid2 } from "@mui/material";
import GroupePage from "./ui/pages/groupe/groupe.page";
import SideNavBar from "./ui/components/sideBar.component";
import { RoutesName } from "./services/Helpers.service";
import GroupeUpdPage from "./ui/pages/groupe/groupeUpd.page";
import GroupeAddPage from "./ui/pages/groupe/groupeAdd.page";
import ModuleUpdPage from "./ui/pages/module/moduleUpd.page";
import ModuleAddPage from "./ui/pages/module/moduleAdd.page";
import Login from "./ui/pages/login.page";
import EffectuerPage from "./ui/pages/effectuer.page";
import { useSignals } from "@preact/signals-react/runtime";
import { getModulesAPi } from "./restApi/Module.api";
import ModuleDetailsPage from "./ui/pages/module/moduleDetails.page";
import { getEffectuerAPi } from "./restApi/Effecture.api";
import { getUsersAPi } from "./restApi/User.api";
import UtilisateursPage from "./ui/pages/users/utilisateurs.page";
import { useCurrentUserReducer } from "./strore/reducer/CurrentUser.reducer";
import StateProgress from "./ui/components/state/stateProgress.component";
import PlanningPage from "./ui/pages/planning.page";
import { getCurrentUser } from "./restApi/Auth.api";

const PageLayout: React.FC = () => {
  //Api
  const isConnected = localStorage.getItem("isConnected");
  const email = localStorage.getItem("email");
  const currentUser = useCurrentUserReducer();
  if (
    isConnected === "true" ||
    currentUser.getCurrentUserSignal().value.isConnected
  ) {
    getCurrentUser(email ?? "");
    getModulesAPi();
    getEffectuerAPi();
    getUsersAPi();
  }
  useSignals();
  return (
    <>
      <Grid2 container spacing={10}>
        <Grid2 size={2}>
          <SideNavBar />
        </Grid2>
        <Grid2 direction={"column"} size={10}>
          <Grid2 size={1}>
            <div style={{ height: 50 }}>
              <StateProgress />
            </div>
          </Grid2>
          <Grid2 size={11}>
            <Outlet />
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      { path: RoutesName.login, element: <Login /> },
      { path: RoutesName.dashboard, element: <DashboardPage /> },

      //Path Module
      { path: RoutesName.module.modules, element: <ModulePage /> },
      {
        path: `${RoutesName.module.moduleUpd}/:id_module`,
        element: <ModuleUpdPage />,
      },
      {
        path: `${RoutesName.module.moduleDetails}/:id_module`,
        element: <ModuleDetailsPage />,
      },
      { path: RoutesName.module.moduleAdd, element: <ModuleAddPage /> },

      //Path Groupe
      { path: RoutesName.groupe.groupes, element: <GroupePage /> },
      {
        path: RoutesName.groupe.groupeAdd,
        element: <GroupeAddPage />,
      },
      {
        path: `${RoutesName.groupe.groupeUpd}/:id_groupe`,
        element: <GroupeUpdPage />,
      },
      { path: RoutesName.planning, element: <PlanningPage /> },
      {
        path: `${RoutesName.effectuer}/:id_groupe`,
        element: <EffectuerPage />,
      },
      { path: RoutesName.utilisateurs, element: <UtilisateursPage /> },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={routes} />;
};

export default App;
