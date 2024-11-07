import { toast } from "sonner";
import ThemeButton from "../../components/ThemeButton";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";

function RecoveryPasswordView() {
  const auth = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email } = data;
    try {
      await auth.resetPassword(email);
      toast.success("Se envio un enlace de recuperacion a " + email);
    } catch (error) {
      toast.error("Error al enviar enlace de recuperacion");
      console.error(error);
    }
  };

  return (
    <>
      <article className="absolute top-5 right-5">
        <ThemeButton />
      </article>
      <section className="bg-gray-50 dark:bg-gray-900 flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 flex flex-col gap-3 border shadow rounded w-full max-w-md px-5 py-7"
        >
          <article>
            <h2 className="font-semibold text-3xl">Recupera tu contraseña</h2>
            <span className="font-semibold text-sm">
              Ingresa tu correo y recibiras un enlace para restablecer tu
              contraseña
            </span>
          </article>
          <article>
            <label className="font-semibold text-sm">Correo electronico</label>
            <input
              type="email"
              {...register("email", {
                required: "Campo obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                  message: "Ingresa un correo Gmail",
                },
              })}
              className={`border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.email && "ring-2 ring-red-500"
              }`}
            />
            {errors.email && (
              <span className="text-red-600 text-sm font-bold">
                {errors.email.message}
              </span>
            )}
          </article>
          <button className="w-full transition duration-300 text-white bg-black font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800">
            Enviar enlace
          </button>
        </form>
      </section>
    </>
  );
}
export default RecoveryPasswordView;
