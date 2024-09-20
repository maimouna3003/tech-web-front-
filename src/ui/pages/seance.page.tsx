import {
  Box,
  Checkbox,
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
import { useParams } from "react-router-dom";
import { CustomeTable } from "../../services/helpers.service";
import DataTest from "../../services/dataTeste";
import Moment from "react-moment";

const SeancePage: React.FC = () => {
  const { id_groupe } = useParams();
  return (
    <>
      <Stack spacing={3}>
        <Stack>SEANCE List</Stack>
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
                {DataTest.DataEffectuer.map((effectue) => (
                  <TableRow
                    key={effectue.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell style={CustomeTable.styleBody} align="left">
                      {effectue.seance?.nom.toUpperCase()}
                    </TableCell>
                    <TableCell style={CustomeTable.styleBody} align="center">
                      <Checkbox
                        size="large"
                        defaultChecked={effectue.effectuer}
                        color="success"
                      />
                    </TableCell>
                    <TableCell style={CustomeTable.styleBody} align="center">
                      <Checkbox
                        size="large"
                        defaultChecked={!effectue.effectuer}
                        color="error"
                      />
                    </TableCell>
                    <TableCell style={CustomeTable.styleBody} align="center">
                      <Moment format="YYYY/MM/DD">{effectue.createdAt}</Moment>
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

export default SeancePage;
