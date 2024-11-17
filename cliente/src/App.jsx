import { Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SideBar from "./components/SideBar";
import HomeView from "./views/HomeView";
import LogInView from "./views/auth/LogInView";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductosView from "./views/productos/ProductosView";
import ProductosCreateView from "./views/productos/ProductosCreateView";
import CotizacionesView from "./views/cotizaciones/CotizacionesView";
import CotizacionesCreateView from "./views/cotizaciones/CotizacionesCreateView";
import ClasificacionesView from "./views/catalogos/clasificaciones/ClasificacionesView";
import SubClasificacionesView from "./views/catalogos/subclasificaciones/SubClasificacionesView";
import RecoveryPasswordView from "./views/auth/RecoveryPasswordView";
import SignInView from "./views/auth/SignInView";
import UpdateProfileView from "./views/auth/UpdateProfileView";
import TiposClientesView from "./views/catalogos/tiposclientes/TiposClientesView";
import TiposClientesCreateView from "./views/catalogos/tiposclientes/TiposClientesCreateView";
import EstadosClientesView from "./views/catalogos/estadosclientes/EstadosClientesView";
import EstadosClientesCreateView from "./views/catalogos/estadosclientes/EstadosClientesCreateView";
import ClientesView from "./views/clientes/ClientesView";
import ClientesCreateView from "./views/clientes/ClientesCreateView";
import ClasificacionesCreateView from "./views/catalogos/clasificaciones/ClasificacionesCreateView";
import SubClasificacionesCreateView from "./views/catalogos/subclasificaciones/SubClasificacionesCreateView";
import TiposClientesEditView from "./views/catalogos/tiposclientes/TiposClientesEdit";
import MaterialesView from "./views/catalogos/materiales/MaterialesView";
import MaterialesCreateView from "./views/catalogos/materiales/MaterialesCreateView";
import UnidadesView from "./views/catalogos/unidades/UnidadesView";
import UnidadesCreateView from "./views/catalogos/unidades/UnidadesCreateView";
import AcabadosView from "./views/catalogos/acabados/AcabadosView";
import AcabadosCreateView from "./views/catalogos/acabados/AcabadosCreateView";
import TipoVentasView from "./views/catalogos/tipoventas/TipoVentasView";
import TipoVentasCreateView from "./views/catalogos/tipoventas/TipoVentasCreateView";
import ProcesosView from "./views/catalogos/procesos/ProcesosView";
import ProcesosCreateView from "./views/catalogos/procesos/ProcesosCreateView";
import FormaPagosView from "./views/catalogos/formapagos/FormaPagosView";
import FormaPagosCreateView from "./views/catalogos/formapagos/FormaPagosCreateView";

function App() {
  const location = useLocation();
  const noSidebarRoutes = ["/login", "/recovery-password"];

  const mainClassName = noSidebarRoutes.includes(location.pathname)
    ? ""
    : "pl-40";

  return (
    <>
      <Toaster closeButton richColors position="top-center" />
      <AuthProvider>
        {!noSidebarRoutes.includes(location.pathname) && <SideBar />}
        <main className={mainClassName}>
          <Routes>
            <Route path="/login" element={<LogInView />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomeView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/productos"
              element={
                <ProtectedRoute>
                  <ProductosView />
                </ProtectedRoute>
              }
            />
            <Route
              path="productos/create"
              element={
                <ProtectedRoute>
                  <ProductosCreateView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cotizaciones"
              element={
                <ProtectedRoute>
                  <CotizacionesView />
                </ProtectedRoute>
              }
            />
            <Route
              path="cotizaciones/create"
              element={
                <ProtectedRoute>
                  <CotizacionesCreateView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clasificaciones"
              element={
                <ProtectedRoute>
                  <ClasificacionesView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subclasificaciones"
              element={
                <ProtectedRoute>
                  <SubClasificacionesView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recovery-password"
              element={<RecoveryPasswordView />}
            />
            <Route
              path="/signin"
              element={
                <ProtectedRoute>
                  <SignInView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-profile"
              element={
                <ProtectedRoute>
                  <UpdateProfileView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tipos-clientes"
              element={
                <ProtectedRoute>
                  <TiposClientesView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tipos-clientes/create"
              element={
                <ProtectedRoute>
                  <TiposClientesCreateView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/estados-clientes"
              element={
                <ProtectedRoute>
                  <EstadosClientesView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/estados-clientes/create"
              element={
                <ProtectedRoute>
                  <EstadosClientesCreateView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clientes"
              element={
                <ProtectedRoute>
                  <ClientesView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clientes/create"
              element={
                <ProtectedRoute>
                  <ClientesCreateView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clasificaciones/create"
              element={
                <ProtectedRoute>
                  <ClasificacionesCreateView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subclasificaciones/create"
              element={
                <ProtectedRoute>
                  <SubClasificacionesCreateView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tipos-clientes/edit/:id"
              element={
                <ProtectedRoute>
                  <TiposClientesEditView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/materiales"
              element={
                <ProtectedRoute>
                  <MaterialesView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/materiales/create"
              element={
                <ProtectedRoute>
                  <MaterialesCreateView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/unidades"
              element={
                <ProtectedRoute>
                  <UnidadesView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/unidades/create"
              element={
                <ProtectedRoute>
                  <UnidadesCreateView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/acabados"
              element={
                <ProtectedRoute>
                  <AcabadosView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/acabados/create"
              element={
                <ProtectedRoute>
                  <AcabadosCreateView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tipo-ventas"
              element={
                <ProtectedRoute>
                  <TipoVentasView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tipo-ventas/create"
              element={
                <ProtectedRoute>
                  <TipoVentasCreateView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/procesos"
              element={
                <ProtectedRoute>
                  <ProcesosView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/procesos/create"
              element={
                <ProtectedRoute>
                  <ProcesosCreateView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/formas-pagos"
              element={
                <ProtectedRoute>
                  <FormaPagosView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/formas-pagos/create"
              element={
                <ProtectedRoute>
                  <FormaPagosCreateView />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </AuthProvider>
    </>
  );
}

export default App;
