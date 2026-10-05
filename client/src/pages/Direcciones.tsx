import { useEffect, useState } from "react";
import type { Address } from "../types";
import { MapPinIcon, PlusIcon } from "lucide-react";
import Loading from "../components/Loading";
import AddressCard from "../components/AddressCard";
import AddressForm from "../components/AddressForm";
import api from "../config/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast/headless";

const Direcciones = () => {
  const { updateUser } = useAuth() as any;

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ label: "", address: "", city: "", state: "", zip: "", isDefault: false });

  const resetForm = () => {
    setForm({ label: "", address: "", city: "", state: "", zip: "", isDefault: false });
    setShowForm(false);
    setEditingId(null);
  };

  // Geolocalización opcional para evitar que bloquee el guardado si el navegador la deniega
  const getLocation = (retries = 3): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        resolve({ lat: 0, lng: 0 });
        return;
      }
      const attempt = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error: any) => {
            if (retries > 0) {
              retries--;
              setTimeout(attempt, 1000); // Reintenta después de 1 segundo
            } else {
              reject(new Error(error.message || "No se pudieron obtener las coordenadas"));
            }
          },
          {
            enableHighAccuracy: false,
            timeout: 15000,
            maximumAge: 60000,
          }
        );
      };
      attempt();
    }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const coords = await getLocation();
      const payload = { ...form, ...coords };

      if (editingId) {
        const { data } = await api.put(`/addresses/${editingId}`, payload);
        const newAddresses = data.addresses || [];
        setAddresses(newAddresses);
        updateUser({ addresses: newAddresses });
        toast.success("Dirección actualizada correctamente");
      } else {
        const { data } = await api.post('/addresses', payload);
        const newAddresses = data.addresses || [];
        setAddresses(newAddresses);
        updateUser({ addresses: newAddresses });
        toast.success("Dirección agregada correctamente");
      }
      resetForm();
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Error");
    }
  }

  const onEditHandler = (add: Address) => {
    setForm({
      label: add.label,
      address: add.address,
      city: add.city,
      state: add.state,
      zip: add.zip,
      isDefault: add.isDefault
    });
    setEditingId(add.id);
    setShowForm(true);
  };

  useEffect(() => {
    api.get('/addresses').then(({ data }) => {
      // Protegemos por si data.addresses viene indefinido
      setAddresses(data.addresses || []);
    }).catch((error: any) => {
      toast.error(error.response?.data?.message || error?.message);
      setAddresses([]); // Evita que quede undefined ante un error 500
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-app-green">Mi Dirección</h1>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="px-4 py-2 bg-app-green text-white text-sm font-semibold rounded-xl hover:bg-app-green-light transition-colors flex items-center gap-2 cursor-pointer"
          >
            <PlusIcon className="size-4" /> Agregar Dirección
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <AddressForm
            resetForm={resetForm}
            handleSubmit={handleSubmit}
            form={form}
            setForm={setForm}
            editingId={editingId}
          />
        )}

        {/* Addresses List */}
        {loading ? (
          <Loading />
        ) : !addresses || addresses.length === 0 ? (
          <div className="text-center py-16">
            <MapPinIcon className="size-16 text-app-border mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-app-green mb-2">No hay direcciones guardadas</h2>
            <p className="text-sm text-app-text-light">Añade una dirección para agilizar el proceso de pago</p>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div key={addr.id || addr.label}>
                <AddressCard addr={addr} onEditHandler={onEditHandler} setAddresses={setAddresses} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Direcciones;