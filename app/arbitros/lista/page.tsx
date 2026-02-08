import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ArbitrosPage() {
  const { data, error } = await supabase
    .from("arbitros")
    .select("id, nombre, categoria, estado");

  if (error) {
    return <p className="p-6">Error al cargar ?rbitros</p>;
  }

  if (!data || data.length == 0) {
    return <p className="p-6">No hay ?rbitros registrados</p>;
  }

  return (
    <main className="min-h-screen bg-[var(--panel)] flex items-center justify-center p-6">
      <section className="w-full max-w-2xl">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--ref-gray)]">
              Plantilla oficial
            </p>
            <h1 className="text-2xl font-bold tracking-wide">?rbitros registrados</h1>
          </div>
          <Link
            href="/arbitros"
            className="inline-flex items-center justify-center rounded-xl border border-[var(--line)] px-4 py-2 text-sm font-semibold text-[var(--ink)] hover:bg-white"
          >
            Volver al landing
          </Link>
        </header>

        <ul className="space-y-4">
          {data.map((arbitro) => (
            <li
              key={arbitro.id}
              className="bg-white rounded-2xl shadow-lg border border-[var(--line)] border-l-4 border-l-[var(--field-green)] p-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-[var(--field-green)]/10 text-[var(--field-green)] flex items-center justify-center">
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
                  <p className="font-bold text-lg">{arbitro.nombre}</p>
                  <p className="text-sm text-[var(--ref-gray)]">{arbitro.categoria}</p>
                </div>
              </div>

              <Link
                className="inline-flex items-center justify-center rounded-xl bg-[var(--field-green)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-95"
                href={`/v/${arbitro.id}`}
              >
                Ver credencial
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
