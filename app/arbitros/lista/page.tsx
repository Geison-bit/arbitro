import Link from "next/link";
import { supabase } from "@/lib/supabase";
import SideMenu from "@/components/SideMenu";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ArbitrosPage() {
  const { data, error } = await supabase
    .from("arbitros")
    .select("id, nombre, categoria, estado, foto_url");

  if (error) {
    return <p className="p-6">Error al cargar árbitros</p>;
  }

  if (!data || data.length === 0) {
    return <p className="p-6">No hay Árbitros registrados</p>;
  }

  return (
    <main className="min-h-screen bg-[var(--panel)]">
      <div className="mx-auto flex max-w-6xl gap-6 p-6">
        <SideMenu />
        <section className="w-full max-w-2xl">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--ref-gray)]">
              Plantilla oficial
            </p>
            <h1 className="text-2xl font-bold tracking-wide">Árbitros registrados</h1>
          </div>

        </header>

        <ul className="space-y-4">
          {data.map((arbitro) => (
            <li
              key={arbitro.id}
              className="bg-white rounded-2xl shadow-lg border border-[var(--line)] border-l-4 border-l-red-600 p-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden border border-red-200 bg-red-50 flex items-center justify-center">
                  {arbitro.foto_url ? (
                    <img
                      src={arbitro.foto_url}
                      alt={arbitro.nombre}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <svg
                      aria-hidden
                      className="h-6 w-6 text-red-700"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21a8 8 0 0 0-16 0" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-bold text-lg">{arbitro.nombre}</p>
                  <p className="text-sm text-[var(--ref-gray)]">{arbitro.categoria}</p>
                </div>
              </div>

              <Link
                className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700"
                href={`/v/${arbitro.id}`}
              >
                Ver credencial
              </Link>
            </li>
          ))}
        </ul>
        </section>
      </div>
    </main>
  );
}
