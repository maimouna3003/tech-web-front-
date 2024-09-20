import { Button, LinearProgress, Paper, Stack, TextField } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import IModule from "../../../models/Module.model";

interface ModuleFormComponentProps {
  module: IModule | undefined;
  onSubmit: SubmitHandler<IModule>;
}

const ModuleFormComponent: React.FC<ModuleFormComponentProps> = ({
  module,
  onSubmit,
}) => {
  const { register, formState, handleSubmit } = useForm<IModule>();
  const { isValid, isSubmitting } = formState;

  return (
    <Paper
      elevation={4}
      style={{
        width: 800,
        height: 300,
        padding: 8,
        margin: 10,
        alignContent: "center",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} width={600}>
          <TextField
            defaultValue={module?.nom}
            type="text"
            variant="standard"
            label="Nom"
            {...register("nom", {
              required: true,
            })}
            color="success"
          ></TextField>

          <TextField
            defaultValue={module?.semaine}
            type="number"
            variant="standard"
            label="nombre de semaine"
            {...register("semaine", {
              required: true,
            })}
            color="success"
          ></TextField>

          <TextField
            defaultValue={module?.heure}
            type="number"
            variant="standard"
            label="nombre d'heure"
            {...register("heure", {
              required: true,
            })}
            color="success"
          ></TextField>

          <Button
            color="success"
            disabled={!isValid}
            type="submit"
            variant="outlined"
          >
            Enregistrez
          </Button>
          {isSubmitting && <LinearProgress color="success" />}
        </Stack>
      </form>
    </Paper>
  );
};

export default ModuleFormComponent;
