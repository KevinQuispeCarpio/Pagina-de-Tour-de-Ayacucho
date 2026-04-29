"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, LogOut, Ticket, Settings, Heart } from "lucide-react";
import Link from "next/link";
import { DESTINATIONS } from "@/constants/data";

export default function PerfilPage() {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const favorites = useStore((state) => state.favorites);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Proteger la ruta: Si no hay usuario, redirigir a login
    if (!user && mounted) {
      router.push("/login");
    }
  }, [user, router, mounted]);

  if (!mounted || !user) return null;

  const favoriteDestinations = DESTINATIONS.filter(d => favorites.includes(d.id));

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background relative">
      <div className="absolute top-0 right-0 w-full h-[300px] bg-primary/10 -z-10" />
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar de Perfil */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <Card className="border-zinc-800 bg-zinc-950/80 backdrop-blur-xl overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-primary/40 to-primary/10" />
                <CardContent className="px-6 pb-6 pt-0 relative text-center">
                  <div className="w-24 h-24 rounded-full border-4 border-zinc-950 mx-auto -mt-12 mb-4 overflow-hidden bg-zinc-900">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
                  <p className="text-sm text-zinc-400 mb-6">{user.email}</p>
                  
                  <div className="space-y-2 text-left">
                    <Button variant="ghost" className="w-full justify-start text-white bg-zinc-900">
                      <Ticket className="w-4 h-4 mr-3" /> Mis Reservas
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white" asChild>
                      <Link href="/favoritos"><Heart className="w-4 h-4 mr-3" /> Favoritos</Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white">
                      <Settings className="w-4 h-4 mr-3" /> Configuración
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10 mt-4" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-3" /> Cerrar Sesión
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contenido Principal */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold font-[family-name:var(--font-playfair)] mb-6 text-white">Tus Próximos Viajes</h3>
              
              <Card className="border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors">
                <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-48 h-32 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1526392060635-9d60198d3de3?q=80&w=600)` }} />
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-white">Ruta Imperial Wari & Quinua</h4>
                      <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">CONFIRMADO</span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-4">Código de Reserva: <span className="font-mono text-white">#AYA-X92M</span></p>
                    <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 15 Oct, 2026</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 08:00 AM</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Plaza Mayor</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-end mb-6">
                <h3 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-white">Destinos Guardados</h3>
                <Link href="/favoritos" className="text-sm text-primary hover:underline">Ver todos</Link>
              </div>
              
              {favoriteDestinations.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl">
                  <p className="text-zinc-500">No tienes destinos guardados aún.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoriteDestinations.slice(0, 2).map((dest) => (
                    <Card key={dest.id} className="border-zinc-800 bg-zinc-950/50 overflow-hidden">
                      <div className="flex h-24">
                        <div className="w-24 bg-cover bg-center" style={{ backgroundImage: `url(${dest.image})` }} />
                        <div className="p-4 flex-1 flex flex-col justify-center">
                          <h4 className="font-bold text-white text-sm line-clamp-1">{dest.name}</h4>
                          <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Ayacucho</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
