import { useAuth } from "../../context/AuthContext";

function UpdateProfileView() {
  const auth = useAuth();
  const { email, displayName, photoURL } = auth.user || {};
  return (
    <>
      <section className="text-gray-800 bg-gray-50 dark:bg-gray-900 h-screen flex justify-center items-center">
        <form className="border shadow rounded w-full max-w-2xl flex flex-col gap-3 px-5 py-7">
          <h2 className="text-4xl font-semibold">Configurar perfil</h2>
          <article className="flex items-center gap-2">
            <img
              src={photoURL}
              alt="Foto de usuario"
              className="size-20 rounded-full"
            />
            <article className="flex flex-col">
              <span className="font-semibold text-sm">{displayName}</span>
              <span className="font-semibold text-sm">{email}</span>
            </article>
          </article>
          <article>
            <label className="font-semibold text-sm">Nombre de usuario</label>
            <input
              type="text"
              defaultValue={displayName}
              className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </article>
          <article>
            <label className="font-semibold text-sm">Foto de usuario</label>
            <input
              type="text"
              defaultValue={photoURL}
              className="border rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-400 focus:ring-2 focus:border-blue-400 transition duration-300 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </article>
          <button className="w-full transition duration-300 text-white bg-black font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800">
            Actualizar informacion
          </button>
        </form>
      </section>
    </>
  );
}
export default UpdateProfileView;
