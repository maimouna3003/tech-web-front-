import {
  Button,
  InputLabel,
  LinearProgress,
  NativeSelect,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import IUtilisateur from "../../../models/Utilisateur.model";

interface UserFormComponentProps {
  user: IUtilisateur | undefined;
  onSubmit: SubmitHandler<IUtilisateur>;
}
//
const UserFormComponent: React.FC<UserFormComponentProps> = ({
  user,
  onSubmit,
}) => {
  const { register, formState, handleSubmit } = useForm<IUtilisateur>();
  const { isValid, isSubmitting } = formState;

  return (
    <Paper

      elevation={4}
      style={{
        width: 800,
        padding: 8,
        margin: 10,
        position: 'relative', left: 100,
        alignContent: "center",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} width={600}>
          <TextField
            defaultValue={user?.nom}
            style={{ position: 'relative', left: 100 }}
            type="text"
            label="Nom"
            {...register("nom", {
              required: true,
            })}
            color="success"
          ></TextField>

          <TextField
            defaultValue={user?.prenom}
            style={{ position: 'relative', left: 100 }}
            type="text"
            label="Prenom"
            {...register("prenom", {
              required: true,
            })}
            color="success"
          ></TextField>

          <TextField
            defaultValue={user?.email}
            style={{ position: 'relative', left: 100 }}
            type="text"
            label="Email"
            {...register("email", {
              required: true,
            })}
            color="success"
          ></TextField>

          <TextField
            defaultValue={user?.adresse}
            style={{ position: 'relative', left: 100 }}
            type="text"
            label="Adresse"
            {...register("adresse", {
              required: true,
            })}
            color="success"
          ></TextField>

          <InputLabel variant="standard" htmlFor="uncontrolled-native"
            style={{ position: 'relative', left: 100 }}>
            Sexe
          </InputLabel>
          <NativeSelect
            defaultValue={user?.sexe}
            style={{ position: 'relative', left: 100 }}
            variant="filled"
            {...register("sexe", {
              required: true,
            })}
            color="success"
          >
            <option value="M">Homme</option>
            <option value="F">Femme</option>
          </NativeSelect>

          <InputLabel variant="standard" htmlFor="uncontrolled-native"
            style={{ position: 'relative', left: 100 }}>
            Profil
          </InputLabel>
          <NativeSelect
            style={{ position: 'relative', left: 100 }}
            defaultValue={user?.profil}
            {...register("profil", {
              required: true,
            })}
            color="success"
          >
            <option value="Tuteur">Tuteur</option>
            <option value="Admin">Responsable (équipe tracking)</option>
          </NativeSelect>

          <TextField
            defaultValue={user?.telephone}
            style={{ position: 'relative', left: 100 }}
            type="number"
            label="Telephone"
            {...register("telephone", {
              required: true,
            })}
            color="success"
          ></TextField>

          <TextField
            type="text"
            label="Mot de passe "
            style={{ position: 'relative', left: 100 }}
            {...register("password", {
              required: true,
              minLength: 8,
            })}
            color="success"
          ></TextField>

          <TextField
            type="text"
            style={{ position: 'relative', left: 100 }}
            label="Confirmer mot de passe"
            {...register("confMotDepasse", {
              required: true,
              minLength: 8,
            })}
            color="success"
          ></TextField>

          <Button
            style={{ position: 'relative', left: 100 }}
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

export default UserFormComponent;
