import React from "react";
import GroupeTabComponent from "../../components/groupe/groupeTabList.component";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RoutesName } from "../../../services/Helpers.service";
import { useSignals } from "@preact/signals-react/runtime";
import { useGroupeReducer } from "../../../strore/reducer/Groupe.reducer";

interface GroupePageProps {}

const GroupePage: React.FC<GroupePageProps> = () => {
  const navigate = useNavigate();

  const onNav = (path: string) => {
    navigate(path);
  };

  const groupesSignal = useGroupeReducer().getSignalEntities();
  useSignals();

  return (
    <>
      <Stack>
        <Stack
          sx={{ m: 5, p: 2, border: "1px dashed #F2901D" }}
          direction="row"
          spacing={8}
        >
          <Stack> LISTE GROUPE</Stack>

          <Stack>
            <Button
              onClick={() => onNav(RoutesName.groupe.groupeAdd)}
              color="success"
              type="submit"
              variant="outlined"
            >
              Ajouter groupe
            </Button>
          </Stack>
        </Stack>
        <Box
          component="section"
          sx={{ m: 10, p: 4, border: "1px dashed #F2901D" }}
        >
          <GroupeTabComponent groupes={groupesSignal.value} />
        </Box>
      </Stack>
    </>
  );
};

export default GroupePage;
