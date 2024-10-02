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
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import React from "react";
import { CustomeTable } from "../../../services/Helpers.service";
import Moment from "react-moment";
import ISeance from "../../../models/Seance.model";
import { delSeanceApi } from "../../../restApi/Seance.api";
import { useCurrentUserReducer } from "../../../strore/reducer/CurrentUser.reducer";
import { Profil } from "../../../models/Enum";

interface SeanceTabComponentProps {
  idModule: string;
  seances: ISeance[];
}

const SeanceTabComponent: React.FC<SeanceTabComponentProps> = ({
  idModule,
  seances,
}) => {
  const currentUserReducer = useCurrentUserReducer();
  const user = currentUserReducer.getCurrentUserSignal().value.user;
  //

  return (
    <Stack spacing={3}>
      <TableContainer component={Paper} sx={{ position: 'relative', left: '-20px' }}> 
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor:'#5a5af5' }}>
              <TableCell style={CustomeTable.styleThead} align="left">
                Nom
              </TableCell>
              <TableCell style={CustomeTable.styleThead} align="center">
                Date de création
              </TableCell>
              {user?.profil === Profil.ADMINISTRATEUR && (
                <TableCell style={CustomeTable.styleThead} align="center">
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {seances.map((seance) => (
              <TableRow
                key={seance.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell style={CustomeTable.styleBody} align="left">
                  Seance - {seance.nom?.toString()}
                </TableCell>

                <TableCell style={CustomeTable.styleBody} align="center">
                  <Moment format="YYYY/MM/DD">{seance.createdAt}</Moment>
                </TableCell>
                {user?.profil === Profil.ADMINISTRATEUR && (
                  <TableCell style={CustomeTable.styleBody} align="center">
                    <IconButton onClick={() => delSeanceApi(seance)}>
                      <DeleteOutlinedIcon fontSize="large" color="error" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default SeanceTabComponent;
