"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, MapPin, Map, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  const metrics = [
    { title: "Ingresos Totales", value: "S/ 45,231.89", change: "+20.1%", icon: DollarSign },
    { title: "Reservas Activas", value: "356", change: "+15.3%", icon: Users },
    { title: "Destinos Activos", value: "12", change: "+2.4%", icon: MapPin },
    { title: "Tours Populares", value: "8", change: "+4.1%", icon: Map },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard General</h1>
        <p className="text-zinc-400 mt-1">Bienvenido al panel de control de Ayacucho Tour.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="bg-zinc-950/50 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">{metric.title}</CardTitle>
              <metric.icon className="w-4 h-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{metric.value}</div>
              <p className="text-xs text-emerald-500 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {metric.change} respecto al mes pasado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <Card className="lg:col-span-4 bg-zinc-950/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Resumen de Ventas (Gráfico Simulado)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t border-dashed border-zinc-800 mx-6 mb-6 rounded-lg bg-zinc-900/20">
            <p className="text-zinc-500">Aquí iría un gráfico de Recharts o Chart.js</p>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3 bg-zinc-950/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Últimas Reservas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-white">
                      U{i}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Usuario de Prueba {i}</p>
                      <p className="text-xs text-zinc-500">tour@ayacucho.com</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">S/ 120.00</p>
                    <p className="text-xs text-zinc-500">Hace {i} horas</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
