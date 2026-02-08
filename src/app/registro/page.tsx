"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function RegistroArbitro() {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const registrar = async () => {
    setLoading(true);
    setMensaje("");

    const { data, error } = await supabase
      .from("arbitros")
      .insert([
        {
          nombre,
          categoria,
        },
      ])
      .select()
      .single();

    if (error) {
      setMensaje("❌ Error al registrar");
    } else {
      // redirigir al perfil del árbitro
      window.location.href = `/v/${data.id}`;
    }

    setLoading(false);
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Registro de Árbitros</h1>

      <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />

      <input
        type="text"
        placeholder="Categoría (FIFA, Nacional, Amateur)"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />

      <button
        onClick={registrar}
        disabled={loading}
        className="w-full bg-black text-white p-2 rounded"
      >
        {loading ? "Registrando..." : "Registrar árbitro"}
      </button>

      {mensaje && (
        <p className="mt-4 text-center font-medium">{mensaje}</p>
      )}

      <Link
        href="/arbitros"
        className="mt-3 block w-full text-center border border-gray-300 p-2 rounded"
      >
        Ver árbitros registrados
      </Link>
    </main>
  );
}
