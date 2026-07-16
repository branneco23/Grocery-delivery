import { 
  ClockIcon, 
  CheckIcon, 
  UserCheckIcon, 
  PackageIcon, 
  TruckIcon, 
  CheckCircle2Icon 
} from "lucide-react";

export default function OrderTimeLine({ order }: { order: any }) {
  // 1. Array oficial de estados en la BD de GreatStack (en inglés para coincidir con order.status)
  const allStatuses = ["Placed", "Confirmed", "Assigned", "Packed", "Out for Delivery", "Delivered"];
  const currentIdx = allStatuses.indexOf(order.status);

  // 2. Mapeo exacto de los iconos correspondientes a cada estado
  const statusIcons: Record<string, React.ComponentType<any>> = {
    Placed: ClockIcon,
    Confirmed: CheckIcon,
    Assigned: UserCheckIcon, // Icono de domiciliario asignado
    Packed: PackageIcon,
    "Out for Delivery": TruckIcon,
    Delivered: CheckCircle2Icon, // Icono de entregado finalizado
  };

  // 3. Traducción visual para el usuario final en la interfaz
  const statusLabels: Record<string, string> = {
    Placed: "Placed",
    Confirmed: "Confirmed",
    Assigned: "Assigned",
    Packed: "Packed",
    "Out for Delivery": "Out for Delivery",
    Delivered: "Delivered",
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <h2 className="text-lg font-semibold text-app-green mb-6">Delivery Progress</h2>
      <div className="space-y-0">
        {allStatuses.map((status, i) => {
          // Buscamos el icono usando la llave exacta en inglés
          const Icon = statusIcons[status] || PackageIcon;
          const isCompleted = i <= currentIdx;
          const isCurrent = i === currentIdx;

          // Buscamos si existe registro en el historial para pintar la hora exacta
          const historyEntry = order.statusHistory?.find((h: any) => h.status === status);

          return (
            <div key={status} className="flex gap-4">
              {/* Columna de la línea de tiempo */}
              <div className="flex flex-col items-center">
                {/* Círculo con el Icono */}
                <div 
                  className={`size-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isCompleted 
                      ? "bg-app-green text-white" 
                      : "bg-gray-100 text-zinc-400"
                  } ${isCurrent ? "ring-4 ring-app-green/20" : ""}`}
                >
                  <Icon className="size-4" />
                </div>
                {/* Línea conectora vertical */}
                {i < allStatuses.length - 1 && (
                  <div 
                    className={`w-0.5 h-12 transition-all duration-300 ${
                      i < currentIdx ? "bg-app-green" : "bg-gray-100"
                    }`} 
                  />
                )}
              </div>

              {/* Columna de Información */}
              <div className="pb-6">
                <p 
                  className={`text-sm font-semibold transition-colors duration-300 ${
                    isCompleted ? "text-app-green" : "text-zinc-400"
                  }`}
                >
                  {statusLabels[status]}
                </p>
                {historyEntry && (
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {new Date(historyEntry.timestamp).toLocaleString("en-US", { 
                      month: "short", 
                      day: "numeric", 
                      hour: "2-digit", 
                      minute: "2-digit" 
                    })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}