import Portada from "../components/Portada";
import Servicios from "../components/Servicios";
import QuienesSomos from "../components/QuienesSomos";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <Portada />
      <Servicios />
      <QuienesSomos />
      <Contacto />
      <Footer />
    </>
  );
}

export default HomePage;
