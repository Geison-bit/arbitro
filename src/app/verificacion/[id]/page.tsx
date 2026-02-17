import { supabase } from "@/lib/supabase";
import SideMenu from "@/components/SideMenu";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{ id: string }>;
}

const formatDate = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const calcularEdad = (value?: string) => {
  if (!value) return "-";
  const birth = new Date(value);
  if (Number.isNaN(birth.getTime())) return "-";
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return `${age} años`;
};

const estados = {
  ACTIVO: {
    title: "🟢 ÁRBITRO ACTIVO",
    color: "border-green-500 bg-green-50 text-green-700",
    message: null as string | null,
  },
  INACTIVO: {
    title: "🟡 ÁRBITRO INACTIVO",
    color: "border-yellow-500 bg-yellow-50 text-yellow-700",
    message: "Árbitro inactivo temporalmente",
  },
  BLOQUEADO: {
    title: "🔴 ÁRBITRO BLOQUEADO",
    color: "border-red-500 bg-red-50 text-red-700",
    message: "Árbitro no autorizado",
  },
  RETIRADO: {
    title: "⚫ ÁRBITRO RETIRADO",
    color: "border-gray-500 bg-gray-50 text-gray-700",
    message: "Ya no pertenece a la organización",
  },
  SUSPENDIDO: {
    title: "🟠 ÁRBITRO SUSPENDIDO",
    color: "border-orange-500 bg-orange-50 text-orange-700",
    message: "Suspendido",
  },
};

export default async function VerificacionPage({ params }: Props) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("arbitros")
    .select("id, nombre, dni, categoria, estado, motivo_estado, suspension_inicio, suspension_fin, fecha_nacimiento")
    .eq("id", id)
    .single();

  if (error || !data) {
    return <p className="p-6">Árbitro no encontrado</p>;
  }

  const estado = (data.estado || "ACTIVO") as keyof typeof estados;
  const now = new Date();
  const suspensionActiva =
    estado === "SUSPENDIDO" &&
    data.suspension_inicio &&
    data.suspension_fin &&
    now >= new Date(data.suspension_inicio) &&
    now <= new Date(data.suspension_fin);

  const card = estados[estado];
  const mostrarVerdePorFin = estado === "SUSPENDIDO" && !suspensionActiva;

  const title = mostrarVerdePorFin ? estados.ACTIVO.title : card.title;
  const color = mostrarVerdePorFin ? estados.ACTIVO.color : card.color;

  let message = card.message;
  if (estado === "SUSPENDIDO" && suspensionActiva) {
    message = `Suspendido hasta ${formatDate(data.suspension_fin)}`;
  }
  if (data.motivo_estado) {
    message = data.motivo_estado;
  }

  return (
    <main className="min-h-screen bg-[var(--panel)]">
      <div className="mx-auto flex max-w-6xl gap-6 p-6">
        <SideMenu />
        <section className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[var(--line)] overflow-hidden">
        <div className={`border-l-8 ${color} px-6 py-6`}>
          <h1 className="text-lg font-bold">{title}</h1>
          {message && <p className="mt-2 text-sm">{message}</p>}
        </div>

        <div className="px-6 py-6">
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">Nombre:</span> {data.nombre}
            </p>
            <p>
              <span className="font-semibold">DNI:</span> {data.dni || "-"}
            </p>
            <p>
              <span className="font-semibold">Categoría:</span> {data.categoria}
            </p>
            <p>
              <span className="font-semibold">Edad:</span> {calcularEdad(data.fecha_nacimiento)}
            </p>
            <p>
              <span className="font-semibold">Estado:</span> {estado}
            </p>
          </div>
        </div>
        </section>
      </div>
    </main>
  );
}
