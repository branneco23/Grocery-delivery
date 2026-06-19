
import { appPromoBannerData } from "../../../public/assets";
import deliveryTruckImg from "../../../src/assets/delivery_truck.svg";

const AppPromoBanner = () => {
  return (
    <section className="group max-w-7xl mx-auto px-6 sm:px-12 py-16 my-14 bg-green-950 rounded-3xl overflow-hidden relative">
      {/* Contenedor Grid/Flex principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 relative z-10">
        
        {/* LADO IZQUIERDO: Textos y Botones */}
        <div className="text-center md:text-left order-2 md:order-1 flex flex-col justify-center">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight">
            {appPromoBannerData.title}
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-8 max-w-md balance">
            {appPromoBannerData.description}
          </p>
          
          {/* Botones Interactivos */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button className="px-7 py-3.5 bg-white text-green-950 font-semibold rounded-xl hover:bg-orange-50 hover:scale-105 active:scale-98 transition-all duration-300 shadow-md hover:shadow-xl">
              App Store
            </button>
            <button className="px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 hover:scale-105 active:scale-98 transition-all duration-300 border border-white/25 backdrop-blur-sm">
              Google Play
            </button>
          </div>
        </div>

        {/* LADO DERECHO: Imagen con interactividad Premium */}
        <div className="order-1 md:order-2 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md lg:max-w-xl transition-all duration-500 ease-out transform group-hover:scale-105 group-hover:-translate-y-2">
            {/* Sombra difuminada detrás del camión que reacciona al cursor */}
            <div className="absolute inset-0 bg-emerald-900/30 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <img
              src={deliveryTruckImg}
              alt="Camión de Domicilios"
              className="w-full h-auto object-contain relative z-10 filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.2)] animate-pulse-slow"
              style={{ animationDuration: '4s' }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AppPromoBanner;