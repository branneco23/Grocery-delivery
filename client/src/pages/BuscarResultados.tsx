import { useEffect, useState } from "react";
import type { Product } from "../types";
import { Link, useSearchParams } from "react-router-dom";
import { Home, Search } from "lucide-react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import { toast } from "react-hot-toast/headless";
import api from "../config/api";

const BuscarResultados = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || "";

  useEffect(() => {
    if (!query) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        // Hace la petición limpia a http://localhost:5000/api/products/search?q=...
        const res = await api.get(`/products/search`, {
          params: { q: query }
        });
        
        // Extrae los datos de forma segura sin importar cómo los envíe el backend
        const resultData = res.data.products || res.data.data || res.data || [];
        setProducts(Array.isArray(resultData) ? resultData : []);
      } catch (error: any) {
        toast.error(error.response?.data?.message || error?.message || "Error al buscar productos");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
          <Link to='/' className="hover:text-app-green transition-colors">
            <Home className="size-4"/>
          </Link>
          <span>/</span>
          <span className="text-app-green font-medium">
            Buscar Resultados
          </span>
        </nav>
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-app-green mb-1">Resultados para "{query}"</h1>
          <p className="text-sm text-app-text-light">{loading ? "Buscando..." : `${products.length} productos encontrados`}</p>
        </div>

        {/* Results */}
        {loading ? (
          <Loading/>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Search className="size-16 text-app-border mx-auto mb-4"/>
            <h2 className="text-xl font-semibold text-app-green mb-2">No se encontraron resultados</h2>
            <p className="text-sm text-app-text-light mb-6 max-w-md mx-auto">No pudimos encontrar ningún producto que coincida con "{query}". Prueba con un término de búsqueda diferente.</p>
            <Link to="/products" className="inline-flex px-5 py-2.5 bg-app-green text-white text-sm font-medium rounded-lg">
              Buscar Todos los Productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuscarResultados;