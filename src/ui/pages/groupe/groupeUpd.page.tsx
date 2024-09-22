import React from "react";
import IGroupe from "../../../models/Groupe.model";
import GroupeFormComponent from "../../components/groupe/groupeForm.component";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesName } from "../../../services/Helpers.service";
import { useGroupeReducer } from "../../../strore/reducer/Groupe.reducer";

interface GroupeUpdPageProps {}

const GroupeUpdPage: React.FC<GroupeUpdPageProps> = () => {
  const navigate = useNavigate();
  const onNav = (path: string) => {
    navigate(path);
  };

  const { id_groupe } = useParams();
  const groupeReducer = useGroupeReducer();
  let groupe = groupeReducer.getEntityById(id_groupe);

  //On submit
  const onSubmit = (groupeInput: IGroupe) => {
    groupe = { ...groupe, ...groupeInput };
    //update and nav
    if (groupeReducer.updEntity(groupe)) onNav(RoutesName.groupe.groupes);
  };

  return (
    <>
      <GroupeFormComponent onSubmit={onSubmit} groupe={groupe} />
    </>
  );
};

export default GroupeUpdPage;
