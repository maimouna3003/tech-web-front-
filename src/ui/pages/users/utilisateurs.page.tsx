import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useSignals } from "@preact/signals-react/runtime";
import { useUserReducer } from "../../../strore/reducer/User.reducer";
import UserTabComponent from "../../components/user/userList.component";
import UserFormComponent from "../../components/user/userForm.component";
import IUtilisateur from "../../../models/Utilisateur.model";
import { addUserApi } from "../../../restApi/User.api";
import { Statut } from "../../../models/Enum";
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

const UtilisateursPage: React.FC = () => {
  console.log("users page");
  const userReducer = useUserReducer();
  const admins = userReducer.getAdmins();
  const tuteurs = userReducer.getTuteurs();
  useSignals();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //On submit
  const onSubmit = (userInput: IUtilisateur) => {
    userInput = { ...userInput, status: Statut.ACTIF };
    // stateReducer.stateApp(StateEnum.Loading);
    //Add and nav
    if (userInput.password !== userInput.confMotDepasse) {
      console.log("erreur mot de passe ");
      return;
    }

    addUserApi(userInput);
    console.log("user ==" + JSON.stringify(userInput));

    // stateReducer.stateApp(StateEnum.Loaded);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Tuteurs" />
            <Tab label="Responsables" />
            <Tab label="Ajouter utilisateurs" />
          </Tabs>
        </Box>

        {/* Tuteur */}
        <CustomTabPanel value={value} index={0}>
          <UserTabComponent
            module={module ?? {}}
            isAffected={true}
            users={tuteurs ?? []}
            isPageUsers={true}
          />
        </CustomTabPanel>

        {/* Admin */}
        <CustomTabPanel value={value} index={1}>
          <UserTabComponent
            isAffected={false}
            module={module ?? {}}
            users={admins ?? []}
            isPageUsers={true}
          />
        </CustomTabPanel>

        {/* Add User */}
        <CustomTabPanel value={value} index={2}>
          <UserFormComponent user={{}} onSubmit={onSubmit} />
        </CustomTabPanel>
      </Box>
    </>
  );
};
export default UtilisateursPage;
