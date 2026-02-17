import ArbitroQR from "@/components/ArbitroQR";
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
  if (m < 0 || (m == 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return `${age} años`;
};

export default async function PerfilArbitro({ params }: Props) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("arbitros")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return <p className="p-6">Árbitro no encontrado</p>;
  }

  const estado = ((data.estado || "ACTIVO") as string).toUpperCase();
  const estadoBadge =
    {
      ACTIVO: { label: "Activo", className: "bg-green-600" },
      INACTIVO: { label: "Inactivo", className: "bg-yellow-500" },
      BLOQUEADO: { label: "Bloqueado", className: "bg-red-600" },
      RETIRADO: { label: "Retirado", className: "bg-gray-500" },
      SUSPENDIDO: { label: "Suspendido", className: "bg-orange-500" },
    }[estado] || { label: estado, className: "bg-gray-600" };

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-600/15 via-white to-white">
      <div className="mx-auto flex max-w-6xl gap-6 p-6">
        <SideMenu />
        <section className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[var(--line)] overflow-hidden">
        <div className="bg-red-700 text-white px-6 py-4 flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
            <svg
              aria-hidden
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3l7 4v6c0 5-3 9-7 11-4-2-7-6-7-11V7l7-4z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em]">Federación / Liga</p>
            <p className="text-lg font-semibold">Credencial oficial</p>
          </div>
        </div>

        <div className="px-6 py-6 text-center">
          {data.foto_url && (
            <img
              src={data.foto_url}
              alt={`Foto de ${data.nombre}`}
              className="mx-auto h-24 w-24 rounded-full object-cover border-2 border-red-600"
            />
          )}

          <h1 className="mt-4 text-2xl font-bold tracking-wide">{data.nombre}</h1>
          <p className="text-[var(--ref-gray)] mt-1">{data.categoria}</p>

          <span
            className={`mt-4 inline-flex items-center justify-center rounded-full px-4 py-1 text-sm font-semibold text-white ${estadoBadge.className}`}
          >
            {estadoBadge.label}
          </span>

          <div className="mt-6 grid gap-2 text-sm text-[var(--ink)]">
            <p>
              <span className="font-semibold">Edad:</span> {calcularEdad(data.fecha_nacimiento)}
            </p>
            <p>
              <span className="font-semibold">Fecha de nacimiento:</span> {formatDate(data.fecha_nacimiento)}
            </p>
            <p>
              <span className="font-semibold">Fecha de ingreso:</span> {formatDate(data.fecha_ingreso)}
            </p>
          </div>
        </div>

        <div className="border-t border-[var(--line)] px-6 py-6 flex flex-col items-center">
          <ArbitroQR id={id} />
        </div>
        </section>
      </div>
    </main>
  );
}
