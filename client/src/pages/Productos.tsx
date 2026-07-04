import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { Product } from '../types';
import { dummyProducts, categoriesData } from '../assets/assets'; // 1. Importado categoriesData
import { Home as HomeIcon } from 'lucide-react'; // 2. Renombrado para que no choque con la página Home
import ProductCard from '../components/ProductCard'; // Importación de tus tarjetas

const Productos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const category = searchParams.get('category') || '';
  const organic = searchParams.get('organic') || '';
  const sort = searchParams.get('sort') || '';
  const page = Number(searchParams.get('page')) || 1;
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  const fetchProducts = async () => {
    setLoading(true);
    setProducts(dummyProducts.filter((p) => p.category === category || category === ""));
    setLoading(false);
  }

  const updateFilters = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    if (key !== 'page') {
      newParams.delete('page'); 
    }
    setSearchParams(newParams);
  }

  const clearFilters = () => setSearchParams({});

  const activeCategory = categoriesData.find(c => c.slug === category);
  const hasFilters = category || organic || minPrice || maxPrice;

  useEffect(() => {
    fetchProducts();
  }, [category, organic, sort, page, minPrice, maxPrice]);

  return (
    <div className='min-h-screen bg-app-cream'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/** Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
          <Link to="/" className="hover:text-app-green transition-colors">
            <HomeIcon className="size-4" /> {/* Corregido aquí */}
          </Link>
          <span>/</span>
          <span className='text-app-green font-medium'>
            {activeCategory ? activeCategory.name : "Todos los productos"}
          </span>
        </nav>

        {/** Vista de la Tienda (Grid del Tutorial) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Barra Lateral de Filtros */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-zinc-800 mb-4">Filtros</h3>
              <p className="text-xs text-zinc-400">Rango de precios y categorías</p>
            </div>
          </div>

          {/* Contenedor de Productos */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12 text-zinc-400">Cargando la despensa...</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Productos;