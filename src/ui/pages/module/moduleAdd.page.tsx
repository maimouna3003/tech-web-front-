import React from "react";
import IModule from "../../../models/Module.model";
import { wait } from "@testing-library/user-event/dist/utils";
import ModuleFormComponent from "../../components/module/moduleForm.component";
import { useNavigate } from "react-router-dom";
import { RoutesName } from "../../../services/helpers.service";
import { addModule } from "../../../services/Module.service";

interface ModuleAddPageProps {}

const ModuleAddPage: React.FC<ModuleAddPageProps> = () => {
  const navigate = useNavigate();

  const onNav = (path: string) => {
    navigate(path);
  };

  let module: IModule = {
    nom: "",
    heure: 0,
    semaine: 0,
  };

  const onSubmit = async (moduleInput: IModule) => {
    await wait(1000);
    //add and nav
    if (addModule(moduleInput)) onNav(RoutesName.module.modules);
  };

  return (
    <>
      <ModuleFormComponent onSubmit={onSubmit} module={module} />
    </>
  );
};

export default ModuleAddPage;
