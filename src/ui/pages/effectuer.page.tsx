import {
  Box,
  Button,
  Checkbox,
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
  TextField,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomeTable } from "../../services/Helpers.service";
import Moment from "react-moment";
import { useEffectuerReducer } from "../../strore/reducer/Effectuer.reducer";
import { useSignals } from "@preact/signals-react/runtime";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { updEffectuerApi } from "../../restApi/Effecture.api";
import { Profil } from "../../models/Enum";
import { useCurrentUserReducer } from "../../strore/reducer/CurrentUser.reducer";
const EffectuerPage: React.FC = () => {
  const { id_groupe } = useParams();
  const navigate = useNavigate();

  const onNav = () => {
    navigate(-1);
  };

  const effectuerReducer = useEffectuerReducer();
  const effectues = effectuerReducer.getSeancesByGroupe(id_groupe);
  const heureEffectuer = effectuerReducer.getEffectuerTrue(id_groupe);
  const heureNoEffectuer = effectuerReducer.getEffectuerFalse(id_groupe);
  useSignals();
  const currentUserReducer = useCurrentUserReducer();
  const user = currentUserReducer.getCurrentUserSignal().value.user;
  return (
    <>
      <Stack spacing={3}>
        <Stack>
          <IconButton onClick={() => onNav()}>
            <ReplyAllIcon fontSize="large" color="info" />
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={3}>
          <Stack>SEANCE List: </Stack>
          <Stack>
            Heures total effectuées = {heureEffectuer.value.length * 2} - heures
          </Stack>
          <Stack>
            Heures total Non effectuées = {heureNoEffectuer.value.length * 2} -
            heures
          </Stack>
        </Stack>
        <Box
          component="section"
          sx={{ m: 10, p: 4, border: "1px dashed #F2901D" }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={CustomeTable.styleThead} align="center">
                    Nom
                  </TableCell>
                  <TableCell style={CustomeTable.styleThead} align="center">
                    Seances effectuées
                  </TableCell>

                  <TableCell style={CustomeTable.styleThead} align="center">
                    Seances non effectuées
                  </TableCell>

                  <TableCell style={CustomeTable.styleThead} align="center">
                    Date séance
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {effectues.map((effectue) => (
                  <TableRow
                    key={effectue.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell style={CustomeTable.styleBody} align="left">
                      Seance - {effectue.seance?.nom?.toString()}
                    </TableCell>
                    <TableCell style={CustomeTable.styleBody} align="center">
                      <Checkbox
                        disabled={
                          user?.profil === Profil.ADMINISTRATEUR ? false : true
                        }
                        size="large"
                        checked={effectue.effectuer}
                        color="success"
                        onClick={() => {
                          updEffectuerApi({
                            ...effectue,
                            effectuer: !effectue.effectuer,
                            groupe: { id: effectue.groupe?.id },
                            seance: { id: effectue.seance?.id },
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell style={CustomeTable.styleBody} align="center">
                      <Checkbox
                        disabled={
                          user?.profil === Profil.ADMINISTRATEUR ? false : true
                        }
                        size="large"
                        checked={!effectue.effectuer}
                        color="error"
                        onClick={() => {
                          updEffectuerApi({
                            ...effectue,
                            effectuer: !effectue.effectuer,
                            groupe: { id: effectue.groupe?.id },
                            seance: { id: effectue.seance?.id },
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell style={CustomeTable.styleBody} align="center">
                      <>
                        {user?.profil === Profil.ADMINISTRATEUR && (
                          <FormControl fullWidth>
                            <TextField
                              type="date"
                              id="standard-basic"
                              variant="standard"
                              onChange={({ target: { value } }) => {
                                console.log("date est == " + value);
                                effectue.createdAt = value;
                                updEffectuerApi({
                                  ...effectue,
                                  groupe: { id: effectue.groupe?.id },
                                  seance: { id: effectue.seance?.id },
                                });
                              }}
                            />
                          </FormControl>
                        )}
                      </>
                      <Moment format="DD/MM/YYYY">{effectue.createdAt}</Moment>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </>
  );
};

export default EffectuerPage;
