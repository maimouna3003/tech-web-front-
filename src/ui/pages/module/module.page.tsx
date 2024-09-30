import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, IconButton, Stack } from "@mui/material";
import Moment from "react-moment";
import { CustomeTable, RoutesName } from "../../../services/Helpers.service";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";
import { useModuleReducer } from "../../../strore/reducer/Module.reducer";
import { useSignals } from "@preact/signals-react/runtime";
import { StateEnum } from "../../../strore/State";
import { delModuleApi } from "../../../restApi/Module.api";
import SkeletonTabComponent from "../../components/state/skeleton.component";
import { useCurrentUserReducer } from "../../../strore/reducer/CurrentUser.reducer";
import { Profil } from "../../../models/Enum";

const ModulePage: React.FC = () => {
  const navigate = useNavigate();

  const onNav = (path: string) => {
    navigate(path);
  };

  //Reducer
  useSignals();
  const currentUserReducer = useCurrentUserReducer();
  const user = currentUserReducer.getCurrentUserSignal().value.user;
  const moduleReducer = useModuleReducer();
  const modulesSignal = moduleReducer.getSignalEntities();
  let modules = [];
  if (user?.profil === Profil.ADMINISTRATEUR) {
    modules = modulesSignal.value;
  } else {
    modules = user?.modules ?? [];
  }
  console.log("page list modules");
  return (
    <>
      <Stack spacing={3}>
        <Stack
          sx={{ m: 5, p: 2, border: "1px dashed #F2901D" }}
          direction="row"
          spacing={8}
        >
          <Stack> LISTE MODULE</Stack>
          {user?.profil === Profil.ADMINISTRATEUR && (
            <Stack>
              <Button
                onClick={() => onNav(RoutesName.module.moduleAdd)}
                color="success"
                type="submit"
                variant="outlined"
              >
                Ajouter Module
              </Button>
            </Stack>
          )}
        </Stack>

        <Box
          component="section"
          sx={{ m: 10, p: 4, border: "1px dashed #F2901D" }}
        >
          {/* SKELETON */}
          {moduleReducer.getState().value === StateEnum.Loading && (
            <SkeletonTabComponent />
          )}
          {/* FIN SKELETON */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={CustomeTable.styleThead} align="center">
                    Nom
                  </TableCell>
                  <TableCell style={CustomeTable.styleThead} align="center">
                    Semaines
                  </TableCell>

                  <TableCell style={CustomeTable.styleThead} align="center">
                    Heures
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
                {moduleReducer.getState().value === StateEnum.Loaded && (
                  <>
                    {modules.map((module) => (
                      <TableRow
                        key={module.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell style={CustomeTable.styleBody} align="left">
                          {module.nom?.toUpperCase()}
                        </TableCell>
                        <TableCell
                          style={CustomeTable.styleBody}
                          align="center"
                        >
                          {module.semaine}
                        </TableCell>
                        <TableCell
                          style={CustomeTable.styleBody}
                          align="center"
                        >
                          {module.heure}
                        </TableCell>
                        <TableCell
                          style={CustomeTable.styleBody}
                          align="center"
                        >
                          <Moment format="YYYY/MM/DD">
                            {module.createdAt}
                          </Moment>
                        </TableCell>
                        <TableCell
                          style={CustomeTable.styleBody}
                          align="center"
                        >
                          <IconButton
                            onClick={() => {
                              onNav(
                                `${RoutesName.module.moduleDetails}/${module.id}`
                              );
                            }}
                          >
                            <VisibilityOutlinedIcon
                              fontSize="large"
                              color="info"
                            />
                          </IconButton>

                          {user?.profil === Profil.ADMINISTRATEUR && (
                            <IconButton
                              onClick={() =>
                                onNav(
                                  `${RoutesName.module.moduleUpd}/${module.id}`
                                )
                              }
                            >
                              <DriveFileRenameOutlineOutlinedIcon
                                fontSize="large"
                                color="info"
                              />
                            </IconButton>
                          )}
                          {user?.profil === Profil.ADMINISTRATEUR && (
                            <IconButton onClick={() => delModuleApi(module)}>
                              <DeleteOutlinedIcon
                                fontSize="large"
                                color="error"
                              />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </>
  );
};

export default ModulePage;
