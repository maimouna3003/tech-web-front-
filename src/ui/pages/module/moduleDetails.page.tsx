import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import GroupeTabComponent from "../../components/groupe/groupeTabList.component";
import { useGroupeReducer } from "../../../strore/reducer/Groupe.reducer";
import { useSignals } from "@preact/signals-react/runtime";
import { useParams } from "react-router-dom";
import { useModuleReducer } from "../../../strore/reducer/Module.reducer";
import SeanceTabComponent from "../../components/seance/seanceList.component";
import { Button,  InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import IGroupe from "../../../models/Groupe.model";
import { addGroupesApi } from "../../../restApi/Groupe.api";
import IEffectuee from "../../../models/Effectuee.model";
import { addEffectuersApi } from "../../../restApi/Effecture.api";
import { StateEnum } from "../../../strore/State";
import UserTabComponent from "../../components/user/userList.component";
import { useUserReducer } from "../../../strore/reducer/User.reducer";
import { getUsersNoAffectationModuleService } from "../../../services/Module.service";
import SkeletonTabComponent from "../../components/state/skeleton.component";
import { useCurrentUserReducer } from "../../../strore/reducer/CurrentUser.reducer";
import { Profil } from "../../../models/Enum";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ModuleDetailsPage: React.FC = () => {
  console.log("Page module details");
  const currentUserReducer = useCurrentUserReducer();
  const user = currentUserReducer.getCurrentUserSignal().value.user;
  useSignals();
  const { id_module } = useParams();
  const moduleReducer = useModuleReducer();
  const userReducer = useUserReducer();
  const usersSignal = userReducer.getSignalEntities();

  const module = moduleReducer.getEntityById(id_module);
  const groupeReducer = useGroupeReducer();
  const usersNoAffected = getUsersNoAffectationModuleService(
    module ?? {},
    usersSignal.value
  );
  console.log(usersNoAffected.length);
  let groupesHeures: IGroupe[] = [];
  if (user?.profil === Profil.ADMINISTRATEUR) {
    groupesHeures = groupeReducer.getHeuresModule(module?.groupes ?? []);
  } else {
    groupesHeures = groupeReducer.getHeuresModule(user?.groupes ?? []);
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { register, formState, handleSubmit } = useForm();
  const { isValid } = formState;

  //
  const onSubmit = async ({ nbr, initial }: any) => {
    moduleReducer.setState(StateEnum.Loading);
    let groupes: IGroupe[] = [];
    for (let index = 0; index < nbr; index++) {
      const nbrNom = index + 1;
      const groupe: IGroupe = {
        heureTotalEffectue: 0,
        heureTotalNonEffectue: 0,
        nom: "Groupe" + initial + nbrNom,
        module: { id: id_module },
      };

      groupes.push(groupe);
    }
    const listGroupes = await addGroupesApi(groupes);
    let listEffectuer: IEffectuee[] = [];

    //
    module?.seances?.forEach((seance) => {
      listGroupes.forEach((groupe) => {
        const effectuer: IEffectuee = {
          date: Date.now().toString(),
          effectuer: false,
          groupe: { id: groupe.id },
          seance: { id: seance.id },
        };
        listEffectuer.push(effectuer);
      });
    });

    await addEffectuersApi(listEffectuer);
  };
  const stateModule = moduleReducer.getState();
  return (
    <>
      
      <Box sx={{ width: "12%"}}>
       <Typography variant="h6" sx={{border:"1px solid lightgrey", p:2}}> Nom : {module?.nom} Semaine : {module?.semaine} <br/> Heure : {module?.heure}</Typography>   
      </Box>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Seances" />
            <Tab label="Groupes" />
            <Tab label="Tuteurs" />
            {user?.profil === Profil.ADMINISTRATEUR && (
              <Tab label="Affectation Module" />
            )}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {stateModule.value === StateEnum.Loaded && (
            <SeanceTabComponent
              idModule={module?.id ?? ""}
              seances={module?.seances ?? []}
            />
          )}

          {stateModule.value === StateEnum.Loading && <SkeletonTabComponent />}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Stack spacing={3}>
            {user?.profil === Profil.ADMINISTRATEUR && (
              <Stack>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    type="number"
                    variant="outlined"
                    label="Nombre de groupes"
                    placeholder="Saisissez le nombre de groupes (max. 10)"
                    sx={{ minWidth: '200px', flexGrow: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <GroupAddOutlinedIcon color="success" />
                        </InputAdornment>
                      ),
                    }}
                    {...register("nbr", {
                      max: 10,
                      required: "Veuillez entrer un nombre entre 1 et 10",
                    })}
                    color="success"
                    slotProps={{
                      input: {
                        endAdornment: <GroupAddOutlinedIcon color="success" />,
                      },
                    }}
                  ></TextField>
                  <TextField
                    type="text"
                    variant="outlined"
                    label="Lettre initiale du groupe"
                     placeholder="Ex : A"
                     style={{ position : 'relative' , left : 10}}
                     InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <span style={{ fontSize: "1.2rem" }}>🔤</span>
                        </InputAdornment>
                      ),
                    }}
                    {...register("initial", {
                      maxLength: {
                       value :  1,
                       message: "Une seule lettre est permise",
                      },
                      required: "Veuillez entrer une lettre initiale",
                    })}
                    color="success"
                  ></TextField>
                  <Button
                    color="success"
                    disabled={!isValid}
                    type="submit"
                    variant="text"
                    style={{ position : 'relative' , left : 20, padding : 10, top : 5 }}
                  >
                    Ajouter le groupe
                  </Button>
                </form>
              </Stack>
            )}
            <Stack>
              <GroupeTabComponent
                idModule={module?.id ?? ""}
                groupes={groupesHeures}
                usersInModule={module?.users ?? []}
              />
            </Stack>
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <UserTabComponent
            isAffected={false}
            module={module ?? {}}
            users={module?.users ?? []}
            isPageUsers={false}
          />
        </CustomTabPanel>
        {/* Users pour Affectation */}
        {user?.profil === Profil.ADMINISTRATEUR && (
          <CustomTabPanel value={value} index={3}>
            <UserTabComponent
              module={module ?? {}}
              isAffected={true}
              users={usersNoAffected}
              isPageUsers={false}
            />
          </CustomTabPanel>
        )}
      </Box>
    </>
  );
};
export default ModuleDetailsPage;
