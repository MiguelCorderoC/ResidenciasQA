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

function App() {
  const location = useLocation();
  const noSidebarRoutes = ["/login", "/another-route"];

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
          </Routes>
        </main>
      </AuthProvider>
    </>
  );
}

export default App;
