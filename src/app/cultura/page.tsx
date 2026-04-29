"use client";

import { motion } from "framer-motion";
import { CULTURE_ITEMS } from "@/constants/data";
import { Badge } from "@/components/ui/badge";

export default function CulturaPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Encabezado */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-playfair)] mb-6 text-white"
          >
            Alma <span className="text-primary italic">Ayacuchana</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Descubre la ciudad de las 33 iglesias, capital del arte popular y cuna de las tradiciones más vivas de los Andes peruanos.
          </motion.p>
        </div>

        {/* Grilla Bento para la Cultura */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CULTURE_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative overflow-hidden rounded-3xl group ${
                index === 0 || index === 3 ? "md:col-span-2 md:row-span-2 h-[400px]" : "h-[300px] md:h-auto"
              }`}
            >
              {/* Imagen de fondo */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              
              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Contenido */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <Badge variant="secondary" className="w-fit mb-3 bg-primary/80 text-white border-none backdrop-blur-md">
                  {item.category}
                </Badge>
                <h3 className="text-3xl font-bold text-white mb-2 font-[family-name:var(--font-playfair)]">
                  {item.title}
                </h3>
                <p className="text-zinc-300 line-clamp-3 md:line-clamp-none max-w-lg">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Sección interactiva: El Retablo */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-1 lg:p-12 glass rounded-3xl border-zinc-800 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8">
            <div>
              <h2 className="text-4xl font-bold mb-6 font-[family-name:var(--font-playfair)] text-white">
                El Arte de Contar Historias
              </h2>
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                Los retablos son Patrimonio Cultural de la Nación. Originalmente llamados "Cajas de San Marcos", 
                fueron introducidos por los españoles y adaptados por los artesanos ayacuchanos para relatar 
                fiestas costumbristas, cosechas y tradiciones ancestrales en miniatura.
              </p>
              <div className="flex gap-4">
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                  <div className="text-3xl font-bold text-primary mb-1">33</div>
                  <div className="text-sm text-zinc-500">Iglesias Coloniales</div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                  <div className="text-3xl font-bold text-primary mb-1">16</div>
                  <div className="text-sm text-zinc-500">Líneas Artesanales</div>
                </div>
              </div>
            </div>
            <div className="relative h-80 lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
              <div 
                className="absolute inset-0 bg-cover bg-center hover:scale-110 transition-transform duration-1000"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2000&auto=format&fit=crop)` }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
