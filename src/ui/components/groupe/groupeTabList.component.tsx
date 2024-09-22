import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { CustomeTable, RoutesName } from "../../../services/Helpers.service";
import Moment from "react-moment";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";
import IGroupe from "../../../models/Groupe.model";
import { useGroupeReducer } from "../../../strore/reducer/Groupe.reducer";

interface GroupeTabComponentProps {
  groupes: IGroupe[];
}

const GroupeTabComponent: React.FC<GroupeTabComponentProps> = ({ groupes }) => {
  const navigate = useNavigate();

  const onNav = (path: string) => {
    navigate(path);
  };
  //
  const groupeReducer = useGroupeReducer();

  return (
    <Stack spacing={3}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={CustomeTable.styleThead} align="center">
                Nom
              </TableCell>
              <TableCell style={CustomeTable.styleThead} align="center">
                Heure Total Effectués
              </TableCell>

              <TableCell style={CustomeTable.styleThead} align="center">
                Heure Total Non Effectués
              </TableCell>

              <TableCell style={CustomeTable.styleThead} align="center">
                Date Création
              </TableCell>
              <TableCell style={CustomeTable.styleThead} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupes.map((groupe) => (
              <TableRow
                key={groupe.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell style={CustomeTable.styleBody} align="left">
                  {groupe.nom?.toUpperCase()}
                </TableCell>
                <TableCell style={CustomeTable.styleBody} align="center">
                  {groupe.heureTotalEffectue} - heures
                </TableCell>
                <TableCell style={CustomeTable.styleBody} align="center">
                  {groupe.heureTotalNonEffectue} - heures
                </TableCell>
                <TableCell style={CustomeTable.styleBody} align="center">
                  <Moment format="YYYY/MM/DD">{groupe.createdAt}</Moment>
                </TableCell>
                <TableCell style={CustomeTable.styleBody} align="center">
                  <IconButton
                    onClick={() =>
                      onNav(`${RoutesName.effectuer}/${groupe.id}`)
                    }
                  >
                    <VisibilityOutlinedIcon fontSize="large" color="info" />
                  </IconButton>
                  {/* <IconButton
                    onClick={() =>
                      onNav(`${RoutesName.groupe.groupeUpd}/${groupe.id}`)
                    }
                  >
                    <DriveFileRenameOutlineOutlinedIcon
                      fontSize="large"
                      color="info"
                    />
                  </IconButton> */}
                  <IconButton
                    onClick={() => groupeReducer.delEntityById(groupe.id)}
                  >
                    <DeleteOutlinedIcon fontSize="large" color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default GroupeTabComponent;
