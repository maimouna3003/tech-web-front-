import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { CustomeTable } from "../../../services/Helpers.service";

const SkeletonTabComponent: React.FC = () => {
  const dataSkeleton = [0, 1, 2, 3, 4, 5, 6];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={CustomeTable.styleThead} align="center">
              <Skeleton
                sx={{ margin: 1 }}
                variant="rounded"
                animation="wave"
                width={200}
                height={50}
              />
            </TableCell>
            <TableCell style={CustomeTable.styleThead} align="center">
              <Skeleton
                sx={{ margin: 1 }}
                variant="rounded"
                animation="wave"
                width={200}
                height={50}
              />
            </TableCell>

            <TableCell style={CustomeTable.styleThead} align="center">
              <Skeleton
                sx={{ margin: 1 }}
                variant="rounded"
                animation="wave"
                width={200}
                height={50}
              />
            </TableCell>
            <TableCell style={CustomeTable.styleThead} align="center">
              <Skeleton
                sx={{ margin: 1 }}
                variant="rounded"
                animation="wave"
                width={200}
                height={50}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSkeleton.map((i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">
                <Skeleton
                  sx={{ margin: 1 }}
                  variant="rounded"
                  animation="wave"
                  width={300}
                  height={50}
                />
              </TableCell>
              <TableCell align="center">
                <Skeleton
                  sx={{ margin: 1 }}
                  variant="rounded"
                  animation="wave"
                  width={100}
                  height={50}
                />
              </TableCell>
              <TableCell align="center">
                <Skeleton
                  sx={{ margin: 1 }}
                  variant="rounded"
                  animation="wave"
                  width={100}
                  height={50}
                />
              </TableCell>
              <TableCell align="center">
                <Skeleton
                  sx={{ margin: 1 }}
                  variant="rounded"
                  animation="wave"
                  width={200}
                  height={50}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SkeletonTabComponent;
