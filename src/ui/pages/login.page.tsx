import React from "react";
import illustrationLogin from "../../image/close-up-person-working-alternative-energy.jpg";
import logoApp from "../../image/Logo Tutor Planner.png";
import { useForm } from "react-hook-form";
import UserLogin from "../../models/UserLogin.model";
import { Button, LinearProgress, Stack, TextField } from "@mui/material";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import { wait } from "@testing-library/user-event/dist/utils";
import { useNavigate } from "react-router-dom";
import { RoutesName } from "../../services/helpers.service";
import UserService from "../../services/user.service";
const Login: React.FC = () => {
  const navigate = useNavigate();

  const onNav = (path: string) => {
    navigate(path);
  };
  const { register, formState, handleSubmit } = useForm<UserLogin>();
  const { isValid, isSubmitting } = formState;

  //
  const onSubmit = async (userLogin: UserLogin) => {
    await wait(1000);
    console.log(userLogin);
    UserService.isLogin = true;
    onNav(RoutesName.dashboard);
  };

  return (
    <>
      <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
        <div
          className="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
          style={{ maxWidth: "1000px" }}
        >
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 ">
              {/* IMAGE ICI */}
              <img src={illustrationLogin} alt="" />
            </div>

            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  <img className="w-[17rem]" src={logoApp} alt="" />
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Connectez-vous a votre compte
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  {/* Fomulaire de Connexion */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3}>
                      <TextField
                        type="text"
                        variant="standard"
                        label="email"
                        {...register("email", {
                          required: true,
                        })}
                        color="success"
                        slotProps={{
                          input: {
                            endAdornment: (
                              <MailOutlineOutlinedIcon color="success" />
                            ),
                          },
                        }}
                      ></TextField>

                      <TextField
                        type="password"
                        variant="standard"
                        label="password"
                        {...register("password", {
                          required: true,
                        })}
                        color="success"
                        slotProps={{
                          input: {
                            endAdornment: (
                              <PasswordOutlinedIcon color="success" />
                            ),
                          },
                        }}
                      ></TextField>
                      <Button
                        color="success"
                        disabled={!isValid}
                        type="submit"
                        variant="outlined"
                      >
                        Connexion
                      </Button>
                      {isSubmitting && <LinearProgress color="success" />}
                    </Stack>
                  </form>

                  <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by Cartesian Kinetics
                    <a
                      href=" "
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>
                    and its
                    <a
                      href=" "
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
