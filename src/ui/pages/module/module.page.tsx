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
import SkeletonComponent from "../../components/skeleton.component";
import { StateReducer } from "../../../strore/reducer/State.reducer";
import { StateEnum } from "../../../strore/State";
import { delModuleApi } from "../../../restApi/Module.api";
import CardNotifyState from "../../components/cardNotifyState.component";

const ModulePage: React.FC = () => {
  const navigate = useNavigate();

  const onNav = (path: string) => {
    navigate(path);
  };

  //Reducer
  const moduleReducer = useModuleReducer();
  const modules = moduleReducer.getStoreEntities();
  useSignals();
  return (
    <>
      {/* CardNotifyState */}
      <CardNotifyState />

      <Stack spacing={3}>
        <Stack
          sx={{ m: 5, p: 2, border: "1px dashed #F2901D" }}
          direction="row"
          spacing={8}
        >
          <Stack> LISTE MODULE</Stack>

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
                {/* SKELETON */}
                <SkeletonComponent />
                {/* FIN SKELETON */}

                {StateReducer.stateSignal.value === StateEnum.Loaded && (
                  <>
                    {modules.value.map((module) => (
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
                            onClick={() =>
                              onNav(
                                `${RoutesName.module.moduleDetails}/${module.id}`
                              )
                            }
                          >
                            <VisibilityOutlinedIcon
                              fontSize="large"
                              color="info"
                            />
                          </IconButton>
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
                          <IconButton onClick={() => delModuleApi(module)}>
                            <DeleteOutlinedIcon
                              fontSize="large"
                              color="error"
                            />
                          </IconButton>
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
