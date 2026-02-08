"use client";

import { QRCodeCanvas } from "qrcode.react";

interface Props {
  id: string;
}

export default function ArbitroQR({ id }: Props) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (typeof window !== "undefined" ? window.location.origin : "");

  const value = baseUrl ? `${baseUrl}/v/${id}` : `/v/${id}`;

  return (
    <div className="flex flex-col items-center">
      <div className="rounded-2xl border border-[var(--line)] bg-white p-4 shadow-sm">
        <QRCodeCanvas value={value} size={220} />
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.3em] text-[var(--ref-gray)]">
        Verificaci?n oficial
      </p>
      <p className="mt-1 text-sm text-[var(--ref-gray)]">
        Escanea para verificar ?rbitro
      </p>
    </div>
  );
}
