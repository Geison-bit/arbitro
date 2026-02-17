import SideMenu from "@/components/SideMenu";
export default function AdminMenu() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] text-[#111]">
      <div className="mx-auto flex max-w-6xl gap-6 p-6">
        <SideMenu />
        <section className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[#6b7280]">Panel admin</p>
        <h1 className="text-3xl font-bold mt-2">Panel de administraci\u00f3n</h1>
        <p className="text-sm text-[#6b7280] mt-2">
          Gestiona estados, edici\u00f3n y verificaci\u00f3n de \u00e1rbitros.
        </p>

        <div className="mt-8 grid gap-4">
          <a
            href="/admin/arbitros"
            className="block rounded-2xl border border-black/10 bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="font-semibold">Lista de \u00e1rbitros</div>
            <div className="text-sm text-[#6b7280]">Ver todos los registros</div>
          </a>
          <a
            href="/admin/arbitros"
            className="block rounded-2xl border border-black/10 bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="font-semibold">Editar \u00e1rbitro</div>
            <div className="text-sm text-[#6b7280]">Actualizar datos y foto</div>
          </a>
          <a
            href="/admin/arbitros"
            className="block rounded-2xl border border-black/10 bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="font-semibold">Cambiar estado</div>
            <div className="text-sm text-[#6b7280]">Activar, bloquear o suspender</div>
          </a>
        </div>
        </section>
      </div>
    </main>
  );
}
