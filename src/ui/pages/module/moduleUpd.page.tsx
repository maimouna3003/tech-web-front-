import React from "react";
import IModule from "../../../models/Module.model";
import ModuleFormComponent from "../../components/module/moduleForm.component";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesName } from "../../../services/Helpers.service";
import { useModuleReducer } from "../../../strore/reducer/Module.reducer";
import { updModuleApi } from "../../../restApi/Module.api";
import { Stack } from "@mui/material";

interface ModuleUpdPageProps {}

const ModuleUpdPage: React.FC<ModuleUpdPageProps> = () => {
  const navigate = useNavigate();
  const onNav = (path: string) => {
    navigate(path);
  };

  const moduleReducer = useModuleReducer();
  const { id_module } = useParams();
  let module = moduleReducer.getEntityById(id_module);

  const onSubmit = async (moduleInput: IModule) => {
    module = { ...module, ...moduleInput };
    //update and nav
    const response = await updModuleApi(module);
    if (response) onNav(RoutesName.module.modules);
  };

  return (
    <>
      <Stack style={{ position : 'relative', left : '130px' }}>
           <ModuleFormComponent onSubmit={onSubmit} module={module} />
      </Stack>

    </>
  );
};

export default ModuleUpdPage;
