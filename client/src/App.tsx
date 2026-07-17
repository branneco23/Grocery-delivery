import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import Home from './pages/Home'; 
import Productos from './pages/Productos'; // Importa tu componente actual
import CarritoCompras from './pages/CarritoCompras';
import OrderTracking from './pages/OrderTracking';
import ProtectedRoute from './components/ProtectedRoute';
import PaginaProductos from './pages/PaginaProductos';
import BuscarResultados from './pages/BuscarResultados';
import OfertaRelampago from './pages/OfertaRelampago';
import MisOrdenes from './pages/MisOrders';
import Direcciones from './pages/Direcciones';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminOrders from './pages/admin/AdminOrders';
import AdminDeliveryPartners from './pages/admin/AdminDeliveryPartners';
import DeliveryLogin from './pages/delivery/DeliveryLogin';
import DeliveryLayout from './pages/delivery/DeliveryLayout';
import DeliveryDashboard from './pages/delivery/DeliveryDashboard';

const App = () => {
  return (
    <>
      <Toaster 
        position='top-right' 
        toastOptions={{
          duration: 3000, 
          style: {
            background: "#1B3022", 
            color: "#fff", 
            borderRadius: "12px", 
            fontSize: "14px"
          }
        }} 
      />

      <Routes>
        {/* Auth pages - No Navbar/Footer */}
        <Route path='/login' element={<Login />} />
        
        {/* Pages - With Navbar/Footer */}
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />} /> 
          
          {/* CORREGIDO: Cambiado a "products" para que coincida con la URL que busca el navegador (/products) */}
          <Route path="products" element={<Productos />} />
          <Route path="products/:id" element={<PaginaProductos />} />
          
          <Route path="search" element={<BuscarResultados />} />
          <Route path="deals" element={<OfertaRelampago />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="checkout" element={<CarritoCompras />} />
            <Route path="ordenes" element={<MisOrdenes />} />
            <Route path="ordenes/:id" element={<OrderTracking />} />
            <Route path="addresses" element={<Direcciones />} />
          </Route>
        </Route>
        {/*Admin Pages*/}
        <Route path='/admin' element={<AdminLayout/>}>
          <Route index element={<AdminDashboard/>}/>
          <Route path='products' element={<AdminProducts/>}/>
          <Route path='products/new' element={<AdminProductForm/>}/>
          <Route path='products/:id/edit' element={<AdminProductForm/>}/>
          <Route path='orders' element={<AdminOrders/>}/>
          <Route path='delivery-partners' element={<AdminDeliveryPartners/>}/>
        </Route>
        {/*Delivery Partner pages*/}
        <Route path='/delivery/login' element={<DeliveryLogin/>}/>
        <Route path='/delivery' element={<DeliveryLayout/>}>
          <Route index element={<DeliveryDashboard/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;