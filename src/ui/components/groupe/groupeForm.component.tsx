import { Button, LinearProgress, Paper, Stack, TextField } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import IGroupe from "../../../models/Groupe.model";

interface GroupeFormComponentProps {
  groupe: IGroupe | undefined;
  onSubmit: SubmitHandler<IGroupe>;
}

const GroupeFormComponent: React.FC<GroupeFormComponentProps> = ({
  groupe,
  onSubmit,
}) => {
  const { register, formState, handleSubmit } = useForm<IGroupe>();
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
            defaultValue={groupe?.nom}
            type="text"
            variant="standard"
            label="Nom"
            {...register("nom", {
              required: true,
            })}
            color="success"
          ></TextField>

          <TextField
            defaultValue={groupe?.heureTotalEffectue}
            type="number"
            variant="standard"
            label="heure total effectue"
            {...register("heureTotalEffectue", {
              required: true,
            })}
            color="success"
          ></TextField>

          <TextField
            defaultValue={groupe?.heureTotalNonEffectue}
            type="number"
            variant="standard"
            label="heure total non effectue"
            {...register("heureTotalNonEffectue", {
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

export default GroupeFormComponent;
