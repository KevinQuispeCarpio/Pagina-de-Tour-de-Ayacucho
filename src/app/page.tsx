"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DESTINATIONS } from "@/constants/data";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const favorites = useStore((state) => state.favorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 z-10 bg-black/50 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <div className="container mx-auto px-4 z-20 pt-20">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl"
          >
            <Badge variant="outline" className="mb-4 text-white border-white/30 backdrop-blur-md">
              La Ciudad de las 33 Iglesias
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
              Descubre la magia de <span className="text-primary">Ayacucho</span>
            </h1>
            <p className="text-lg md:text-2xl text-zinc-200 mb-8 max-w-2xl">
              Historia vibrante, naturaleza imponente y una gastronomía que cautivará todos tus sentidos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full text-base h-14 px-8" asChild>
                <Link href="/destinos">
                  Explorar Destinos <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full text-base h-14 px-8 glass text-white hover:text-black">
                Ver Video Promocional
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)] mb-4">
                Destinos Populares
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Los lugares más icónicos y mejor valorados por nuestros viajeros. 
                Desde ruinas milenarias hasta maravillas naturales.
              </p>
            </div>
            <Button variant="ghost" className="group" asChild>
              <Link href="/destinos">
                Ver todos <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESTINATIONS.map((dest, index) => {
              const isFavorite = favorites.includes(dest.id);
              return (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/destinos/${dest.id}`}>
                    <Card className="group overflow-hidden border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 transition-all duration-300 hover:ring-2 hover:ring-primary/50 relative">
                      
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
                            "w-4 h-4 transition-colors", 
                            isFavorite ? "fill-primary text-primary" : "text-white hover:text-primary"
                          )} 
                        />
                      </button>

                      <div className="relative h-64 overflow-hidden">
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                          style={{ backgroundImage: `url(${dest.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                        <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-white text-sm font-medium">{dest.rating}</span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 z-20">
                          <Badge variant="secondary" className="mb-2 bg-primary/20 text-primary hover:bg-primary/30 border-none">
                            {dest.category}
                          </Badge>
                          <h3 className="text-xl font-bold text-white truncate">{dest.name}</h3>
                        </div>
                      </div>
                      <CardContent className="p-4 relative z-20">
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                          <p className="text-sm line-clamp-2">{dest.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_60%)] opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold font-[family-name:var(--font-playfair)] text-white mb-6">
              ¿Listo para tu próxima aventura?
            </h2>
            <p className="text-zinc-400 mb-8 text-lg">
              Reserva tu tour guiado hoy mismo y vive Ayacucho como nunca antes.
            </p>
            <Button size="lg" className="rounded-full h-14 px-10 text-lg">
              Comenzar a planear
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
