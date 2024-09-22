import { Skeleton, TableCell, TableRow } from "@mui/material";
import React from "react";
import { StateReducer } from "../../strore/reducer/State.reducer";
import { StateEnum } from "../../strore/State";
import { useSignals } from "@preact/signals-react/runtime";

const SkeletonComponent: React.FC = () => {
  const dataSkeleton = [0, 1, 2, 3, 4, 5, 6];
  useSignals();
  return (
    <>
      {StateReducer.stateSignal.value === StateEnum.Loading && (
        <>
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
        </>
      )}
    </>
  );
};

export default SkeletonComponent;
