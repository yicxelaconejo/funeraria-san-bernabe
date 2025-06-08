import { BrowserRouter, Routes, Route, useLocation, matchPath } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import HeadlinePage from "./pages/HeadlinePage.jsx";
import HeadlineFormPage from "./pages/HeadlineFormPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { HeadlineProvider } from "./context/HeadlinesContext.jsx";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import DetallesHeadlinePage from "./pages/DetallesHeadlinePage.jsx";
import RouteMap from "./components/RouteMap.jsx";
import RutaMapaTitular from "./components/Headlines/RutaMapaTitular.jsx";
import AfiliadoFormPage from "./pages/AfiliadoFormPage.jsx";
import AfiliadosTablePage from "./pages/AfiliadosTablePage.jsx";
import DetalleAfiliadoPage from "./pages/DetalleAfiliadoPage.jsx";
import { AfiliadoProvider } from "./context/AfiliadoContext.jsx";

function AppRoutes() {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/headlines",
    "/create-headline",
    "/update-headlines/:id",
    "/get-headlines/:id",
    "/profile",
    "/ruta-cobro",
    "/ruta-cobro/:id",
    "/register-afiliado",
    "/titulares/:id/afiliados",
    "/titulares/:id/afiliados/register",
    "/titulares/:id/afiliados/:afiliadoId/update",
    "/get-afiliado/:id",
  ];

  const hideNavbar = hideNavbarRoutes.some((route) => {
    try {
      return matchPath({ path: route }, location.pathname);
    } catch (error) {
      console.error("Error en matchPath:", route, error);
      return false;
    }
  });

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/headlines" element={<HeadlinePage />} />
          <Route path="/create-headline" element={<HeadlineFormPage />} />
          <Route path="/update-headlines/:id" element={<HeadlineFormPage />} />
          <Route path="/get-headlines/:id" element={<DetallesHeadlinePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ruta-cobro" element={<RouteMap />} />
          <Route path="/ruta-cobro/:id" element={<RutaMapaTitular />} />

          <Route path="/titulares/:id/afiliados" element={<AfiliadosTablePage />} />
          <Route path="/titulares/:id/afiliados/register" element={<AfiliadoFormPage />} />
          <Route path="/titulares/:id/afiliados/:afiliadoId/update" element={<AfiliadoFormPage />} />
          <Route path="/get-afiliado/:id" element={<DetalleAfiliadoPage />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <HeadlineProvider>
        <AfiliadoProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AfiliadoProvider>
      </HeadlineProvider>
    </AuthProvider>
  );
}

export default App;
