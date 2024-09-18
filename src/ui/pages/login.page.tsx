import React from "react";
import InputComponent from "../components/input.component";
import illustrationLogin from "../../image/Happy student-amico.svg";
import logoApp from "../../image/Black_Illustrated_School_Logo-removebg-preview.png";
import ButtonComponent from "../components/button.component";
import { TextField } from "@mui/material";

const Login: React.FC = () => {
  const envelopeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="black"
    >
      <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"></path>
    </svg>
  );

  const LockIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="black"
      width="24"
      height="24"
    >
      <path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17ZM11 14V18H13V14H11Z"></path>
    </svg>
  );

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
                  <img className="w-[15rem]" src={logoApp} alt="" />
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Connectez-vous a votre compte
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  {/* <TextField
                    id="standard-basic"
                    label="Standard"
                    variant="standard"

                  /> */}
                  <InputComponent
                    type="text"
                    name="email"
                    placeholder="Entrer votre email"
                    svgIcon={envelopeIcon}
                  />
                  <InputComponent
                    type="password"
                    name="password"
                    placeholder="Entrer votre mot de passe"
                    svgIcon={LockIcon}
                    className="mt-7"
                  />
                  <ButtonComponent textButton="Connexion" />

                  <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by Cartesian Kinetics
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>
                    and its
                    <a
                      href="#"
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
