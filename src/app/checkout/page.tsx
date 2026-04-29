"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { TOURS } from "@/constants/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Trash2, ArrowRight, CheckCircle2, ShieldCheck, Calendar, User, Mail, CreditCard as CardIcon } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);

  const [step, setStep] = useState<"cart" | "payment" | "success">("cart");
  const [bookingCode, setBookingCode] = useState("");

  const cartItems = TOURS.filter(tour => cart.includes(tour.id));
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generar código aleatorio de reserva
    const code = "#AYA-" + Math.random().toString(36).substr(2, 5).toUpperCase();
    setBookingCode(code);
    clearCart();
    setStep("success");
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Encabezado y Progreso (Solo visible en pasos 1 y 2) */}
        {step !== "success" && (
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-8">
              Finalizar Reserva
            </h1>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className={`transition-colors ${step === "cart" ? "text-primary" : "text-muted-foreground"}`}>
                1. Bolsa de viaje
              </span>
              <span className="text-zinc-700">/</span>
              <span className={`transition-colors ${step === "payment" ? "text-primary" : "text-muted-foreground"}`}>
                2. Pago seguro
              </span>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {/* PASO 1: CARRITO */}
          {step === "cart" && (
            <motion.div
              key="cart-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {cartItems.length === 0 ? (
                <div className="text-center py-32 border border-dashed border-zinc-800 rounded-3xl glass">
                  <p className="text-zinc-400 text-lg mb-6">Tu bolsa de viaje está vacía.</p>
                  <Button asChild size="lg" className="rounded-full">
                    <Link href="/tours">Explorar Tours</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item, index) => (
                      <Card key={item.id} className="flex flex-col sm:flex-row overflow-hidden border-zinc-800 bg-zinc-950/50 hover:border-primary/30 transition-colors">
                        <div 
                          className="h-40 sm:w-48 sm:h-auto bg-cover bg-center"
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                        <CardContent className="p-6 flex-1 flex flex-col justify-between">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <Badge variant="secondary" className="mb-2 bg-primary/20 text-primary border-none">
                                {item.duration}
                              </Badge>
                              <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                              <p className="text-sm text-zinc-400 line-clamp-1">{item.description}</p>
                            </div>
                            <span className="text-xl font-bold text-primary whitespace-nowrap">S/ {item.price}</span>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-full"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="lg:col-span-1">
                    <Card className="sticky top-24 border-zinc-800 bg-zinc-950/80 backdrop-blur-xl rounded-3xl">
                      <CardContent className="p-8">
                        <h2 className="text-xl font-bold mb-6 text-white">Resumen</h2>
                        <div className="space-y-4 text-sm mb-6 pb-6 border-b border-zinc-800/50">
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Subtotal ({cartItems.length} items)</span>
                            <span className="text-white">S/ {subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Impuestos (IGV 18%)</span>
                            <span className="text-white">S/ {igv.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mb-8">
                          <span className="font-bold text-lg text-white">Total</span>
                          <span className="text-3xl font-bold text-primary">S/ {total.toFixed(2)}</span>
                        </div>
                        <Button 
                          onClick={() => setStep("payment")}
                          className="w-full h-14 text-base rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                        >
                          Continuar al Pago <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* PASO 2: PAGO SEGURO */}
          {step === "payment" && (
            <motion.div
              key="payment-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2">
                <Card className="border-zinc-800 bg-zinc-950/50 backdrop-blur-xl rounded-3xl overflow-hidden">
                  <CardContent className="p-0">
                    <form onSubmit={handlePaymentSubmit}>
                      {/* Datos del Viajero */}
                      <div className="p-8 border-b border-zinc-800">
                        <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                          <User className="w-5 h-5 mr-2 text-primary" /> Datos del Viajero Principal
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm text-zinc-400">Nombres y Apellidos</label>
                            <input required type="text" placeholder="Ej. Juan Pérez" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-zinc-400">Correo Electrónico</label>
                            <input required type="email" placeholder="juan@correo.com" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-zinc-400">DNI / Pasaporte</label>
                            <input required type="text" placeholder="12345678" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-zinc-400">Teléfono</label>
                            <input required type="tel" placeholder="+51 987 654 321" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-colors" />
                          </div>
                        </div>
                      </div>

                      {/* Tarjeta de Crédito Simulada */}
                      <div className="p-8">
                        <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                          <CardIcon className="w-5 h-5 mr-2 text-primary" /> Método de Pago
                        </h2>
                        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 mb-6">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm text-zinc-400">Número de Tarjeta</label>
                              <input required type="text" placeholder="0000 0000 0000 0000" maxLength={19} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white font-mono outline-none focus:border-primary transition-colors tracking-widest" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm text-zinc-400">Vencimiento</label>
                                <input required type="text" placeholder="MM/YY" maxLength={5} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white font-mono outline-none focus:border-primary transition-colors" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm text-zinc-400">CVC</label>
                                <input required type="text" placeholder="123" maxLength={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white font-mono outline-none focus:border-primary transition-colors" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setStep("cart")}
                            className="h-14 rounded-2xl border-zinc-800 text-zinc-300 hover:text-white flex-1"
                          >
                            Volver al Carrito
                          </Button>
                          <Button 
                            type="submit" 
                            className="h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] flex-1"
                          >
                            <ShieldCheck className="w-5 h-5 mr-2" /> Pagar S/ {total.toFixed(2)}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-24 border-zinc-800 bg-zinc-950/80 backdrop-blur-xl rounded-3xl">
                  <CardContent className="p-8">
                    <h2 className="text-xl font-bold mb-6 text-white">Tu Pedido</h2>
                    <div className="space-y-4 mb-6 pb-6 border-b border-zinc-800/50">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between items-start text-sm">
                          <div>
                            <p className="text-white font-medium">{item.name}</p>
                            <p className="text-zinc-500 text-xs mt-1">{item.duration}</p>
                          </div>
                          <span className="text-zinc-400 whitespace-nowrap ml-4">S/ {item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-zinc-400 text-sm">Subtotal</span>
                      <span className="text-white text-sm">S/ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-zinc-400 text-sm">IGV (18%)</span>
                      <span className="text-white text-sm">S/ {igv.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-primary/10 p-4 rounded-2xl border border-primary/20">
                      <span className="font-bold text-primary">Total a Pagar</span>
                      <span className="text-2xl font-bold text-white">S/ {total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* PASO 3: ÉXITO */}
          {step === "success" && (
            <motion.div
              key="success-step"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center py-20"
            >
              <div className="glass p-12 rounded-[3rem] border border-primary/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle2 className="w-24 h-24 text-primary mx-auto mb-8" />
                  </motion.div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                    ¡Reserva Confirmada!
                  </h1>
                  <p className="text-lg text-zinc-400 mb-8">
                    Tu pago ha sido procesado exitosamente. Te hemos enviado un correo con los detalles de tu itinerario.
                  </p>
                  
                  <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6 mb-8 inline-block text-left">
                    <div className="text-sm text-zinc-500 mb-1">Código de Reserva</div>
                    <div className="text-3xl font-mono font-bold text-primary tracking-widest">
                      {bookingCode}
                    </div>
                  </div>

                  <div>
                    <Button asChild size="lg" className="rounded-full h-14 px-8 text-base shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                      <Link href="/">Volver al Inicio</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
