"use client";

import { motion } from "framer-motion";
import { DESTINATIONS } from "@/constants/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";

export default function DestinosPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-4">
            Destinos en Ayacucho
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Explora la vasta riqueza cultural y natural de nuestros destinos. Filtra por categoría y encuentra tu próxima aventura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 transition-all duration-300">
                <div className="relative h-72 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${dest.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-white text-sm font-medium">{dest.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge variant="secondary" className="mb-3 bg-primary/20 text-primary border-none">
                      {dest.category}
                    </Badge>
                    <h3 className="text-2xl font-bold text-white mb-1">{dest.name}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 text-muted-foreground mb-4">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                    <p className="text-base leading-relaxed">{dest.description}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                    <span className="text-sm text-zinc-400">Precio referencial</span>
                    <span className="font-bold text-lg text-white">
                      {dest.price === 0 ? "Gratis" : `S/ ${dest.price}`}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
