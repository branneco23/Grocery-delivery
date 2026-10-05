import { ArrowUpRightIcon, BikeIcon, ChevronDownIcon, LogOutIcon, MapPinIcon, MenuIcon, PackageIcon, SearchIcon, ShieldIcon, ShoppingCartIcon, UserIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

    const { user, logout } = useAuth();
    const { cartCount, setIsCartOpen } = useCart();
    const [searchQuery, setSearchQuery] = useState("");
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => { // Corregido el tipo de evento de React.SubmitEvent a React.FormEvent
      e.preventDefault();
      if(searchQuery.trim()){
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery("");
      }
    };

    const handleLogout = () => {
      logout();
      setUserMenuOpen(false);
      navigate("/");
    };

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-app-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-[22px] font-medium shrink-0">
            <BikeIcon size={24} /> Instacart
          </Link>

          {/* Contenedor principal de acciones */}
          <div className="w-full flex items-center justify-end gap-4 lg:gap-10">
            
            {/* Nav Links - Desktop */}
            <div className="hidden md:flex items-center gap-6 text-sm text-zinc-600 shrink-0">
              <Link to='/'>Inicio</Link>
              <Link to='/products'>Productos</Link>
              <Link to='/deals'>Ofertas</Link>
            </div>

            {/* Búsqueda */}
            <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-sm text-xs sm:text-sm">
              <div className="relative w-full">
                <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500"/>
                <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} className="w-full pl-8 p-2 bg-orange-50 rounded-full ring ring-app-orange/15 focus:ring-app-orange/30"/>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Cart */}
              <button className="relative p-2 rounded-xl" onClick={()=>setIsCartOpen(true)}>
                <ShoppingCartIcon className="size-5 text-zinc-900"/>
                {cartCount > 0 && <span className="absolute -top-1 -right-1 size-4 bg-app-orange text-white text-[10px] rounded-full flex items-center justify-center">{cartCount}</span>}
              </button>
              
              {/* User Menu Trigger */}
              <div className="relative">
                {user ? (
                  <button onClick={()=> setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 p-2">
                    <div className="size-7 rounded-full bg-green-950 text-white flex items-center justify-center">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <ChevronDownIcon className="size-3 text-zinc-500"/>
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Link to="/login" className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-950 rounded-full hover:bg-green-900 transition-colors">
                      <UserIcon size={16}/> Iniciar Sesión
                    </Link>
                    {userMenuOpen ? <XIcon className="md:hidden cursor-pointer size-6" onClick={() => setUserMenuOpen(!userMenuOpen)}/> : <MenuIcon className="md:hidden cursor-pointer size-6" onClick={() => setUserMenuOpen(!userMenuOpen)}/>}
                  </div>
                )}

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={()=>setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-lg border border-app-border py-2 z-50 animate-fade-in">
                      {user && (
                        <div className="px-4 py-2 border-b border-app-border">
                          <p className="text-sm font-medium text-zinc-900">{user?.name}</p>
                          <p className="text-xs text-zinc-500">{user?.email}</p>
                        </div>
                      )}
                      
                      <div onClick={()=> setUserMenuOpen(false)}>
                        {!user && <Link to='/login' className="dropdown-link flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"><UserIcon size={16}/>Iniciar Sesión</Link>}
                        {user && <Link to='/ordenes' className="dropdown-link flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"><PackageIcon size={16}/>Mis Órdenes</Link>}
                        {user && <Link to='/addresses' className="dropdown-link flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"><MapPinIcon size={16}/>Direcciones</Link>}
                        
                        {/* Enlaces repetidos en móvil */}
                        <div className="md:hidden border-t border-app-border my-1 pt-1">
                          <Link to='/' className="dropdown-link flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50">Inicio</Link>
                          <Link to='/products' className="dropdown-link flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50">Productos</Link>
                          <Link to='/deals' className="dropdown-link flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50">Ofertas</Link>
                        </div>

                        {/* SECCIÓN DE ADMINISTRADOR CORREGIDA (Usa isAdmin como booleano) */}
                        {user?.isAdmin && (
                          <div className="border-t border-app-border my-1 pt-1">
                            <Link to='/admin/products' className="dropdown-link flex items-center gap-2 px-4 py-2 text-sm text-app-orange-dark hover:bg-orange-50">
                              <ShieldIcon size={16}/> Products (Admin)
                            </Link>
                            <Link to='/admin/orders' className="dropdown-link flex items-center gap-2 px-4 py-2 text-sm text-app-orange-dark hover:bg-orange-50">
                              <PackageIcon size={16}/> Orders (Admin)
                            </Link>
                            <Link to='/administrador/productos' className="dropdown-link flex items-center gap-2 px-4 py-2 text-sm font-semibold text-app-orange-dark hover:bg-orange-50">
                              <ShieldIcon size={16}/> Panel Administrador
                            </Link>
                          </div>
                        )}

                        {user && (
                          <div className="border-t border-app-border pt-1">
                            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full transition-colors">
                              <LogOutIcon size={16} /> Cerrar Sesión
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;