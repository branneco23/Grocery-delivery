import { useEffect, useState } from "react";
import type { Order } from "../types";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { dummyDashboardOrdersData } from "../assets/assets";
import Loading from "../components/Loading";
import { CalendarIcon, PackageIcon } from "lucide-react";

const MisOrdenes = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();

  const tabs = ["all", "Placed", "Out for Delivery", "Delivered"];
  const { clearCart } = useCart();

  const fetchOrders = async () => {
    setLoading(true);
    // Filtramos las órdenes según el tab activo (si no es "all", filtramos por status)
    const allOrders = dummyDashboardOrdersData as unknown as Order[];
    if (activeTab === "all") {
      setOrders(allOrders);
    } else {
      setOrders(allOrders.filter((order) => order.status === activeTab));
    }
    setLoading(false); // CORREGIDO: Desactiva el estado de carga
  };

  useEffect(() => {
    if (searchParams.get("clearCart")) {
      clearCart();
      setSearchParams({});
      setTimeout(() => {
        fetchOrders();
      }, 2000);
    } else {
      fetchOrders();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-app-cream mb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-app-green mb-6">Mis Órdenes</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-xl whitespace-nowrap transition-colors ${activeTab === tab
                  ? "bg-app-green text-white"
                  : "bg-white text-app-text-light hover:bg-app-cream"
                }`}
            >
              {tab === "all"
                ? "Todas las Órdenes"
                : tab === "Placed"
                  ? "Preparando"
                  : tab === "Out for Delivery"
                    ? "En Camino"
                    : "Entregado"}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <PackageIcon className="size-16 text-app-border mx-auto mb-4" />
            <h2 className="text-lg font-medium text-app-green mb-2">Aún no hay pedidos</h2>
            <p className="text-sm text-app-text-light mb-4">
              Empieza a comprar para ver tus pedidos aquí.
            </p>
            <Link to="/products" className="inline-flex px-4 py-2 bg-app-green text-white text-sm rounded-lg">
              Empieza a comprar
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order._id}
                to={`/ordenes/${order._id}`} // CORREGIDO: Coincide con la ruta '/ordenes/:id' de App.tsx
                className="block max-w-4xl bg-white rounded-2xl p-5 hover:shadow transition-all border border-app-border"
              >
                {/* Order id, date & status */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-app-green">
                      Orden #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <CalendarIcon className="size-3.5 text-app-text-light" />
                      <span className="text-xs text-app-text-light">
                        {new Date(order.createdAt).toLocaleDateString("es-CO", {
                          timeZone: "America/Bogota",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Estado visual en la derecha */}
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-app-green animate-pulse" />
                    <span className="text-xs font-semibold text-app-green">
                      {order.status === "Placed"
                        ? "Recibido"
                        : order.status === "Out for Delivery"
                          ? "En camino"
                          : "Entregado"}
                    </span>
                  </div>
                </div>

                {/* COMPLETADO: Miniaturas de ítems */}
                <div className="flex items-center gap-3 overflow-x-auto py-2 my-2 border-t border-b border-gray-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="relative shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="size-14 rounded-lg object-cover border border-gray-100"
                      />
                      <span className="absolute -top-1 -right-1 bg-app-green text-white text-[10px] font-bold size-5 rounded-full flex items-center justify-center border border-white">
                        {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* COMPLETADO: Total ítems & Precio final */}
                <div className="flex items-center justify-between mt-3 text-sm pt-1">
                  <p className="text-app-text-light">
                    {order.items.reduce((acc, item) => acc + item.quantity, 0)} productos
                  </p>
                  <p className="font-semibold text-app-green text-base">
                    {/* Si 'amount' no existe, buscará 'total', y si ninguno existe, usará 0 */}
                    Total: {currency}
                    {((order.amount !== undefined ? order.amount : (order as any).total) || 0).toFixed(2)}
                  </p>
                </div>
                
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MisOrdenes;