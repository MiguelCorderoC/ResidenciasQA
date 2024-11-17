import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../context/AuthContext";
import ThemeButton from "./ThemeButton";
import { toast } from "sonner";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function UserSettings() {
  const auth = useAuth();
  const { displayName, photoURL, email } = auth.user || {};

  const logOut = async () => {
    try {
      await auth.logOut();
      toast.success("Sesion cerrada");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <article className="text-gray-800 text-lg font-semibold dark:text-darkMode-font">
        {email === import.meta.env.VITE_USER_ADMIN && (
          <Link
            to={"/signin"}
            className="w-full flex items-center gap-1 pl-1 py-1 hover:bg-darkMode-hoverMenu transition duration-300"
          >
            <FaUserCircle /> Crear usuario
          </Link>
        )}
        <Link
          to={"/update-profile"}
          className="w-full flex items-center gap-1 pl-1 py-1 hover:bg-darkMode-hoverMenu transition duration-300"
        >
          <IoMdSettings /> Configuracion
        </Link>
        <article className="flex items-center border-t-2 border-gray-300 dark:border-darkMode-border gap-2 p-1">
          <img
            src={photoURL}
            alt="Foto usuario"
            className="size-10 rounded-full"
          />
          <article className="flex flex-col items-start gap-1 text-sm">
            <span>{displayName}</span>
            <article className="flex gap-2">
              <ThemeButton />
              <button
                onClick={() => {
                  logOut();
                }}
                className="flex items-center gap-1"
              >
                <BiLogOut /> Salir
              </button>
            </article>
          </article>
        </article>
      </article>
    </>
  );
}
export default UserSettings;
