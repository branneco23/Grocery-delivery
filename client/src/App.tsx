import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import Productos from './pages/Productos';
import CarritoCompras from './pages/CarritoCompras'
import OrderTracking from './pages/OrderTracking';
import ProtectedRoute from './components/ProtectedRoute';
import PaginaProductos from './pages/PaginaProductos';
import BuscarResultados from './pages/BuscarResultados';
import OfertaRelampago from './pages/OfertaRelampago';
import MisOrdenes from './pages/MisOrders';
import Direcciones from './pages/Direcciones';
import Inicio from './pages/Inicio';

const App = () => {
  return (
    <>
      <Toaster position='top-right' toastOptions={{
        duration: 3000, style: {
          background: "#1B3022", color: "#fff", borderRadius: "12px", fontSize:
            "14px"
        }
      }} />

      <Routes>
        {/* Auth pages - No Navbar/Footer */}
        <Route path='/login' element={<Login />} />
        {/* Auth pages - With Navbar/Footer */}
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Inicio />} />
          <Route path="productos" element={<Productos />} />
          <Route path="productos/:id" element={<PaginaProductos />} />
          <Route path="search" element={<BuscarResultados />} />
          <Route path="deals" element={<OfertaRelampago />} />
          <Route element={<ProtectedRoute />}>
            <Route path="checkout" element={<CarritoCompras />}  />
            <Route path="orders" element={<MisOrdenes />}  />
            <Route path="orders/:id" element={<OrderTracking />}  />
            <Route path="addresses" element={<Direcciones />}  />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;