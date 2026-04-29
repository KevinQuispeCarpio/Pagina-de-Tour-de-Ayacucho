"use client";

import { useParams, notFound } from "next/navigation";
import { DESTINATIONS } from "@/constants/data";
import { ReviewSection } from "@/components/ui/review-section";
import { MapPin, Star, Heart, ArrowLeft, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DestinoDetailPage() {
  const params = useParams();
  const destino = DESTINATIONS.find((d) => d.id === params.id);
  const favorites = useStore((state) => state.favorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);

  if (!destino) return notFound();

  const isFavorite = favorites.includes(destino.id);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Image */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${destino.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30" />
        
        {/* Top Navbar overlay */}
        <div className="absolute top-24 left-0 right-0 z-20 container mx-auto px-4 flex justify-between items-center">
          <Button variant="outline" size="icon" className="rounded-full bg-black/50 border-white/20 hover:bg-black/80 text-white backdrop-blur-md" asChild>
            <Link href="/destinos">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full bg-black/50 border-white/20 hover:bg-black/80 text-white backdrop-blur-md">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-black/50 border-white/20 hover:bg-black/80 text-white backdrop-blur-md"
              onClick={() => toggleFavorite(destino.id)}
            >
              <Heart className={cn("w-5 h-5", isFavorite ? "fill-primary text-primary" : "")} />
            </Button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 container mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">
              {destino.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-playfair)] text-white mb-4 drop-shadow-lg">
              {destino.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Ayacucho, Perú</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span>{destino.rating} / 5.0 Excelente</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-xl ml-auto">
                {destino.price === 0 ? "Ingreso Libre" : `S/ ${destino.price}`}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-white mb-6">Acerca de este lugar</h2>
              <p className="text-lg text-zinc-300 leading-relaxed">
                {destino.description}
              </p>
              <p className="text-lg text-zinc-300 leading-relaxed mt-4">
                Ubicado estratégicamente en la región, este destino ofrece una experiencia inmersiva que conecta al viajero con las raíces profundas de la cultura y la naturaleza andina. Ideal para fotógrafos, aventureros y amantes de la historia.
              </p>
            </section>

            <hr className="border-zinc-800" />

            <ReviewSection itemId={destino.id} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-4">Planifica tu visita</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-white text-sm">Mejor época para visitar</p>
                    <p className="text-zinc-400 text-sm">Abril - Noviembre (Época seca)</p>
                  </div>
                </div>
              </div>

              <Button className="w-full h-12 text-base rounded-xl font-bold shadow-lg shadow-primary/20">
                Ver Tours Relacionados
              </Button>
              
              <p className="text-center text-xs text-zinc-500 mt-4">
                Consulta disponibilidad de tours para este destino en la sección de Paquetes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
