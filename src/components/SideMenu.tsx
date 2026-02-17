"use client";

import { useState } from "react";
import Link from "next/link";

const items = [
  { href: "/arbitros", label: "Landing" },
  { href: "/registro", label: "Registro oficial" },
  { href: "/arbitros/lista", label: "Ver \u00e1rbitros" },
  { href: "/admin", label: "Panel admin" },
];

export default function SideMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden flex items-center justify-end">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center rounded-xl border border-[var(--line)] bg-white px-3 py-2 text-sm font-semibold text-[var(--ink)] shadow-sm"
          aria-label="Abrir menú"
        >
          <span className="text-lg">☰</span>
        </button>
      </div>

      <aside className="hidden lg:block w-56 shrink-0">
        <div className="lg:sticky lg:top-6 rounded-2xl border border-[var(--line)] bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ref-gray)]">Menu</p>
          <nav className="mt-4 flex flex-col gap-2 text-sm font-semibold text-[var(--ink)]">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 hover:bg-red-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl p-5 animate-[slideIn_0.2s_ease-out]">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--ref-gray)]">Menu</p>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-[var(--line)] px-2 py-1 text-sm"
              >
                Cerrar
              </button>
            </div>
            <nav className="mt-6 flex flex-col gap-2 text-sm font-semibold text-[var(--ink)]">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-2 hover:bg-red-50"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
