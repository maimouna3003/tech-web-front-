import React from "react";
import IGroupe from "../../../models/Groupe.model";
import GroupeFormComponent from "../../components/groupe/groupeForm.component";
import { useNavigate } from "react-router-dom";
import { RoutesName } from "../../../services/Helpers.service";
import { useGroupeReducer } from "../../../strore/reducer/Groupe.reducer";

interface GroupeAddPageProps {}

const GroupeAddPage: React.FC<GroupeAddPageProps> = () => {
  const navigate = useNavigate();
  const onNav = (path: string) => {
    navigate(path);
  };
  const groupeReducer = useGroupeReducer();

  let newGroupe: IGroupe = {
    nom: "",
    heureTotalEffectue: 0,
    heureTotalNonEffectue: 0,
    //module:{ }
  };

  //On submit
  const onSubmit = (groupeInput: IGroupe) => {
    //Add and nav
    groupeInput = { ...groupeInput, id: Date.now().toString() };
    if (groupeReducer.addEntity(groupeInput)) onNav(RoutesName.groupe.groupes);
  };

  return (
    <>
      <GroupeFormComponent onSubmit={onSubmit} groupe={newGroupe} />
    </>
  );
};

export default GroupeAddPage;
