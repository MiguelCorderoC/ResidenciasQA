import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { BiSolidNotepad } from "react-icons/bi";
import DropDownMenu from "./DropDownMenu";
import { useAuth } from "../context/AuthContext";
import UserSettings from "./UserSettings";

function SideBar() {
  const auth = useAuth();
  const { email, displayName, photoURL } = auth.user || {};

  return (
    <>
      <aside className="h-screen w-40 border-r border-gray-400 fixed">
        <nav className="flex flex-col justify-between border h-full">
          <ul className="text-xl font-semibold text-gray-800">
            <li>
              <Link
                to={"/"}
                className="w-full flex items-center gap-2 pl-1 py-1"
              >
                <FaHome /> Inicio
              </Link>
            </li>
            <li>
              <Link
                to={"/ordenes"}
                className="w-full flex items-center gap-2 pl-1 py-1"
              >
                <MdEventNote /> Ordenes
              </Link>
            </li>
            <li>
              <Link
                to={"/cotizaciones"}
                className="w-full flex items-center gap-2 pl-1 py-1"
              >
                <BiSolidNotepad /> Cotizaciones
              </Link>
            </li>
            <li>
              <Link
                to={"/clientes"}
                className="w-full flex items-center gap-2 pl-1 py-1"
              >
                <FaUser /> Clientes
              </Link>
            </li>
            <li>
              <Link
                to={"/productos"}
                className="w-full flex items-center gap-2 pl-1 py-1"
              >
                <FaShoppingCart />
                Productos
              </Link>
            </li>
            <li>
              <DropDownMenu />
            </li>
          </ul>
          <UserSettings />
        </nav>
      </aside>
    </>
  );
}
export default SideBar;
