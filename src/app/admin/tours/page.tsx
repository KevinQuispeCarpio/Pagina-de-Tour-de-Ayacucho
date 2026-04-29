"use client";

import { TOURS } from "@/constants/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function AdminToursPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Gestión de Tours</h1>
          <p className="text-zinc-400 mt-1">Administra los paquetes turísticos ofrecidos.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-4 h-4 mr-2" /> Nuevo Tour
        </Button>
      </div>

      <Card className="bg-zinc-950/50 border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-zinc-400">
            <thead className="text-xs text-zinc-500 uppercase bg-zinc-900 border-b border-zinc-800">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Tour</th>
                <th scope="col" className="px-6 py-4 font-medium">Duración</th>
                <th scope="col" className="px-6 py-4 font-medium">Precio</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {TOURS.map((tour) => (
                <tr key={tour.id} className="bg-transparent border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-zinc-800 overflow-hidden flex-shrink-0">
                      <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="truncate max-w-[250px]">{tour.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    {tour.duration}
                  </td>
                  <td className="px-6 py-4 font-bold text-white">
                    S/ {tour.price}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-blue-400">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
