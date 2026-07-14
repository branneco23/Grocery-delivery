<<<<<<< HEAD
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import type { Product } from "../types";
import { dummyProducts } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowLeftIcon, ArrowRightIcon, HomeIcon, LeafIcon, Link2, MinusIcon, PlusIcon, ShoppingCartIcon, StarIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";
import DummyReviewsSection from "../components/DummyReviewsSection"; // Ajusta la ruta si es necesario
=======
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { dummyProducts } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowLeftIcon, HomeIcon, LeafIcon, MinusIcon, PlusIcon, StarIcon, ShoppingCartIcon, ArrowRightIcon } from 'lucide-react';

// 1. Unificado en una sola importación limpia
import type { Product, CartItem } from '../types';
import DummyReviewsSection from '../../public/DummyReviewsSection';
import ProductCard from '../components/ProductCard';
>>>>>>> 34b582c (Mis cambios locales de la página de productos)

const PaginaProductos = () => {

  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
<<<<<<< HEAD
  const { id } = useParams()
  const navigate = useNavigate()
  const { items, addToCart, updateQuantity, removeFromCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true);
  const [localQuantity, setLocalQuantity] = useState(1)

  useEffect(() => {
    setLoading(true)
    setLocalQuantity(1);
    window.scrollTo(0, 0)
    const product = dummyProducts.find((p) => p._id === id)
    setProduct(product!)
    setRelatedProducts(dummyProducts.filter((p) => p._id !== id))
    setLoading(false)

  }, [id, navigate])

  if (loading) return <Loading />
  if (!product) return null;

  const cartItem = items.find((item) => item.product._id === product._id)
  const inCart = !!cartItem;
  const displayQuantity = inCart ? cartItem.quantity : localQuantity

  const handleMinus = () => {
    if (inCart) {
      if (cartItem.quantity > 1) updateQuantity(product._id, cartItem.quantity - 1)
      else removeFromCart(product._id)
    } else {
=======
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [localQuantity, setLocalQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setLocalQuantity(1);
    window.scrollTo(0, 0);
    const product = dummyProducts.find((p) => p._id === id);
    setProduct(product!);
    setRelatedProducts(dummyProducts.filter((p) => p._id !== id));
    loading && setLoading(false);
  }, [id, navigate]);

  if (loading) return <Loading />;
  if (!product) return null;

  // 2. Corregido a minúscula 'cartItem' para evitar conflictos con el tipo 'CartItem'
  const cartItem = items.find((item) => item.product._id === product._id);
  const inCart = !!cartItem;
  const displayQuantity = inCart ? cartItem.quantity : localQuantity;

  const handleMinus = () => {
    if(inCart){
      if(cartItem.quantity > 1) updateQuantity(product._id, cartItem.quantity - 1)
        else removeFromCart(product._id)
    }else{
>>>>>>> 34b582c (Mis cambios locales de la página de productos)
      setLocalQuantity(Math.max(1, localQuantity - 1))
    }
  }

  const handlePlus = () => {
<<<<<<< HEAD
    if (inCart) updateQuantity(product._id, cartItem.quantity + 1)
    else setLocalQuantity(localQuantity + 1)
=======
    if(inCart) updateQuantity(product._id, cartItem.quantity + 1)
      else setLocalQuantity(localQuantity + 1)
>>>>>>> 34b582c (Mis cambios locales de la página de productos)
  }

  const categoryLabel = product.category.replace(/-/g, " ");

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
<<<<<<< HEAD
          <Link to='/' className="hover:text-app-green transition-colors">
            <HomeIcon className="size-4" />
          </Link>
          <span>/</span>
          <Link to='/products' className="hover:text-app-green transition-colors">
            Productos
          </Link>
          <span>/</span>
          <Link to={'/products?category=$product.category}'} className="hover:text-app-green transition-colors capitalize">
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-app-green font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Back button */}
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-1.5 text-sm text-app-text-light hover:text-app-green transition-colors">
          <ArrowLeftIcon className="size-4" /> Volver
        </button>

        {/* Products Details Section */}
        <div className="bg-white/50 rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* left side - Image */}
            <div className="relative flex-center p-8 md:p-12 min-h-[320px] md:min-h-[480px]">
              <img src={product.image} alt={product.name} className="max-h-[360px] w-auto object-contain" />

              <div className="absolute top-5 left-5 flex flex-wrap gap-1.5">

                {product.isOrganic && (
                  <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-app-green text-white rounded-full">
                    <LeafIcon className="w-3 h-3" />
                    Orgánico
                  </span>
                )}

                {product.discount > 0 && (
                  <span className="px-2.5 py-1 text-xs font-semibold bg-app-orange text-white rounded-full">
=======
          <Link to='/' className='hover:text-app-green transition-colors'>
            <HomeIcon className='size-4' />
          </Link>
          <span>/</span>
          <Link to="/products" className='hover:text-app-green transition-colors'>
            Productos
          </Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className='hover:text-app-green transition-colors capitalize'>
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className='text-app-green font-medium truncate max-w-[200px]'>{product.name}</span>
        </nav>

        {/* Back button */}
        <button onClick={() => navigate(-1)} className='mb-6 flex items-center gap-1.5 text-sm text-app-text-light hover:text-app-green transition-colors'>
          <ArrowLeftIcon className='size-4' />Atrás
        </button>

        {/* Product Details Section */}
        <div className='bg-white rounded-2xl overflow-hidden shadow-sm'>
          <div className='grid md:grid-cols-2 gap-0'>
            {/* Left side - Image */}
            <div className='relative flex items-center justify-center p-8 md:p-12 min-h-[320px] md:min-h-[480px] bg-gray-50/50'>
              <img src={product.image} alt={product.name} className="max-h-[360px] w-auto object-contain" />

              <div className='absolute top-5 left-5 flex flex-wrap gap-1.5'>
                {product.isOrganic && (
                  <span className='flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-app-green text-white rounded-full'>
                    <LeafIcon className='w-3 h-3' />
                    Orgánica
                  </span>
                )}
                {product.discount > 0 && (
                  <span className='px-2.5 py-1 text-xs font-semibold bg-app-orange text-white rounded-full'>
>>>>>>> 34b582c (Mis cambios locales de la página de productos)
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>

<<<<<<< HEAD
            {/* Badges */}


            {/* right side - Details */}
            <div className="p-6 md:p-10 flex flex-col jsutify-center">
              <span className="text-xs font-medium text-app-text-light tracking-wider mb-2 capitalize">{categoryLabel}</span>
              <h1 className="text-2xl md:text-3xl font-semibold text-app-green mb-3">{product.name}</h1>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} className={`w-4 h-4 ${star < Math.round(product.rating) ? "text-app-warning fill-app-warning" : "text-app-border"}`} />
                    ))}
                  </div>
                  <div className="flex items-center gap-0.5">Estrellas</div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-app-text-light">({product.reviewCount}) vistas</span>
                </div>
              )}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-3xl md:text-4xl font-semibold text-app-green">{currency}{product.price.toFixed(2)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-app-text-light line-through">{currency}{product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              {/*Description*/}
              <p className="text-sm text-app-text-light leading-ralaxed mb-6">{product.description}</p>
=======
            {/* Right side - Details */}
            <div className='p-6 md:p-10 flex flex-col justify-center'>
              <span className='text-xs font-medium text-app-text-light tracking-wider mb-2 capitalize'>{categoryLabel}</span>
              <h1 className='text-2xl md:text-3xl font-semibold text-app-green mb-3'>{product.name}</h1>

              {/* Rating (CORREGIDO: Ahora se cierra inmediatamente aquí) */}
              {product.rating > 0 && (
                <div className='flex items-center gap-2 mb-5'>
                  <div className='flex items-center gap-0.5'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon 
                        key={star} 
                        className={`w-4 h-4 ${star <= Math.round(product.rating) ? "text-app-warning fill-app-warning" : "text-app-border"}`}
                      />
                    ))}
                  </div>
                  <span className='text-sm font-medium'>{product.rating}</span>
                  <span className='text-sm text-app-text-light'>({product.reviewCount} reseñas)</span>
                </div>
              )}

              {/* Price */}
              <div className='flex items-baseline gap-3 mb-5'>
                <span className='text-3xl md:text-4xl font-semibold text-app-green'>
                  {currency}{product.price.toFixed(2)}
                </span>
                {product.originalPrice > product.price && (
                  <span className='text-lg text-app-text-light line-through'>
                    {currency}{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-app-text-light leading-relaxed mb-6">{product.description}</p>
>>>>>>> 34b582c (Mis cambios locales de la página de productos)

              {/* Stock */}
              <div className="mb-6">
                {product.stock > 0 ? (
<<<<<<< HEAD
                  <span className="text-sm text-app-success font-medium">✓ En Stock ({product.stock} disponible)</span>
                ) : (
                  <span className="text-sm text-app-error font-medium">Agotado</span>
                )}
              </div>

              {/* Cantidad + Agregar al Carrito*/}
              <div className="flex items-center gap-3">
                {/* Cantidad */}
                <div className="flex items-center border border-app-border rounded-xl overflow-hidden">
                  <button onClick={handleMinus} className="p-3 hover:bg-app-cream transition-colors">
                    <MinusIcon className="w-4 h-4" />
=======
                  <span className="text-sm text-app-success font-medium">✓ In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-sm text-app-error font-medium">Out of Stock</span>
                )}
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-3">
                {/* Quantity Selector */}
                <div className="flex items-center border border-app-border rounded-xl overflow-hidden bg-white">
                  <button onClick={handleMinus} className='p-3 hover:bg-app-cream transition-colors'>
                    <MinusIcon className='w-4 h-4'/>
>>>>>>> 34b582c (Mis cambios locales de la página de productos)
                  </button>

                  <span className="px-5 text-sm font-semibold min-w-[40px] text-center">{displayQuantity}</span>

                  <button onClick={handlePlus} className="p-3 hover:bg-app-cream transition-colors">
<<<<<<< HEAD
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
                {/*Agregar al Carrito*/}
                <button onClick={() => { if (!inCart) addToCart(product, localQuantity) }} disabled={product.stock === 0} className={`flex-1 py-3 font-semibold rounded-xl transition-colors flex-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${inCart ? "bg-app-cream text-app-green border border-app-green" : "bg-app-orange text-white hover:bg-app-orange-dark"}`}>
                  <ShoppingCartIcon className="w-4 h-4" />
=======
                    <PlusIcon className="w-4 h-4"/>
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button onClick={()=>{
                  if(!inCart) addToCart(product, localQuantity)
                }} 
                  disabled={product.stock === 0} className={`flex-1 py-3 font-senibold rounded-xl transition-colors flex-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${inCart ? "bg-app-cream text-app-green border border-app-green" : "bg-app-orange text-white hover:bg-app-orange-dark" }`}>
                  <ShoppingCartIcon className='w-4 h-4'/>
>>>>>>> 34b582c (Mis cambios locales de la página de productos)
                  {inCart ? "Agregado al Carrito" : "Agregar al carrito"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
<<<<<<< HEAD

        {product.reviewCount > 0 && <DummyReviewsSection product={product} />}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12 mb-44">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-app-green">Productos Relacionados</h2>
                <p className="text-sm text-app-text-light mt-1">Más de {categoryLabel}</p>
              </div>
              <Link className="text-sm font-semibold text-app-orange hover:text-app-orange-dark flex items-center gap-1 transition-colors" to={`/products?category=${product.category}`}>
                Ver Todo <ArrowRightIcon className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-8">
              {relatedProducts.slice(0, 5).map((rp) => (
                <ProductCard key={rp._id} product={rp} />
=======
        {product.reviewCount > 0 && <DummyReviewsSection product={product}/>}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className='mt-12 mb-44'>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className='text-2xl font-semibold text-app-green'>Productos Relacionados</h2>
                <p className='text-sm text-app-text-light mt-1'>Más de {categoryLabel}</p>
              </div>
              <Link className="text-sm font-semibold text-app-orange hover:text-app-orange-dark flex items-center gap-1 transition-colors" to={`/products?category=${product.category}`}>
                Ver Todos <ArrowRightIcon className='size-4'/>
              </Link>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-8'>
              {relatedProducts.slice(0,5).map((rp)=> (
                <ProductCard key={rp._id} product={rp}/>
>>>>>>> 34b582c (Mis cambios locales de la página de productos)
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PaginaProductos;