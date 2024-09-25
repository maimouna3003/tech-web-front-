import { Alert, LinearProgress } from "@mui/material";
import React from "react";
import { StateEnum } from "../../../strore/State";
import { useSignals } from "@preact/signals-react/runtime";
import { useStateAppReducer } from "../../../strore/reducer/StateApp.reducer";

const StateProgress: React.FC = () => {
  useSignals();
  const stateReducer = useStateAppReducer();
  return (
    <>
      {/*  Loader for State App */}
      {stateReducer.getStateAppSignal().value === StateEnum.Loading && (
        <LinearProgress />
      )}

      {/*  Message for State App */}
      {stateReducer.getStateAppSignal().value === StateEnum.Error && (
        <Alert variant="outlined" severity="error">
          {stateReducer.getMessageAppSignal().value}
        </Alert>
      )}
    </>
  );
};

export default StateProgress;
