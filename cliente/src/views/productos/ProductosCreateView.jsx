import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

function ProductosCreateView() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id_subclasificacion: "1",
      id_tpmaterial: "1",
      id_unidad: "1",
    },
  });
  const [subClasificaciones, setSubClasificaciones] = useState([]);
  const [instalacion, setInstalacion] = useState("S");
  const [precioSinInstalacion, setPrecioSinInstalacion] = useState("");
  const [precioConInstalacion, setPrecioConInstalacion] = useState("");
  const [id, setId] = useState(" *****");
  const [materiales, setMateriales] = useState([]);
  const [unidades, setUnidades] = useState([]);

  const obtenerSubClasificaciones = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/subclasificaciones`
      );
      setSubClasificaciones(response.data);
    } catch (error) {
      toast.error("Error al obtener sub clasificaciones");
      console.error(error);
    }
  };

  const obtenerMateriales = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/materiales`
      );
      setMateriales(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener materiales");
    }
  };

  const obtenerUnidades = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEVICE_IP}/api/unidades`
      );
      setUnidades(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener unidades");
    }
  };

  const onSubmit = async (data) => {
    const {
      id_subclasificacion,
      id_tpmaterial,
      id_unidad,
      apl_inst,
      observaciones,
      nombredescriptivoProducto,
    } = data;
    console.log(data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEVICE_IP}/api/producto`,
        {
          id_subclasificacion,
          id_tpmaterial,
          id_unidad,
          apl_inst,
          precio_sin_inst: precioSinInstalacion,
          precio_con_inst: precioConInstalacion,
          observaciones,
          nombredescriptivoProducto,
        }
      );
      setId(response.data.id);
      toast.success("Producto registrado");
    } catch (error) {
      toast.error("Error al registrar el producto");
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerSubClasificaciones();
    obtenerMateriales();
    obtenerUnidades();
  }, []);

  useEffect(() => {
    if (instalacion === "0") {
      setPrecioConInstalacion(precioSinInstalacion);
    }
  }, [instalacion, precioSinInstalacion]);

  return (
    <section className="text-gray-800 bg-gray-50 dark:bg-darkMode-fondo dark:text-darkMode-font h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border shadow rounded w-full max-w-2xl dark:bg-darkMode-form dark:border-darkMode-border flex flex-col gap-3 px-5 py-7"
      >
        <h2 className="text-4xl font-semibold">Productos</h2>
        <article className="flex gap-4">
          <article>
            <label className="font-semibold text-sm">ID</label>
            <input
              type="text"
              value={id}
              disabled
              className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white"
            />
          </article>
          <article className="flex-grow">
            <label className="font-semibold text-sm">Sub clasificacion</label>
            <select
              {...register("id_subclasificacion")}
              className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white"
            >
              {subClasificaciones.map((item, i) => (
                <option key={i} value={item.id_subclasificacion}>
                  {item.nom_subclasificacion}
                </option>
              ))}
            </select>
          </article>
          <article className="flex-grow">
            <label className="font-semibold text-sm">Material</label>
            <select
              {...register("id_tpmaterial")}
              className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white"
            >
              {materiales.map((item, i) => (
                <option key={i} value={item.id_material}>
                  {item.nom_material}
                </option>
              ))}
            </select>
          </article>
          <article className="flex-grow">
            <label className="font-semibold text-sm">Unidad</label>
            <select
              {...register("id_unidad")}
              className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white"
            >
              {unidades.map((item, i) => (
                <option key={i} value={item.id_unidad}>
                  {item.nom_unidad}
                </option>
              ))}
            </select>
          </article>
        </article>
        <article>
          <label className="font-semibold text-sm">Nombre</label>
          <input
            type="text"
            {...register("nombredescriptivoProducto")}
            className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white"
          ></input>
        </article>
        <article className="flex items-center gap-2">
          <article>
            <label className="font-semibold text-sm">Instalacion</label>
            <select
              value={instalacion}
              {...register("apl_inst")}
              onChange={(e) => setInstalacion(e.target.value)}
              className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white"
            >
              <option value="1">Si</option>
              <option value="0">No</option>
            </select>
          </article>
          <article className="flex-grow">
            <label className="font-semibold text-sm">
              Precio sin instalacion
            </label>
            <input
              type="number"
              {...register("precio_sin_inst")}
              value={precioSinInstalacion}
              onChange={(e) => setPrecioSinInstalacion(e.target.value)}
              className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white"
            />
          </article>
          <article className="flex-grow">
            <label className="font-semibold text-sm">
              Precio con instalacion
            </label>
            <input
              type="number"
              {...register("precio_con_inst")}
              value={precioConInstalacion}
              onChange={(e) => setPrecioConInstalacion(e.target.value)}
              disabled={instalacion === "N"}
              className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white"
            />
          </article>
        </article>
        <article>
          <label className="font-semibold text-sm">Observaciones</label>
          <textarea
            {...register("observaciones")}
            className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white"
          ></textarea>
        </article>
        <button className="w-full transition duration-300 text-white bg-black font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800">
          Registrar producto
        </button>
      </form>
    </section>
  );
}

export default ProductosCreateView;
