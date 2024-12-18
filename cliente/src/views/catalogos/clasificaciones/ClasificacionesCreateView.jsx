import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function ClasificacionesCreateView() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { nom_clasificacion, des_clasificacion } = data;
    try {
      await axios.post(
        `${import.meta.env.VITE_DEVICE_IP}/api/clasificaciones`,
        {
          nom_clasificacion,
          des_clasificacion,
        }
      );

      toast.success("Clasificacion registrada");
    } catch (error) {
      toast.error("Error al registrar clasificacion");
      console.error(error);
    }
  };

  return (
    <>
      <section className="text-gray-800 bg-gray-50 dark:bg-darkMode-fondo h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border dark:bg-darkMode-form dark:border-darkMode-border dark:text-darkMode-font shadow rounded w-full max-w-2xl flex flex-col gap-3 px-5 py-7"
        >
          <h2 className="text-4xl font-semibold">Registrar clasificacion</h2>
          <article>
            <label className="font-semibold text-sm">Nombre</label>
            <input
              type="text"
              {...register("nom_clasificacion", {
                required: "Campo obligatorio",
              })}
              className={`border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white ${
                errors.nom_clasificacion && "ring-2 ring-red-500"
              }`}
            />
            {errors.nom_clasificacion && (
              <span className="text-red-600 text-sm font-bold">
                {errors.nom_clasificacion.message}
              </span>
            )}
          </article>
          <article>
            <label className="font-semibold text-sm">Descripcion</label>
            <textarea
              {...register("des_clasificacion")}
              className={`border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white`}
            ></textarea>
          </article>
          <button className="w-full transition duration-300 text-white bg-black font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800">
            Registrar clasificacion
          </button>
        </form>
      </section>
    </>
  );
}
export default ClasificacionesCreateView;
