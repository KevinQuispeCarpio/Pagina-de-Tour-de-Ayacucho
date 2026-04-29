"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamic import with ssr: false is required for leaflet
const MapView = dynamic(
  () => import("./map-view"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[400px] rounded-2xl bg-zinc-950/50 border border-zinc-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-zinc-500 font-medium">Cargando mapa interactivo...</p>
        </div>
      </div>
    )
  }
);

export { MapView };
