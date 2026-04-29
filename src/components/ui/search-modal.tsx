"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, MapPin, Map, Utensils, Calendar } from "lucide-react";
import { DESTINATIONS, TOURS, GASTRONOMY, CULTURE_ITEMS } from "@/constants/data";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Evitar scroll cuando está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const allItems = [
    ...DESTINATIONS.map(d => ({ ...d, type: "Destino", icon: MapPin, href: `/destinos` })),
    ...TOURS.map(t => ({ ...t, type: "Tour", icon: Map, href: `/tours` })),
    ...GASTRONOMY.map(g => ({ ...g, type: "Gastronomía", icon: Utensils, href: `/gastronomia` })),
    ...CULTURE_ITEMS.map(c => ({ ...c, type: "Cultura", icon: Calendar, href: `/cultura` }))
  ];

  const filteredItems = query.trim() === "" 
    ? [] 
    : allItems.filter(item => 
        item.name?.toLowerCase().includes(query.toLowerCase()) || 
        item.title?.toLowerCase().includes(query.toLowerCase()) || 
        item.description?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Mostrar solo los 5 mejores resultados

  const handleNavigate = (href: string) => {
    router.push(href);
    onClose();
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal de búsqueda */}
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
            >
              {/* Buscador Input */}
              <div className="flex items-center px-4 border-b border-zinc-800">
                <Search className="w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Busca destinos, tours, platos típicos..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none px-4 py-5 text-white placeholder:text-zinc-500 text-lg"
                />
                <button 
                  onClick={onClose}
                  className="p-1 rounded-md bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Resultados */}
              {query.trim() !== "" && (
                <div className="max-h-[60vh] overflow-y-auto p-2">
                  {filteredItems.length > 0 ? (
                    <div className="space-y-1">
                      {filteredItems.map((item, index) => (
                        <button
                          key={item.id}
                          onClick={() => handleNavigate(item.href)}
                          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-zinc-900 transition-colors text-left group"
                        >
                          <div className="bg-zinc-800 p-2 rounded-lg text-zinc-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium truncate">{item.name || item.title}</span>
                              <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
                                {item.type}
                              </span>
                            </div>
                            <p className="text-sm text-zinc-500 truncate mt-0.5">{item.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-zinc-500">
                      No se encontraron resultados para "{query}"
                    </div>
                  )}
                </div>
              )}
              
              {/* Footer del buscador */}
              <div className="px-4 py-3 bg-zinc-900/50 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><kbd className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 font-sans font-medium">↑</kbd><kbd className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 font-sans font-medium">↓</kbd> Navegar</span>
                  <span className="flex items-center gap-1"><kbd className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 font-sans font-medium">Enter</kbd> Seleccionar</span>
                </div>
                <span className="flex items-center gap-1"><kbd className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 font-sans font-medium">Esc</kbd> Cerrar</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
