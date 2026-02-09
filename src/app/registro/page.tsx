"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegistroArbitro() {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
        return;
      }
      setChecking(false);
    };

    checkSession();
  }, [router]);

  const registrar = async () => {
    const nombreLimpio = nombre.trim();
    const categoriaLimpia = categoria.trim();

    if (!nombreLimpio || !categoriaLimpia || !fechaNacimiento || !fechaIngreso) {
      setMensaje("Completa todos los campos obligatorios");
      return;
    }

    setLoading(true);
    setMensaje("");

    let fotoUrl: string | null = null;

    if (fotoFile) {
      const ext = fotoFile.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("arbitros")
        .upload(fileName, fotoFile, { upsert: true });

      if (uploadError) {
        setMensaje("Error al subir la foto");
        setLoading(false);
        return;
      }

      const { data } = supabase.storage.from("arbitros").getPublicUrl(fileName);
      fotoUrl = data.publicUrl;
    }

    const { data, error } = await supabase
      .from("arbitros")
      .insert([
        {
          nombre: nombreLimpio,
          categoria: categoriaLimpia,
          fecha_nacimiento: fechaNacimiento,
          fecha_ingreso: fechaIngreso,
          foto_url: fotoUrl,
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

  const disabled =
    loading ||
    !nombre.trim() ||
    !categoria.trim() ||
    !fechaNacimiento ||
    !fechaIngreso;

  if (checking) {
    return (
      <main className="min-h-screen bg-[var(--panel)] flex items-center justify-center p-6">
        <p className="text-sm text-[var(--ref-gray)]">Cargando...</p>
      </main>
    );
  }

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
                className="w-full border border-[var(--line)] rounded-xl py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-red-600"
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
                className="w-full border border-[var(--line)] rounded-xl py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-[var(--ref-gray)]">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="mt-1 w-full border border-[var(--line)] rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--ref-gray)]">
                Fecha de ingreso
              </label>
              <input
                type="date"
                value={fechaIngreso}
                onChange={(e) => setFechaIngreso(e.target.value)}
                className="mt-1 w-full border border-[var(--line)] rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[var(--ref-gray)]">
              Foto de perfil
            </label>
            <div className="mt-2 flex items-center gap-3">
              <input
                id="foto-perfil"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setFotoFile(e.target.files?.[0] ?? null)}
              />
              <label
                htmlFor="foto-perfil"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--line)] px-4 py-2 text-sm font-semibold text-[var(--ink)] hover:bg-gray-50 cursor-pointer"
              >
                Subir foto
              </label>
              <span className="text-sm text-[var(--ref-gray)]">
                {fotoFile ? fotoFile.name : "Sin archivo"}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={registrar}
          disabled={disabled}
          className="mt-6 w-full bg-red-600 text-white py-2.5 rounded-2xl font-semibold tracking-wide shadow-sm hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Registrando..." : "Registrar ?rbitro"}
        </button>

        {mensaje && (
          <p className="mt-4 text-center text-sm font-semibold text-[var(--ink)]">
            {mensaje}
          </p>
        )}

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Link
            href="/"
            className="block w-full text-center border border-[var(--line)] rounded-2xl py-2.5 font-semibold text-[var(--ink)] hover:bg-gray-50"
          >
            Landing
          </Link>
          <Link
            href="/arbitros/lista"
            className="block w-full text-center border border-[var(--line)] rounded-2xl py-2.5 font-semibold text-[var(--ink)] hover:bg-gray-50"
          >
            Ver ?rbitros
          </Link>
        </div>
      </section>
    </main>
  );
}
