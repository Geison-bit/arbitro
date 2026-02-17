import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface Props {
  params: { id: string } | Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Props) {
  const realParams = await params;
  const { id } = realParams as { id: string };

  const { data, error } = await supabase
    .from("arbitros")
    .select("id, nombre, estado, motivo_estado")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  return NextResponse.json({
    id: data.id,
    nombre: data.nombre,
    estado: data.estado,
    motivo: data.motivo_estado,
  });
}
