import { useState } from 'react';
// 1. Importación directa de la imagen sin llaves {} para Vite
import heroSectionData from '../assets/hero_bg.jpeg';
import { Link } from 'react-router-dom';
import { BikeIcon, Loader2Icon, LockIcon, MailIcon, UserIcon } from 'lucide-react';

// SE ELIMINÓ LA CONSTANTE REPETIDA QUE CAUSABA EL ERROR

const Login = () => {
  const [isLoginState, setIsLoginState] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);
    setTimeout(() => window.location.href = "/", 1000)
  }

  return (
    <div className='min-h-screen flex'>
      {/* Left Side (50% de la pantalla en pantallas grandes) */}
      <div className="hidden lg:flex lg:w-1/2 bg-app-green relative items-center justify-center">
        <img src={heroSectionData} alt="" className="absolute inset-0 object-cover w-full h-full bg-center opacity-10" />
        <div className="relative text-center px-12">
          <h2 className="text-4xl font-semibold text-white mb-4">Bienvenidos de nuevo a carrito de compras</h2>
          <p className="text-white/50 font-serif text-xl max-w-sm mx-auto">Alimentos frescos y productos orgánicos, entregados directamente a su domicilio.</p>
        </div>
      </div>

      {/* Right Side UNIFICADO (Ocupa el otro 50% y centra todo el contenido) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12 bg-app-cream">
        <div className="w-full max-w-md">

          {/* Form header message */}
          <div className="text-center mb-8">
            <Link to="/" className='inline-flex items-center gap-2 mb-6'>
              <BikeIcon className="size-8 text-app-green" />
              <span className="text-2xl font-semibold text-app-green">InstaCart</span>
            </Link>
            <h1 className="text-2xl font-semibold text-app-green mb-2">
              {isLoginState ? "Inicia sesión en tu cuenta" : "Crea una nueva cuenta"}
            </h1>
            <p className="text-sm text-app-text-light">
              {isLoginState ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
              <button onClick={() => setIsLoginState(!isLoginState)} className="text-orange-500 ml-1 font-semibold hover:text-orange-600 transition-colors">
                {isLoginState ? "Crear Una" : "Iniciar Sesión"}
              </button>
            </p>
          </div>
          {/*Login / Register Form*/}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLoginState && (
              <label className="text-sm flex flex-col gap-1">
                Nombre
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Tu nombre"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                  />
                </div>
              </label>
            )}
            <label className="text-sm flex flex-col gap-1">
              Correo electrónico
              <div className="relative">
                <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                />
              </div>
            </label>
            <label className="text-sm flex flex-col gap-1">
              Contraseña
              <div className="relative">
                <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="********"
                  className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                />
              </div>
            </label>
            <button type="submit" disabled={loading} className="flex-center w-full py-3 bg-green-950 text-white font-semibold rounded-xl hover:bg-green-900 transition-colors disabled:opacity-50">
              {loading ? <Loader2Icon className="animate-spin"/> : isLoginState ? "Iniciar Sesión" : "Registrarse"}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Login;