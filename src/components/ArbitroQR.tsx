"use client";

import { QRCodeCanvas } from "qrcode.react";

interface Props {
  id: string;
}

export default function ArbitroQR({ id }: Props) {
  return (
    <div className="mt-6">
      <QRCodeCanvas value={`http://localhost:3000/v/${id}`} size={200} />
      <p className="text-sm text-gray-500 mt-2">Escanea para verificar ?rbitro</p>
    </div>
  );
}
