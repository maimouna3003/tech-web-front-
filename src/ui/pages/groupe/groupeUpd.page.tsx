import React from "react";
import IGroupe from "../../../models/Groupe.model";
import { wait } from "@testing-library/user-event/dist/utils";
import GroupeFormComponent from "../../components/groupe/groupeForm.component";
import { useNavigate, useParams } from "react-router-dom";
import { getGroupeById, updGroupe } from "../../../services/groupe.service";
import { RoutesName } from "../../../services/helpers.service";

interface GroupeUpdPageProps {}

const GroupeUpdPage: React.FC<GroupeUpdPageProps> = () => {
  const navigate = useNavigate();

  const onNav = (path: string) => {
    navigate(path);
  };
  const { id_groupe } = useParams();
  let groupe = getGroupeById(id_groupe);

  const onSubmit = async (groupeInput: IGroupe) => {
    await wait(1000);
    groupe = { ...groupe, ...groupeInput };
    //update and nav
    if (updGroupe(groupe)) onNav(RoutesName.groupe.groupes);
  };

  return (
    <>
      <GroupeFormComponent onSubmit={onSubmit} groupe={groupe} />
    </>
  );
};

export default GroupeUpdPage;
