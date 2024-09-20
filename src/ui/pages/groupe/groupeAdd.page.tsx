import React from "react";
import IGroupe from "../../../models/Groupe.model";
import { wait } from "@testing-library/user-event/dist/utils";
import GroupeFormComponent from "../../components/groupe/groupeForm.component";
import { useNavigate } from "react-router-dom";
import { addGroupe } from "../../../services/groupe.service";
import { RoutesName } from "../../../services/helpers.service";

interface GroupeAddPageProps {}

const GroupeAddPage: React.FC<GroupeAddPageProps> = () => {
  const navigate = useNavigate();

  const onNav = (path: string) => {
    navigate(path);
  };

  let groupe: IGroupe = {
    nom: "",
    heureTotalEffectue: 0,
    heureTotalNonEffectue: 0,
    //module:{ }
  };

  const onSubmit = async (groupeInput: IGroupe) => {
    await wait(1000);
    //Add and nav
    if (addGroupe(groupeInput)) onNav(RoutesName.groupe.groupes);
  };

  return (
    <>
      <GroupeFormComponent onSubmit={onSubmit} groupe={groupe} />
    </>
  );
};

export default GroupeAddPage;
