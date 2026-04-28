"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Map, Calendar, Clock, Check, ShoppingBag } from "lucide-react";
import { useStore } from "@/store/useStore";

import { TOURS } from "@/constants/data";

export default function ToursPage() {
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);
  const removeFromCart = useStore((state) => state.removeFromCart);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">Experiencias</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-4">
            Paquetes Turísticos
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Reserva las mejores experiencias guiadas en Ayacucho. Añade tours a tu carrito y planifica tu viaje perfecto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TOURS.map((tour, index) => {
            const inCart = cart.includes(tour.id);
            
            return (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="flex flex-col h-full overflow-hidden border-zinc-800 bg-zinc-950/50 hover:border-primary/50 transition-colors">
                  <div className="relative h-56 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                      style={{ backgroundImage: `url(${tour.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <h3 className="text-xl font-bold text-white max-w-[70%]">{tour.name}</h3>
                      <span className="text-2xl font-bold text-primary">S/ {tour.price}</span>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-4 text-sm text-zinc-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {tour.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> Salidas diarias
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6 text-sm">{tour.description}</p>
                    
                    <div className="mb-6 flex-1">
                      <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Incluye:</h4>
                      <ul className="space-y-2">
                        {tour.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                            <Check className="w-4 h-4 text-primary mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      className="w-full rounded-lg h-12 text-base"
                      variant={inCart ? "secondary" : "default"}
                      onClick={() => inCart ? removeFromCart(tour.id) : addToCart(tour.id)}
                    >
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      {inCart ? "Quitar del Carrito" : "Añadir al Carrito"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
