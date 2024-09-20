import IModule from "../models/Module.model";
import DataTest from "./dataTeste";

//::::
export const getModuleById = (id: string | undefined): IModule | undefined => {
  return DataTest.DataModules.find((module) => module.id === id);
};

//Update module in local
export const addModule = (moduleInput: IModule): Boolean => {
  DataTest.DataModules.push(moduleInput);
  return true;
};

//Update module in local
export const updModule = (moduleInput: IModule): Boolean => {
  DataTest.DataModules = DataTest.DataModules.map((module) =>
    module.id === moduleInput.id ? moduleInput : module
  );
  return true;
};

//Delete module in local
export const delModuleById = (id: string | undefined): void => {
  DataTest.DataModules = DataTest.DataModules.filter(
    (module) => module.id !== id
  );
};
