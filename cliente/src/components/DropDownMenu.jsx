import { useState } from "react";
import { BsCardChecklist } from "react-icons/bs";
import { FaRegCreditCard } from "react-icons/fa";
import {
  FaListCheck,
  FaRulerCombined,
  FaScissors,
  FaUser,
} from "react-icons/fa6";
import { GiRolledCloth } from "react-icons/gi";
import { MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";

function DropDownMenu() {
  const [dropDown, setDropDown] = useState(false);

  return (
    <>
      <button
        onClick={() => setDropDown((prev) => !prev)}
        className="w-full flex items-center gap-1 pl-1 py-1 hover:bg-darkMode-hoverMenu transition duration-300"
      >
        <MdChevronRight
          className={`text-2xl font-bold transition-all duration-300 ${
            dropDown && "rotate-90"
          }`}
        />
        Catalogos
      </button>
      <ul
        className={`text-base ${
          dropDown
            ? "flex flex-col max-h-64 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400"
            : "hidden"
        }`}
      >
        <li className="hover:bg-darkMode-hoverMenu transition duration-300">
          <Link
            to={"/acabados"}
            className="w-full flex items-center gap-2 pl-2 py-1"
          >
            <FaScissors /> Acabados
          </Link>
        </li>
        <li className="hover:bg-darkMode-hoverMenu transition duration-300">
          <Link
            to={"/clasificaciones"}
            className="w-full flex items-center gap-2 pl-2 py-1"
          >
            <FaListCheck /> Clasificaciones
          </Link>
        </li>
        <li className="hover:bg-darkMode-hoverMenu transition duration-300">
          <Link
            to={"/subclasificaciones"}
            className="w-full flex items-center gap-2 pl-2 py-1"
          >
            <BsCardChecklist /> Subclasificacion
          </Link>
        </li>
        <li className="hover:bg-darkMode-hoverMenu transition duration-300">
          <Link
            to={"/estados"}
            className="w-full flex items-center gap-2 pl-2 py-1 text-nowrap"
          >
            <FaRulerCombined /> Estado cobranza
          </Link>
        </li>
        <li className="hover:bg-darkMode-hoverMenu transition duration-300">
          <Link
            to={"/formas-pagos"}
            className="w-full flex items-center gap-2 pl-2 py-1 text-wrap"
          >
            <FaRulerCombined /> Forma de pago
          </Link>
        </li>
        <li className="hover:bg-darkMode-hoverMenu transition duration-300">
          <Link
            to={"/tipos-clientes"}
            className="w-full flex items-center gap-2 pl-2 py-1"
          >
            <FaUser /> Tipo de cliente
          </Link>
        </li>
        <li className="hover:bg-darkMode-hoverMenu transition duration-300">
          <Link
            to={"/tipo-ventas"}
            className="w-full flex items-center gap-2 pl-2 py-1"
          >
            <FaRegCreditCard /> Tipo de ventas
          </Link>
        </li>
        <li className="hover:bg-darkMode-hoverMenu transition duration-300">
          <Link
            to={"/procesos"}
            className="w-full flex items-center gap-2 pl-2 py-1"
          >
            <FaRulerCombined /> Procesos
          </Link>
        </li>
        <li className="hover:bg-darkMode-hoverMenu transition duration-300">
          <Link
            to={"/materiales"}
            className="w-full flex items-center gap-2 pl-2 py-1"
          >
            <GiRolledCloth /> Materiales
          </Link>
        </li>
        <li className="hover:bg-darkMode-hoverMenu transition duration-300">
          <Link
            to={"/unidades"}
            className="w-full flex items-center gap-2 pl-2 py-1"
          >
            <FaRulerCombined /> Unidades
          </Link>
        </li>
      </ul>
    </>
  );
}
export default DropDownMenu;
