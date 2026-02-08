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
    <main className="max-w-md mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">{data.nombre}</h1>
      <p className="text-gray-600 mb-4">{data.categoria}</p>

      <span
        className={`inline-block px-4 py-1 rounded-full text-white ${
          data.estado ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {data.estado ? "Activo" : "Inactivo"}
      </span>

      <ArbitroQR id={id} />
    </main>
  );
}
