"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Lock, ArrowRight, UserCircle } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const login = useStore((state) => state.login);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular un request de login (1 segundo)
    setTimeout(() => {
      login({
        name: "Viajero Aventurero",
        email: email || "usuario@correo.com",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
      });
      router.push("/perfil");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -z-10" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <Card className="border-zinc-800 bg-zinc-950/80 backdrop-blur-xl shadow-2xl overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCircle className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-white mb-2">Bienvenido</h1>
                <p className="text-zinc-400 text-sm">Ingresa a tu cuenta para gestionar tus reservas y favoritos.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Correo Electrónico</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input 
                      type="email" 
                      required
                      placeholder="tu@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-zinc-300">Contraseña</label>
                    <Link href="#" className="text-xs text-primary hover:underline">¿Olvidaste tu contraseña?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all text-base font-semibold"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Iniciar Sesión <ArrowRight className="w-4 h-4 ml-2" /></>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
                <p className="text-zinc-400 text-sm">
                  ¿No tienes una cuenta? <Link href="#" className="text-primary hover:underline font-medium">Regístrate</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
