import ArbitroQR from "@/components/ArbitroQR";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PerfilArbitro({ params }: Props) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("arbitros")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return <p className="p-6">?rbitro no encontrado</p>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--field-green)]/15 via-white to-white flex items-center justify-center p-6">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[var(--line)] overflow-hidden">
        <div className="bg-[var(--field-green)] text-white px-6 py-4 flex items-center gap-3">
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
            <p className="text-xs uppercase tracking-[0.25em]">Federaci?n / Liga</p>
            <p className="text-lg font-semibold">Credencial oficial</p>
          </div>
        </div>

        <div className="px-6 py-6 text-center">
          <h1 className="text-2xl font-bold tracking-wide">{data.nombre}</h1>
          <p className="text-[var(--ref-gray)] mt-1">{data.categoria}</p>

          <span
            className={`mt-4 inline-flex items-center justify-center rounded-full px-4 py-1 text-sm font-semibold text-white ${
              data.estado ? "bg-[var(--active-green)]" : "bg-[var(--inactive-red)]"
            }`}
          >
            {data.estado ? "Activo" : "Inactivo"}
          </span>
        </div>

        <div className="border-t border-[var(--line)] px-6 py-6 flex flex-col items-center">
          <ArbitroQR id={id} />
        </div>
      </section>
    </main>
  );
}
