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
    },
  });
  const [subClasificaciones, setSubClasificaciones] = useState([]);
  const [instalacion, setInstalacion] = useState("S");
  const [precioSinInstalacion, setPrecioSinInstalacion] = useState("");
  const [precioConInstalacion, setPrecioConInstalacion] = useState("");
  const [id, setId] = useState("*****");

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

  const onSubmit = async (data) => {
    const {
      aplicar_instalacion,
      precio_con_instalacion,
      precio_sin_instalacion,
      observaciones,
      id_subclasificacion,
    } = data;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEVICE_IP}/api/productos`,
        {
          aplicar_instalacion,
          precio_con_instalacion,
          precio_sin_instalacion,
          observaciones,
          id_subclasificacion,
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
  }, []);

  useEffect(() => {
    if (instalacion === "N") {
      setPrecioConInstalacion(precioSinInstalacion);
    }
  }, [instalacion, precioSinInstalacion]);

  return (
    <section className="text-gray-800 bg-gray-50 dark:bg-gray-900 h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border shadow rounded w-full max-w-2xl flex flex-col gap-3 px-5 py-7"
      >
        <h2 className="text-4xl font-semibold">Productos</h2>
        <article className="flex gap-4">
          <article>
            <label className="font-semibold text-sm">ID</label>
            <input
              type="text"
              value={id}
              disabled
              className="border rounded h-10 bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </article>
          <article className="flex-grow">
            <label className="font-semibold text-sm">Sub clasificacion</label>
            <select
              {...register("id_subclasificacion")}
              className="border rounded h-10 bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
            >
              {subClasificaciones.map((item, i) => (
                <option key={i} value={item.subclasificacion_id}>
                  {item.subclasificacion_nombre}
                </option>
              ))}
            </select>
          </article>
        </article>
        <article>
          <label className="font-semibold text-sm">Instalacion</label>
          <select
            value={instalacion}
            {...register("aplicar_instalacion")}
            onChange={(e) => setInstalacion(e.target.value)}
            className="border rounded h-10 bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
          >
            <option value="S">Si</option>
            <option value="N">No</option>
          </select>
        </article>
        <article>
          <label className="font-semibold text-sm">
            Precio sin instalacion
          </label>
          <input
            type="number"
            {...register("precio_sin_instalacion")}
            value={precioSinInstalacion}
            onChange={(e) => setPrecioSinInstalacion(e.target.value)}
            className="border rounded h-10 bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </article>
        <article>
          <label className="font-semibold text-sm">
            Precio con instalacion
          </label>
          <input
            type="number"
            {...register("precio_con_instalacion")}
            value={precioConInstalacion}
            onChange={(e) => setPrecioConInstalacion(e.target.value)}
            disabled={instalacion === "N"}
            className="border rounded h-10 bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </article>
        <article>
          <label className="font-semibold text-sm">Observaciones</label>
          <textarea
            {...register("observaciones")}
            className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
