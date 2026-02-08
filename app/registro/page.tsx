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
    const nombreLimpio = nombre.trim();
    const categoriaLimpia = categoria.trim();

    if (!nombreLimpio || !categoriaLimpia) {
      setMensaje("Completa nombre y categor?a");
      return;
    }

    setLoading(true);
    setMensaje("");

    const { data, error } = await supabase
      .from("arbitros")
      .insert([
        {
          nombre: nombreLimpio,
          categoria: categoriaLimpia,
        },
      ])
      .select()
      .single();

    if (error) {
      setMensaje("Error al registrar");
    } else {
      window.location.href = `/v/${data.id}`;
    }

    setLoading(false);
  };

  const disabled = loading || !nombre.trim() || !categoria.trim();

  return (
    <main className="min-h-screen bg-[var(--panel)] flex items-center justify-center p-6">
      <section className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-[var(--line)] p-6">
        <header className="text-center mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ref-gray)]">
            Panel administrativo
          </p>
          <h1 className="text-2xl font-bold tracking-wide">
            Registro oficial de ?rbitros
          </h1>
        </header>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-[var(--ref-gray)]">
              Nombre completo
            </label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ref-gray)]">
                <svg
                  aria-hidden
                  className="h-4 w-4"
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
              </span>
              <input
                type="text"
                placeholder="Nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border border-[var(--line)] rounded-xl py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-[var(--field-green)]"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[var(--ref-gray)]">
              Categor?a
            </label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ref-gray)]">
                <svg
                  aria-hidden
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10V7a2 2 0 0 0-2-2h-3l-8 8 5 5 8-8z" />
                  <path d="M7 7h.01" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="FIFA, Nacional, Amateur"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full border border-[var(--line)] rounded-xl py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-[var(--field-green)]"
              />
            </div>
          </div>
        </div>

        <button
          onClick={registrar}
          disabled={disabled}
          className="mt-6 w-full bg-[var(--field-green)] text-white py-2.5 rounded-2xl font-semibold tracking-wide shadow-sm hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Registrando..." : "Registrar ?rbitro"}
        </button>

        {mensaje && (
          <p className="mt-4 text-center text-sm font-semibold text-[var(--ink)]">
            {mensaje}
          </p>
        )}

        <Link
          href="/arbitros"
          className="mt-4 block w-full text-center border border-[var(--line)] rounded-2xl py-2.5 font-semibold text-[var(--ink)] hover:bg-gray-50"
        >
          Ver ?rbitros registrados
        </Link>
      </section>
    </main>
  );
}
