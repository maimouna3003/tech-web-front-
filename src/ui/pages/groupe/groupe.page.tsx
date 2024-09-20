import React from "react";
import DataTest from "../../../services/dataTeste";
import GroupeTabComponent from "../../components/groupe/groupeTabList.component";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RoutesName } from "../../../services/helpers.service";
interface GroupePageProps {}

const GroupePage: React.FC<GroupePageProps> = () => {
  const navigate = useNavigate();

  const onNav = (path: string) => {
    navigate(path);
  };
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
          <GroupeTabComponent groupes={DataTest.DataGroupes} />
        </Box>
      </Stack>
    </>
  );
};

export default GroupePage;
