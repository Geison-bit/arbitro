import Image from "next/image";
import Link from "next/link";

export default function ArbitrosLanding() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#B91C1C_0%,_#3B0D0D_35%,_#0A0A0A_100%)] text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 h-40 w-40 rounded-full bg-red-500/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-60 w-60 rounded-full bg-red-400/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-10">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <span className="text-xl">⚽</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Federación</p>
              <p className="text-lg font-semibold">Sistema de Árbitros</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-6 text-sm font-semibold text-white/70">
            <Link className="hover:text-white" href="/login">Iniciar sesión</Link>
          </nav>
        </header>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/40 shadow-2xl">
            <Image
              src="/WhatsApp-Image-2026-02-08-at-16.26.35.jpg"
              alt="Árbitros en el campo"
              width={900}
              height={700}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">Verificación oficial</p>
              <h2 className="mt-2 text-3xl font-bold tracking-wide">Fútbol con autoridad</h2>
              <p className="mt-2 text-white/80">
                Credenciales digitales con QR para validar árbitros en segundos.
              </p>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/10 p-8 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Plataforma oficial</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight">
              Registro y control de árbitros
            </h1>
            <p className="mt-4 text-white/80">
              Gestiona altas, categorías y estado de cada árbitro. Comparte la
              credencial con QR para verificar su autenticidad en cancha.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-red-700"
              >
                Iniciar sesión
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Control</p>
                <p className="mt-2 text-lg font-semibold">Estado en tiempo real</p>
                <p className="mt-1 text-sm text-white/70">
                  Activo o inactivo con un vistazo.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Seguridad</p>
                <p className="mt-2 text-lg font-semibold">QR verificable</p>
                <p className="mt-1 text-sm text-white/70">
                  Acceso directo a la credencial oficial.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
