"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SideMenu from "@/components/SideMenu";

const ESTADOS = [
  "ACTIVO",
  "INACTIVO",
  "BLOQUEADO",
  "RETIRADO",
  "SUSPENDIDO",
] as const;

type Estado = (typeof ESTADOS)[number];

type Arbitro = {
  id: string;
  nombre: string;
  dni: string | null;
  estado: Estado | null;
  motivo_estado: string | null;
  suspension_inicio: string | null;
  suspension_fin: string | null;
};

export default function AdminArbitrosPage() {
  const [data, setData] = useState<Arbitro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Arbitro | null>(null);
  const [estado, setEstado] = useState<Estado>("ACTIVO");
  const [motivo, setMotivo] = useState("");
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
        return;
      }
      fetchArbitros();
    };

    checkSession();
  }, [router]);

  const fetchArbitros = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("arbitros")
      .select("id, nombre, dni, estado, motivo_estado, suspension_inicio, suspension_fin")
      .order("created_at", { ascending: false });

    if (error) {
      setError("Error al cargar árbitros");
    } else {
      setData((data as Arbitro[]) || []);
    }

    setLoading(false);
  };

  const openModal = (arbitro: Arbitro) => {
    setSelected(arbitro);
    setEstado((arbitro.estado || "ACTIVO") as Estado);
    setMotivo(arbitro.motivo_estado || "");
    setInicio(arbitro.suspension_inicio ? arbitro.suspension_inicio.slice(0, 10) : "");
    setFin(arbitro.suspension_fin ? arbitro.suspension_fin.slice(0, 10) : "");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelected(null);
  };

  const saveEstado = async () => {
    if (!selected) return;

    setSaving(true);

    const payload: any = {
      estado,
      motivo_estado: motivo || null,
      suspension_inicio: inicio || null,
      suspension_fin: fin || null,
    };

    const { error } = await supabase.from("arbitros").update(payload).eq("id", selected.id);

    if (error) {
      setError("Error al guardar estado");
    } else {
      await fetchArbitros();
      closeModal();
    }

    setSaving(false);
  };

  const rows = useMemo(() => data, [data]);

  return (
    <main className="min-h-screen bg-[var(--panel)]">
      <div className="mx-auto flex max-w-6xl gap-6 p-6">
        <SideMenu />
        <section className="max-w-5xl mx-auto">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--ref-gray)]">
              Panel Admin
            </p>
            <h1 className="text-2xl font-bold tracking-wide">Administración de árbitros</h1>
          </div>

        </header>

        <div className="bg-white rounded-2xl shadow-lg border border-[var(--line)] overflow-hidden">
          <div className="grid grid-cols-4 gap-4 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ref-gray)] bg-gray-50">
            <span>Nombre</span>
            <span>DNI</span>
            <span>Estado</span>
            <span>Acción</span>
          </div>

          {loading ? (
            <p className="p-6 text-sm text-[var(--ref-gray)]">Cargando...</p>
          ) : error ? (
            <p className="p-6 text-sm text-red-600">{error}</p>
          ) : rows.length == 0 ? (
            <p className="p-6 text-sm text-[var(--ref-gray)]">No hay árbitros</p>
          ) : (
            <ul>
              {rows.map((arbitro) => (
                <li
                  key={arbitro.id}
                  className="grid grid-cols-4 gap-4 items-center px-4 py-3 border-t border-[var(--line)]"
                >
                  <span className="font-semibold">{arbitro.nombre}</span>
                  <span className="text-sm text-[var(--ref-gray)]">{arbitro.dni || "-"}</span>
                  <span className="text-sm font-semibold">{arbitro.estado || "ACTIVO"}</span>
                  <button
                    onClick={() => openModal(arbitro)}
                    className="inline-flex items-center justify-center rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-700"
                  >
                    Cambiar estado
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        </section>
      </div>

      {modalOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">Cambiar estado</h2>
            <p className="text-sm text-[var(--ref-gray)] mt-1">{selected.nombre}</p>

            <div className="mt-4 space-y-2">
              {ESTADOS.map((item) => (
                <label key={item} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="estado"
                    value={item}
                    checked={estado === item}
                    onChange={() => setEstado(item)}
                  />
                  {item}
                </label>
              ))}
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold text-[var(--ref-gray)]">Motivo</label>
              <input
                type="text"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className="mt-1 w-full border border-[var(--line)] rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Motivo del cambio"
              />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-[var(--ref-gray)]">Suspensión desde</label>
                <input
                  type="date"
                  value={inicio}
                  onChange={(e) => setInicio(e.target.value)}
                  className="mt-1 w-full border border-[var(--line)] rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[var(--ref-gray)]">Suspensión hasta</label>
                <input
                  type="date"
                  value={fin}
                  onChange={(e) => setFin(e.target.value)}
                  className="mt-1 w-full border border-[var(--line)] rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={closeModal}
                className="flex-1 rounded-xl border border-[var(--line)] py-2 text-sm font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={saveEstado}
                disabled={saving}
                className="flex-1 rounded-xl bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {saving ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
