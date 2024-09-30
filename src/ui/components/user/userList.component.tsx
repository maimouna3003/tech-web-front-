import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import React from "react";
import { CustomeTable } from "../../../services/Helpers.service";
import IUtilisateur from "../../../models/Utilisateur.model";
import IModule from "../../../models/Module.model";
import { Profil, Sexe } from "../../../models/Enum";
import {
  affectationUserModuleService,
  delAffectationUserModuleService,
} from "../../../services/Module.service";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useCurrentUserReducer } from "../../../strore/reducer/CurrentUser.reducer";

interface UserTabComponentProps {
  module: IModule;
  users: IUtilisateur[];
  isAffected: boolean;
  isPageUsers: boolean;
}

const UserTabComponent: React.FC<UserTabComponentProps> = ({
  module,
  users,
  isAffected,
  isPageUsers,
}) => {
  //
  const currentUserReducer = useCurrentUserReducer();
  const user = currentUserReducer.getCurrentUserSignal().value.user;

  return (
    <Stack spacing={3}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={CustomeTable.styleThead} align="center">
                Nom
              </TableCell>
              <TableCell style={CustomeTable.styleThead} align="center">
                Prenom
              </TableCell>
              <TableCell style={CustomeTable.styleThead} align="center">
                Email
              </TableCell>
              <TableCell style={CustomeTable.styleThead} align="center">
                Adresse
              </TableCell>
              <TableCell style={CustomeTable.styleThead} align="center">
                Profil
              </TableCell>
              <TableCell style={CustomeTable.styleThead} align="center">
                Sexe
              </TableCell>
              <TableCell style={CustomeTable.styleThead} align="center">
                Status
              </TableCell>
              <TableCell style={CustomeTable.styleThead} align="center">
                Téléphone
              </TableCell>
              {user?.profil === Profil.ADMINISTRATEUR && (
                <TableCell style={CustomeTable.styleThead} align="center">
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell style={CustomeTable.styleBody} align="left">
                  {user.nom}
                </TableCell>
                <TableCell style={CustomeTable.styleBody} align="left">
                  {user.prenom}
                </TableCell>
                <TableCell style={CustomeTable.styleBody} align="left">
                  {user.email}
                </TableCell>
                <TableCell style={CustomeTable.styleBody} align="left">
                  {user.adresse}
                </TableCell>
                <TableCell style={CustomeTable.styleBody} align="left">
                  {user.sexe === Sexe.FEMININ &&
                    user.profil === Profil.TUTEUR && <> Tutrice</>}

                  {!(
                    user.sexe === Sexe.FEMININ && user.profil === Profil.TUTEUR
                  ) && <> {user.profil}</>}
                </TableCell>
                <TableCell style={CustomeTable.styleBody} align="left">
                  {user.sexe}
                </TableCell>
                <TableCell style={CustomeTable.styleBody} align="left">
                  {user.status}
                </TableCell>
                <TableCell style={CustomeTable.styleBody} align="left">
                  {user.telephone}
                </TableCell>

                {/* verifie si c'est la page user qui en fait appelle */}
                {user?.profil === Profil.ADMINISTRATEUR && (
                  <>
                    {!isPageUsers && (
                      <TableCell style={CustomeTable.styleBody} align="center">
                        {isAffected && (
                          <IconButton
                            onClick={() =>
                              affectationUserModuleService(module, user)
                            }
                          >
                            <PersonAddOutlinedIcon
                              fontSize="large"
                              color="success"
                            />
                          </IconButton>
                        )}
                        {!isAffected && (
                          <IconButton
                            onClick={() =>
                              delAffectationUserModuleService(module, user)
                            }
                          >
                            <PersonRemoveOutlinedIcon
                              fontSize="large"
                              color="error"
                            />
                          </IconButton>
                        )}
                      </TableCell>
                    )}
                  </>
                )}

                {user?.profil === Profil.ADMINISTRATEUR && (
                  <>
                    {isPageUsers && (
                      <TableCell style={CustomeTable.styleBody} align="center">
                        <IconButton
                          onClick={() =>
                            delAffectationUserModuleService(module, user)
                          }
                        >
                          <DeleteOutlinedIcon fontSize="large" color="error" />
                        </IconButton>
                      </TableCell>
                    )}
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default UserTabComponent;
