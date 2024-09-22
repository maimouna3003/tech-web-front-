/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import logoApp from "../../image/logo-blanc.png";
import { useLocation, useNavigate } from "react-router-dom";
import MenuItemComponent from "./menuItem.component";
import { RoutesName } from "../../services/Helpers.service";
import { LinearProgress } from "@mui/material";
import { StateReducer } from "../../strore/reducer/State.reducer";
import { StateEnum } from "../../strore/State";
import { useSignals } from "@preact/signals-react/runtime";

const SideNavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onNav = (path: string) => {
    navigate(path);
  };
  useSignals();

  const isActive = (path: string) => location.pathname === path;
  return (
    <nav className="relative md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-black flex flex-wrap  justify-between relative md:w-64 z-10">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        <a
          className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold py-4 px-6"
          href="#"
          onClick={() => {
            onNav(RoutesName.dashboard);
          }}
        >
          <img src={logoApp} alt="" />
        </a>
        <div
          className="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden"
          id="example-collapse-sidebar"
        >
          {StateReducer.stateSignal.value === StateEnum.Loading && (
            <LinearProgress color="info" />
          )}
          {StateReducer.stateSignal.value === StateEnum.Loaded && (
            <hr className="my-4 md:min-w-full" />
          )}

          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <MenuItemComponent
              onClickNav={() => {
                onNav(RoutesName.dashboard);
              }}
              text="Dashboard"
              svgIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  viewBox="0 0 24 24"
                  fill="#F2901D"
                >
                  <path d="M3 12C3 12.5523 3.44772 13 4 13H10C10.5523 13 11 12.5523 11 12V4C11 3.44772 10.5523 3 10 3H4C3.44772 3 3 3.44772 3 4V12ZM3 20C3 20.5523 3.44772 21 4 21H10C10.5523 21 11 20.5523 11 20V16C11 15.4477 10.5523 15 10 15H4C3.44772 15 3 15.4477 3 16V20ZM13 20C13 20.5523 13.4477 21 14 21H20C20.5523 21 21 20.5523 21 20V12C21 11.4477 20.5523 11 20 11H14C13.4477 11 13 11.4477 13 12V20ZM14 3C13.4477 3 13 3.44772 13 4V8C13 8.55228 13.4477 9 14 9H20C20.5523 9 21 8.55228 21 8V4C21 3.44772 20.5523 3 20 3H14Z"></path>
                </svg>
              }
              isActive={isActive(RoutesName.dashboard)} // Actif
            />
            <MenuItemComponent
              onClickNav={() => {
                onNav(RoutesName.module.modules);
              }}
              text="Module"
              svgIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  viewBox="0 0 24 24"
                  fill="#F2901D"
                >
                  <path d="M21 4H7C5.89543 4 5 4.89543 5 6C5 7.10457 5.89543 8 7 8H21V21C21 21.5523 20.5523 22 20 22H7C4.79086 22 3 20.2091 3 18V6C3 3.79086 4.79086 2 7 2H20C20.5523 2 21 2.44772 21 3V4ZM20 7H7C6.44772 7 6 6.55228 6 6C6 5.44772 6.44772 5 7 5H20V7Z"></path>
                </svg>
              }
              isActive={isActive(RoutesName.module.modules)} // Actif
            />

            {/* <MenuItemComponent
              onClickNav={() => {
                onNav(RoutesName.groupe.groupes);
              }}
              text="Groupe"
              svgIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  viewBox="0 0 24 24"
                  fill="#F2901D"
                >
                  <path d="M2.5 7C2.5 9.20914 4.29086 11 6.5 11C8.70914 11 10.5 9.20914 10.5 7C10.5 4.79086 8.70914 3 6.5 3C4.29086 3 2.5 4.79086 2.5 7ZM2 21V16.5C2 14.0147 4.01472 12 6.5 12C8.98528 12 11 14.0147 11 16.5V21H2ZM17.5 11C15.2909 11 13.5 9.20914 13.5 7C13.5 4.79086 15.2909 3 17.5 3C19.7091 3 21.5 4.79086 21.5 7C21.5 9.20914 19.7091 11 17.5 11ZM13 21V16.5C13 14.0147 15.0147 12 17.5 12C19.9853 12 22 14.0147 22 16.5V21H13Z"></path>
                </svg>
              }
              isActive={isActive(RoutesName.groupe.groupes)} // Actif
            /> */}

            <MenuItemComponent
              onClickNav={() => {
                onNav(RoutesName.planning);
              }}
              text="Planning"
              svgIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  viewBox="0 0 24 24"
                  fill="#F2901D"
                >
                  <path d="M17 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3ZM4 9V19H20V9H4ZM6 11H8V13H6V11ZM11 11H13V13H11V11ZM16 11H18V13H16V11Z"></path>
                </svg>
              }
              isActive={isActive(RoutesName.planning)} // Actif
            />

            <MenuItemComponent
              onClickNav={() => {
                onNav(RoutesName.parametres);
              }}
              text="Settings"
              svgIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  viewBox="0 0 24 24"
                  fill="#F2901D"
                >
                  <path d="M8.68637 4.00008L11.293 1.39348C11.6835 1.00295 12.3167 1.00295 12.7072 1.39348L15.3138 4.00008H19.0001C19.5524 4.00008 20.0001 4.4478 20.0001 5.00008V8.68637L22.6067 11.293C22.9972 11.6835 22.9972 12.3167 22.6067 12.7072L20.0001 15.3138V19.0001C20.0001 19.5524 19.5524 20.0001 19.0001 20.0001H15.3138L12.7072 22.6067C12.3167 22.9972 11.6835 22.9972 11.293 22.6067L8.68637 20.0001H5.00008C4.4478 20.0001 4.00008 19.5524 4.00008 19.0001V15.3138L1.39348 12.7072C1.00295 12.3167 1.00295 11.6835 1.39348 11.293L4.00008 8.68637V5.00008C4.00008 4.4478 4.4478 4.00008 5.00008 4.00008H8.68637ZM12.0001 15.0001C13.6569 15.0001 15.0001 13.6569 15.0001 12.0001C15.0001 10.3432 13.6569 9.00008 12.0001 9.00008C10.3432 9.00008 9.00008 10.3432 9.00008 12.0001C9.00008 13.6569 10.3432 15.0001 12.0001 15.0001Z"></path>
                </svg>
              }
              isActive={isActive(RoutesName.parametres)} // Actif
            />
          </ul>
          <div className="logout absolute bottom-10 w-full px-6">
            <button
              className="bg-white text-center w-full px-3 rounded-2xl h-14 relative text-black text-xl font-semibold group"
              type="button"
            >
              <div className="bg-[#F2901D] rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-full z-10 duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path>
                </svg>
              </div>
              <p className="translate-x-2">Logout</p>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideNavBar;
