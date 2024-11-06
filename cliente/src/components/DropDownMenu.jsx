import { useState } from "react";
import { BsCardChecklist } from "react-icons/bs";
import { FaCashRegister, FaListCheck, FaUser } from "react-icons/fa6";
import { MdChevronRight, MdRealEstateAgent } from "react-icons/md";
import { Link } from "react-router-dom";

function DropDownMenu() {
  const [dropDown, setDropDown] = useState(false);

  return (
    <>
      <button
        onClick={() => setDropDown((prev) => !prev)}
        className="w-full flex items-center gap-2 pl-1 py-1"
      >
        <MdChevronRight /> Catalogos
      </button>
      <ul className="text-base">
        <li>
          <Link
            to={"/clasificaciones"}
            className="w-full flex items-center gap-2 pl-2 py-1"
          >
            <FaListCheck /> Clasificaciones
          </Link>
        </li>
        <li>
          <Link
            to={"/subclasificaciones"}
            className="w-full flex items-center gap-2 pl-2 py-1"
          >
            <BsCardChecklist /> Subclasificaciones
          </Link>
        </li>
        <li>
          <Link className="w-full flex items-center gap-2 pl-2 py-1">
            <MdRealEstateAgent /> Estado de cliente
          </Link>
        </li>
        <li>
          <Link className="w-full flex items-center gap-2 pl-2 py-1">
            <FaUser /> Tipo de cliente
          </Link>
        </li>
        <li>
          <Link className="w-full flex items-center gap-2 pl-2 py-1">
            <FaCashRegister /> Tipos ventas
          </Link>
        </li>
      </ul>
    </>
  );
}
export default DropDownMenu;
