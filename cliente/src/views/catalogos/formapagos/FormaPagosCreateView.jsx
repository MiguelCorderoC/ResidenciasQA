import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function FormaPagosCreateView() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { nom_fpago, des_fpago } = data;
    try {
      await axios.post(`${import.meta.env.VITE_DEVICE_IP}/api/formaspago`, {
        nom_fpago,
        des_fpago,
      });
      toast.success("forma de pago registrado");
    } catch (error) {
      toast.error("Error al registrar forma de pago");
      console.error(error);
    }
  };

  return (
    <>
      <section className="text-gray-800 bg-gray-50 dark:bg-darkMode-fondo dark:text-darkMode-font h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border shadow rounded w-full max-w-2xl dark:bg-darkMode-form dark:border-darkMode-border flex flex-col gap-3 px-5 py-7"
        >
          <h2 className="text-4xl font-semibold">Registrar forma de pago</h2>
          <article>
            <label className="font-semibold text-sm">Nombre</label>
            <input
              type="text"
              {...register("nom_fpago", {
                required: "Campo obligatorio",
              })}
              className={`border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white ${
                errors.nom_fpago && "ring-2 ring-red-500"
              }`}
            />
            {errors.nom_fpago && (
              <span className="text-red-600 text-sm font-bold">
                {errors.nom_fpago.message}
              </span>
            )}
          </article>
          <article>
            <label className="font-semibold text-sm">Descripcion</label>
            <textarea
              {...register("des_fpago")}
              className={`border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 focus:ring-2 dark:focus:border-blue-600 transition duration-300 w-full block p-2.5 dark:bg-darkMode-fondo dark:border-gray-600 dark:text-white`}
            ></textarea>
          </article>
          <button className="w-full transition duration-300 text-white bg-black font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800">
            Registrar forma de pago
          </button>
        </form>
      </section>
    </>
  );
}
export default FormaPagosCreateView;
