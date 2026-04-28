"use client";

import { motion } from "framer-motion";
import { GASTRONOMY } from "@/constants/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils } from "lucide-react";

export default function GastronomiaPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">Sabor Andino</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-4">
            Ruta Gastronómica
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            La cocina ayacuchana es una fusión de herencia milenaria y sabor. Descubre los platos que debes probar en tu visita.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {GASTRONOMY.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="group flex flex-col sm:flex-row overflow-hidden border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 transition-all duration-300">
                <div className="relative h-64 sm:h-auto sm:w-2/5 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${dish.image})` }}
                  />
                </div>
                <CardContent className="p-6 sm:w-3/5 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Utensils className="w-5 h-5" />
                    <span className="text-sm font-semibold tracking-wider uppercase">Plato Típico</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 font-[family-name:var(--font-playfair)]">
                    {dish.name}
                  </h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {dish.description}
                  </p>
                  <div className="mt-auto">
                    <span className="text-2xl font-bold text-white">S/ {dish.price}</span>
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
