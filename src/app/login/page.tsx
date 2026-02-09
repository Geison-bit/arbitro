"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace("/registro");
      }
    };

    checkSession();
  }, [router]);

  const entrar = async () => {
    const emailLimpio = email.trim();

    if (!emailLimpio || !password) {
      setMensaje("Completa correo y contraseña");
      return;
    }

    setLoading(true);
    setMensaje("");

    const { error } = await supabase.auth.signInWithPassword({
      email: emailLimpio,
      password,
    });

    if (error) {
      setMensaje("Credenciales incorrectas");
    } else {
      router.push("/registro");
    }

    setLoading(false);
  };

  const disabled = loading || !email.trim() || !password;

  return (
    <main className="min-h-screen bg-[var(--panel)] flex items-center justify-center p-6">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[var(--line)] p-6">
        <header className="text-center mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ref-gray)]">
            Acceso administrativo
          </p>
          <h1 className="text-2xl font-bold tracking-wide">Iniciar sesión</h1>
        </header>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-[var(--ref-gray)]">Correo</label>
            <input
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-[var(--line)] rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[var(--ref-gray)]">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-[var(--line)] rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>

        <button
          className="mt-6 w-full bg-red-600 text-white py-2.5 rounded-2xl font-semibold tracking-wide shadow-sm hover:bg-red-700 disabled:opacity-60"
          type="button"
          onClick={entrar}
          disabled={disabled}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {mensaje && (
          <p className="mt-4 text-center text-sm font-semibold text-[var(--ink)]">
            {mensaje}
          </p>
        )}

        <div className="mt-4 text-center text-sm text-[var(--ref-gray)]">
          <Link className="text-red-600 font-semibold" href="/">
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
