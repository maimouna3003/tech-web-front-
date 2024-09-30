import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  NativeSelect,
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
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import IUtilisateur from "../../../models/Utilisateur.model";
import { useSignals } from "@preact/signals-react/runtime";

import { StateEnum } from "../../../strore/State";
import { delGroupeApi, updGroupesApi } from "../../../restApi/Groupe.api";
import { useGroupeReducer } from "../../../strore/reducer/Groupe.reducer";
import { useCurrentUserReducer } from "../../../strore/reducer/CurrentUser.reducer";
import { Profil } from "../../../models/Enum";
interface GroupeTabComponentProps {
  idModule?: string;
  groupes: IGroupe[];
  usersInModule?: IUtilisateur[];
}

const GroupeTabComponent: React.FC<GroupeTabComponentProps> = ({
  idModule,
  groupes,
  usersInModule,
}) => {
  const navigate = useNavigate();
  const onNav = (path: string) => {
    navigate(path);
  };
  //
  const groupeReducer = useGroupeReducer();

  useSignals();
  const currentUserReducer = useCurrentUserReducer();
  const user = currentUserReducer.getCurrentUserSignal().value.user;
  let idTuteur = "null";

  return (
    <Stack spacing={3}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={CustomeTable.styleThead} align="center">
                Nom
              </TableCell>
              {user?.profil === Profil.ADMINISTRATEUR && (
                <TableCell style={CustomeTable.styleThead} align="center">
                  Tuteur
                </TableCell>
              )}
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
                {user?.profil === Profil.ADMINISTRATEUR && (
                  <TableCell style={CustomeTable.styleBody} align="left">
                    {groupe.user?.nom === undefined && (
                      <>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel
                              variant="standard"
                              htmlFor="uncontrolled-native"
                            >
                              Tuteurs
                            </InputLabel>
                            <NativeSelect
                              onChange={({ target: { value } }) => {
                                idTuteur = value;
                              }}
                            >
                              <option value="null">Selectionner</option>

                              {usersInModule?.map((user, index) => (
                                <option key={user.id} value={user.id}>
                                  {user.nom} - {user.prenom}
                                </option>
                              ))}
                            </NativeSelect>
                            <Button
                              type="submit"
                              onClick={() => {
                                if (idTuteur === "null") {
                                  groupeReducer.setMessage(
                                    "veillez selectionner un tuteur"
                                  );
                                  groupeReducer.setState(StateEnum.Error);
                                }
                                //
                                groupe = {
                                  ...groupe,
                                  user: { id: idTuteur },
                                  effectues: [],
                                  module: { id: idModule },
                                };
                                updGroupesApi(groupe);
                              }}
                              sx={{ marginTop: 2 }}
                              variant="text"
                            >
                              Affecter
                            </Button>
                          </FormControl>
                        </Box>
                      </>
                    )}
                    {groupe.user?.nom} {groupe.user?.prenom}
                  </TableCell>
                )}
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
                  {/* BTN Remove tuteur */}

                  <>
                    {!(groupe.user?.nom === undefined) &&
                      user?.profil === Profil.ADMINISTRATEUR && (
                        <IconButton
                          onClick={() => {
                            groupe = {
                              ...groupe,
                              user: null,
                              effectues: [],
                              module: { id: idModule },
                            };
                            updGroupesApi(groupe);
                          }}
                        >
                          <PersonRemoveOutlinedIcon
                            fontSize="large"
                            color="error"
                          />
                        </IconButton>
                      )}
                  </>

                  {/* BTN details */}
                  {(!(groupe.user?.nom === undefined) ||
                    user?.profil === Profil.TUTEUR) && (
                    <IconButton
                      onClick={() =>
                        onNav(`${RoutesName.effectuer}/${groupe.id}`)
                      }
                    >
                      <VisibilityOutlinedIcon fontSize="large" color="info" />
                    </IconButton>
                  )}

                  {/* BTN delete */}

                  <>
                    {groupe.user?.nom === undefined &&
                      user?.profil === Profil.ADMINISTRATEUR && (
                        <IconButton onClick={() => delGroupeApi(groupe)}>
                          <DeleteOutlinedIcon fontSize="large" color="error" />
                        </IconButton>
                      )}
                  </>
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
