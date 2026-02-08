import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ArbitrosPage() {
  const { data, error } = await supabase
    .from("arbitros")
    .select("id, nombre, categoria, estado");

  if (error) {
    return <p className="p-6">Error al cargar árbitros</p>;
  }

  if (!data || data.length === 0) {
    return <p className="p-6">No hay árbitros registrados</p>;
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Árbitros registrados</h1>

      <ul className="space-y-3">
        {data.map((arbitro) => (
          <li
            key={arbitro.id}
            className="border rounded p-3 flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{arbitro.nombre}</p>
              <p className="text-sm text-gray-600">{arbitro.categoria}</p>
            </div>
            <Link className="text-blue-600" href={`/v/${arbitro.id}`}>
              Ver
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
