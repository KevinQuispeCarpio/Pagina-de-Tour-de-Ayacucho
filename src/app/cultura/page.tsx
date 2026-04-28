"use client";

import { motion } from "framer-motion";

export default function CulturaPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto py-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold font-[family-name:var(--font-playfair)] mb-6 text-primary">
            Cultura y Tradición
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Ayacucho es cuna de retablos, Semana Santa y un folklore inigualable. 
            Esta sección se encuentra actualmente en desarrollo y pronto revelará 
            los secretos mejor guardados de nuestra cultura.
          </p>
          <div className="glass p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-2">Próximamente</h3>
            <p className="text-zinc-400">Estamos preparando documentales interactivos sobre los carnavales ayacuchanos y la artesanía de Quinua.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
