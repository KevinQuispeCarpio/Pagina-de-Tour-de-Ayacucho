"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { DESTINATIONS, GASTRONOMY, TOURS } from "@/constants/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FavoritosPage() {
  const favorites = useStore((state) => state.favorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);

  // Unificar todos los items para buscar los favoritos
  const allItems = [...DESTINATIONS, ...GASTRONOMY, ...TOURS];
  const favoriteItems = allItems.filter(item => favorites.includes(item.id));

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-6"
          >
            Tus Lugares Guardados
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Los destinos y experiencias que te enamoraron, listos para tu próxima aventura.
          </motion.p>
        </div>

        {favoriteItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 max-w-md mx-auto"
          >
            <div className="glass p-12 rounded-3xl border border-zinc-800">
              <Heart className="w-16 h-16 mx-auto text-zinc-700 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Aún no hay favoritos</h3>
              <p className="text-zinc-400 mb-8">
                Explora nuestros destinos y guarda los que más te gusten para planear tu viaje.
              </p>
              <Button asChild className="rounded-full w-full">
                <Link href="/destinos">
                  Descubrir Destinos <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden bg-zinc-950/50 border-zinc-800 hover:border-primary/50 transition-colors group">
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-primary border-none rounded-full backdrop-blur-sm"
                      onClick={() => toggleFavorite(item.id)}
                    >
                      <Heart className="w-5 h-5 fill-primary" />
                    </Button>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                    <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm" className="rounded-full border-zinc-700 text-zinc-300 hover:text-white" asChild>
                        <Link href={`/destinos`}>Ver Detalles</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
