import IModule from "../models/Module.model";
import IUtilisateur from "../models/Utilisateur.model";
import { updModuleApi } from "../restApi/Module.api";

//Traitement d'affectation Module
export const affectationUserModuleService = (
  module: IModule,
  user: IUtilisateur
) => {
  user = { ...user, modules: [], groupes: [] };
  let listUsers = module.users;
  listUsers?.push(user);
  module = { ...module, users: listUsers };

  updModuleApi(module);
};

//Suupression d'affectation Module
export const delAffectationUserModuleService = (
  module: IModule,
  user: IUtilisateur
) => {
  let listUsers = module.users;
  listUsers = listUsers?.filter(
    (userAffectation) => userAffectation.id !== user.id
  );
  module = { ...module, users: listUsers };

  updModuleApi(module);
};
//Traitement user no affecter Module
export const getUsersNoAffectationModuleService = (
  module: IModule,
  users: IUtilisateur[]
): IUtilisateur[] => {
  const usersAffected = module.users;
  const usersNoAffected: IUtilisateur[] = [];
  users.forEach((users) => {
    let retrouver = false;
    usersAffected?.forEach((userAffected) => {
      if (users.id === userAffected.id) {
        retrouver = true;
      }
    });
    if (!retrouver) usersNoAffected.push(users);
  });

  return usersNoAffected;
};
