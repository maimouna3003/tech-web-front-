import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, IconButton, Stack } from "@mui/material";
import DataTest from "../../../services/dataTeste";
import Moment from "react-moment";
import { CustomeTable, RoutesName } from "../../../services/helpers.service";
import { delGroupeById } from "../../../services/groupe.service";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";
import { delModuleById } from "../../../services/Module.service";
const ModulePage: React.FC = () => {
  const navigate = useNavigate();

  const onNav = (path: string) => {
    navigate(path);
  };
  return (
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
              {DataTest.DataModules.map((module) => (
                <TableRow
                  key={module.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell style={CustomeTable.styleBody} align="left">
                    {module.nom.toUpperCase()}
                  </TableCell>
                  <TableCell style={CustomeTable.styleBody} align="center">
                    {module.semaine}
                  </TableCell>
                  <TableCell style={CustomeTable.styleBody} align="center">
                    {module.heure}
                  </TableCell>
                  <TableCell style={CustomeTable.styleBody} align="center">
                    <Moment format="YYYY/MM/DD">{module.createdAt}</Moment>
                  </TableCell>
                  <TableCell style={CustomeTable.styleBody} align="center">
                    <IconButton
                      onClick={() => onNav(RoutesName.groupe.groupes)}
                    >
                      <VisibilityOutlinedIcon fontSize="large" color="info" />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        onNav(`${RoutesName.module.moduleUpd}/${module.id}`)
                      }
                    >
                      <DriveFileRenameOutlineOutlinedIcon
                        fontSize="large"
                        color="info"
                      />
                    </IconButton>
                    <IconButton onClick={() => delModuleById(module.id)}>
                      <DeleteOutlinedIcon fontSize="large" color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
};

export default ModulePage;
