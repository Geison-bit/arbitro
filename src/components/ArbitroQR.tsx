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
    <div className="mt-6">
      <QRCodeCanvas value={value} size={200} />
      <p className="text-sm text-gray-500 mt-2">Escanea para verificar ?rbitro</p>
    </div>
  );
}
