import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { dummyAddressData } from "../assets/assets";
import type { Address } from "../types";
import { ArrowLeft, CheckIcon, ChevronRight, CreditCardIcon, MapPinIcon } from "lucide-react";
import CheckoutAddress from "../components/Checkout/CheckoutAddress";
import CheckoutPayment from "../components/Checkout/CheckoutPayment";
import CheckoutReview from "../components/Checkout/CheckoutReview";

const Checkout = () => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || '$';

  const { items, cartTotal } = useCart();
  const { user } = { user: { addresses: dummyAddressData } };

  const [step, setStep] = useState("address");
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState<Address>({
    _id: "",
    label: "Inicio",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
    lat: 0,
    lng: 0,
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const deliveryFee = cartTotal > 20 ? 0 : 1.99;
  const tax = cartTotal * 0.19;
  const total = cartTotal + deliveryFee + tax;

  const steps = [
    { key: "address", label: "Dirección", icon: MapPinIcon },
    { key: "payment", label: "Método de Pago", icon: CreditCardIcon },
    { key: "review", label: "Revisar", icon: CheckIcon },
  ];

  const handlePlaceOrder = async () => {
    setLoading(true);
    navigate("/orders");
  };

  // Populate address from user's default address
  useState(() => {
    if (user?.addresses?.length) {
      const defaultAddr = user.addresses.find((a) => a.isDefault) || user.addresses[0];
      setAddress({
        _id: defaultAddr?._id,
        label: defaultAddr?.label,
        address: defaultAddr?.address,
        city: defaultAddr?.city,
        state: defaultAddr?.state,
        zip: defaultAddr?.zip,
        isDefault: defaultAddr?.isDefault,
        lat: defaultAddr?.lat,
        lng: defaultAddr?.lng,
      });
    }
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-app-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-app-green mb-2">Tu carro está vacío</h2>
          <p className="text-sm text-app-text-light mb-4">Añade algunos productos al carrito para finalizar la compra.</p>
          <button onClick={() => navigate('/products')} className="px-5 py-2.5 bg-app-green text-white text-sm font-medium rounded-xl hover:bg-app-green-light transition-colors">
            Buscar Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-app-text-light hover:text-app-green mb-6 transition-colors">
          <ArrowLeft className="size-4" /> Atrás
        </button>

        <h1 className="text-2xl font-bold text-slate-800 mb-8">Carrito de Compras</h1>

        {/* Steps */}
        <div className="flex items-center gap-3 mb-8">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-3">
              <button
                onClick={() => setStep(s.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${step === s.key
                    ? "bg-[#1E3A27] text-white"
                    : "bg-white text-app-text-light border border-slate-100"
                  }`}
              >
                <s.icon className="size-4" /> {s.label}
              </button>
              {i < steps.length - 1 && <ChevronRight className="size-4 text-slate-400" />}
            </div>
          ))}
        </div>

        {/* Grid Layout Corregido (md:grid-cols-3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Main Form Content */}
          <div className="md:col-span-2">
            {step === "address" && <CheckoutAddress address={address} setAddress={setAddress} setStep={setStep} user={user} />}
            {step === "payment" && <CheckoutPayment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} setStep={setStep} />}
            {step === "review" && <CheckoutReview address={address} items={items} handlePlaceOrder={handlePlaceOrder} loading={loading} total={total} />}
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
            <h3 className="text-base font-semibold text-slate-800 mb-4">Resumen de la Orden</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                <span className="font-medium text-slate-800">{currency}{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Domicilio</span>
                <span className="font-medium text-slate-800">
                  {deliveryFee === 0 ? "Gratis" : `${currency}${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              {/* Detalle visual de que se está cobrando el 19% */}
              <div className="flex justify-between">
                <span>Impuesto (19%)</span>
                <span className="font-medium text-slate-800">{currency}{tax.toFixed(2)}</span>
              </div>

              <hr className="border-slate-100 my-2" />
              <div className="flex justify-between text-base font-bold text-slate-800">
                <span>Total</span>
                <span>{currency}{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;