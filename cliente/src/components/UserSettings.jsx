import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../context/AuthContext";
import ThemeButton from "./ThemeButton";
import { toast } from "sonner";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";

function UserSettings() {
  const auth = useAuth();
  const { displayName, photoURL } = auth.user || {};
  const [dropDown, setDropDown] = useState(false);

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
      <article>
        <article
          className={`transition-all duration-300 ${
            dropDown ? "block" : "hidden"
          }`}
        >
          <ul>
            <li></li>
            <li>
              <Link>Crear nuevo usuario</Link>
            </li>
            <li>
              <Link>Editar informacion</Link>
            </li>
          </ul>
        </article>
        <button
          onClick={() => setDropDown((prev) => !prev)}
          className="w-full flex items-center gap-1 pl-1 py-1"
        >
          <IoMdSettings /> Configuracion
        </button>
        <article className="flex items-center gap-2 p-1">
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
