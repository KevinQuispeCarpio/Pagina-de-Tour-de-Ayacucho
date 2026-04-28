"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { TOURS } from "@/constants/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);

  // Obtener los datos completos de los tours que están en el carrito
  const cartItems = TOURS.filter(tour => cart.includes(tour.id));
  
  // Cálculos de pago
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-8">
          Finalizar Reserva
        </h1>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl"
          >
            <p className="text-zinc-400 text-lg mb-6">Tu bolsa de viaje está vacía.</p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/tours">Explorar Tours</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de Items en el carrito */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold mb-4">Tus Tours Seleccionados ({cartItems.length})</h2>
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="flex flex-col sm:flex-row overflow-hidden border-zinc-800 bg-zinc-950/50">
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
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Panel de Checkout Lateral */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-24 border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6">Resumen de Compra</h2>
                  
                  <div className="space-y-3 text-sm mb-6 pb-6 border-b border-zinc-800">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Subtotal</span>
                      <span>S/ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Impuestos (IGV 18%)</span>
                      <span>S/ {igv.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-8">
                    <span className="font-bold text-lg">Total</span>
                    <span className="text-3xl font-bold text-white">S/ {total.toFixed(2)}</span>
                  </div>

                  <div className="space-y-4">
                    <Button className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                      <CreditCard className="w-5 h-5 mr-2" /> Pagar Seguro
                    </Button>
                    <div className="text-center">
                      <Link href="/tours" className="text-sm text-primary hover:underline inline-flex items-center">
                        Seguir explorando <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
