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
          </Routes>
        </main>
      </AuthProvider>
    </>
  );
}

export default App;
