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
import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import IGroupe from "../../../models/Groupe.model";
import { addGroupesApi } from "../../../restApi/Groupe.api";
import IEffectuee from "../../../models/Effectuee.model";
import { addEffectuersApi } from "../../../restApi/Effecture.api";
import { useStateReducer } from "../../../strore/reducer/State.reducer";
import { StateEnum } from "../../../strore/State";
import UserTabComponent from "../../components/user/userList.component";
import { useUserReducer } from "../../../strore/reducer/User.reducer";
import { getUsersNoAffectationModuleService } from "../../../services/Module.service";
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
  const { id_module } = useParams();
  const storeModule = useModuleReducer();
  const storeUser = useUserReducer();
  const users = storeUser.getStoreEntities();
  const module = storeModule.getEntityById(id_module);
  const storeGroupes = useGroupeReducer();
  const groupesHeures = storeGroupes.getHeuresModule(module?.groupes ?? []);
  const stateReducer = useStateReducer();
  const usersNoAffected = getUsersNoAffectationModuleService(
    module ?? {},
    users.value
  );
  useSignals();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { register, formState, handleSubmit } = useForm();
  const { isValid } = formState;

  //
  const onSubmit = async ({ nbr, initial }: any) => {
    stateReducer.stateApp(StateEnum.Loading);
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
    console.log(JSON.stringify(groupes));
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

    const responseEffectuer = await addEffectuersApi(listEffectuer);
    console.log("liest effectuer" + responseEffectuer);
    stateReducer.stateApp(StateEnum.Loaded);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        Nom : {module?.nom} <br /> Semaine : {module?.semaine} <br /> Heure :
        {module?.heure}
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
            <Tab label="Affectation" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <SeanceTabComponent
            idModule={module?.id ?? ""}
            seances={module?.seances ?? []}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Stack spacing={3}>
            <Stack>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  type="number"
                  variant="standard"
                  label="Nombre de groupe"
                  {...register("nbr", {
                    max: 10,
                    required: true,
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
                  variant="standard"
                  placeholder="A"
                  label="Lettre initial groupe"
                  {...register("initial", {
                    maxLength: 1,
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
                  Ajouter
                </Button>
              </form>
            </Stack>
            <Stack>
              <GroupeTabComponent groupes={groupesHeures} />
            </Stack>
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <UserTabComponent
            isAffected={false}
            module={module ?? {}}
            users={module?.users ?? []}
          />
        </CustomTabPanel>
        {/* Affectation */}
        <CustomTabPanel value={value} index={3}>
          <UserTabComponent
            module={module ?? {}}
            isAffected={true}
            users={usersNoAffected}
          />
        </CustomTabPanel>
      </Box>
    </>
  );
};
export default ModuleDetailsPage;
