import Link from "next/link";

const items = [
  { href: "/arbitros", label: "Landing" },
  { href: "/arbitros/lista", label: "Ver \u00e1rbitros" },
  { href: "/admin", label: "Panel admin" },
];

export default function SideMenu() {
  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-6 rounded-2xl border border-[var(--line)] bg-white p-4 shadow-sm">
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
  );
}
