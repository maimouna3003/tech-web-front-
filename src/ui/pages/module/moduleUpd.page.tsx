import React from "react";
import IModule from "../../../models/Module.model";
import { wait } from "@testing-library/user-event/dist/utils";
import ModuleFormComponent from "../../components/module/moduleForm.component";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesName } from "../../../services/helpers.service";
import { getModuleById, updModule } from "../../../services/Module.service";

interface ModuleUpdPageProps {}

const ModuleUpdPage: React.FC<ModuleUpdPageProps> = () => {
  const navigate = useNavigate();

  const onNav = (path: string) => {
    navigate(path);
  };
  const { id_module } = useParams();
  let module = getModuleById(id_module);

  const onSubmit = async (moduleInput: IModule) => {
    await wait(1000);
    module = { ...module, ...moduleInput };
    //update and nav
    if (updModule(module)) onNav(RoutesName.module.modules);
  };

  return (
    <>
      <ModuleFormComponent onSubmit={onSubmit} module={module} />
    </>
  );
};

export default ModuleUpdPage;
