import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { BiSolidNotepad } from "react-icons/bi";
import DropDownMenu from "./DropDownMenu";
import UserSettings from "./UserSettings";

function SideBar() {
  return (
    <>
      <aside className="h-screen w-40 border-r border-gray-400 fixed dark:border-darkMode-border dark:bg-darkMode-sidebar">
        <nav className="flex flex-col justify-between h-full">
          <ul className="text-xl font-semibold text-gray-800 dark:text-darkMode-font">
            <li className="dark:hover:bg-darkMode-hoverMenu transition duration-300">
              <Link
                to={"/"}
                className="w-full flex items-center gap-2 pl-1 py-1"
              >
                <FaHome /> Inicio
              </Link>
            </li>
            <li className="dark:hover:bg-darkMode-hoverMenu transition duration-300">
              <Link
                to={"/ordenes"}
                className="w-full flex items-center gap-2 pl-1 py-1"
              >
                <MdEventNote /> Ordenes
              </Link>
            </li>
            <li className="dark:hover:bg-darkMode-hoverMenu transition duration-300">
              <Link
                to={"/cotizaciones"}
                className="w-full flex items-center gap-2 pl-1 py-1"
              >
                <BiSolidNotepad /> Cotizaciones
              </Link>
            </li>
            <li className="dark:hover:bg-darkMode-hoverMenu transition duration-300">
              <Link
                to={"/clientes"}
                className="w-full flex items-center gap-2 pl-1 py-1"
              >
                <FaUser /> Clientes
              </Link>
            </li>
            <li className="dark:hover:bg-darkMode-hoverMenu transition duration-300">
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
