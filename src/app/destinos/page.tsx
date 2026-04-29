"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DESTINATIONS } from "@/constants/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Heart, Filter, Map, Grid } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { MapView } from "@/components/ui/map";
import Link from "next/link";

export default function DestinosPage() {
  const favorites = useStore((state) => state.favorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const [activeCategory, setActiveCategory] = useState<string>("Todas");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  // Extraer categorías únicas
  const categories = useMemo(() => {
    const cats = new Set(DESTINATIONS.map(d => d.category));
    return ["Todas", ...Array.from(cats)];
  }, []);

  // Filtrar destinos
  const filteredDestinations = useMemo(() => {
    if (activeCategory === "Todas") return DESTINATIONS;
    return DESTINATIONS.filter(d => d.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-4">
                Destinos en Ayacucho
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Explora la vasta riqueza cultural y natural de nuestros destinos. Filtra por categoría y encuentra tu próxima aventura.
              </p>
            </div>
            
            <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-zinc-800">
              <Button 
                variant="ghost" 
                size="sm"
                className={cn("rounded-lg", viewMode === "grid" ? "bg-zinc-800 text-white" : "text-zinc-400")}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4 mr-2" /> Grilla
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className={cn("rounded-lg", viewMode === "map" ? "bg-zinc-800 text-white" : "text-zinc-400")}
                onClick={() => setViewMode("map")}
              >
                <Map className="w-4 h-4 mr-2" /> Mapa Interactivo
              </Button>
            </div>
          </div>
          
          {/* Barra de Filtros */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 mr-4 text-zinc-400">
              <Filter className="w-5 h-5" />
              <span className="text-sm font-medium">Filtrar:</span>
            </div>
            {categories.map(cat => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                className={cn(
                  "rounded-full transition-all",
                  activeCategory === cat 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                    : "border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                )}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {viewMode === "grid" ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredDestinations.map((dest, index) => {
              const isFavorite = favorites.includes(dest.id);
              
              return (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 transition-all duration-300 relative">
                    {/* Botón de Favorito */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(dest.id);
                      }}
                      className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 transition-colors"
                    >
                      <Heart 
                        className={cn(
                          "w-5 h-5 transition-colors", 
                          isFavorite ? "fill-primary text-primary" : "text-white hover:text-primary"
                        )} 
                      />
                    </button>
                    
                    <div className="relative h-72 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${dest.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                      
                      <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-white text-sm font-medium">{dest.rating}</span>
                      </div>
                      
                      <div className="absolute bottom-4 left-4 right-4 z-20">
                        <Badge variant="secondary" className="mb-3 bg-primary/20 text-primary border-none">
                          {dest.category}
                        </Badge>
                        <h3 className="text-2xl font-bold text-white mb-1">{dest.name}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6 relative z-20">
                      <div className="flex items-start gap-3 text-muted-foreground mb-4">
                        <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                        <p className="text-base leading-relaxed">{dest.description}</p>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-zinc-800 mb-4">
                      <span className="text-sm text-zinc-400">Precio referencial</span>
                      <span className="font-bold text-lg text-white">
                        {dest.price === 0 ? "Gratis" : `S/ ${dest.price}`}
                      </span>
                    </div>
                    <Button asChild className="w-full rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white">
                      <Link href={`/destinos/${dest.id}`}>Ver Detalles y Reseñas</Link>
                    </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-[600px] relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20"
          >
            <MapView locations={filteredDestinations as any} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
