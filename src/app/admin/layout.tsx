"use client";

import { useStore } from "@/store/useStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutDashboard, MapPin, Map, Settings, Users, ArrowLeft, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = useStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simple protection for admin route
    if (mounted && (!user || user.email !== "admin@ayacucho.com")) {
      // For demo purposes, we let anyone in, but normally we'd check role.
      // We will allow it for now so you can see it without a real DB.
    }
  }, [user, mounted]);

  if (!mounted) return null;

  const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Destinos", href: "/admin/destinos", icon: MapPin },
    { name: "Paquetes Turísticos", href: "/admin/tours", icon: Map },
    { name: "Usuarios", href: "/admin/usuarios", icon: Users },
    { name: "Configuración", href: "/admin/configuracion", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col z-20">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <Link href="/" className="flex items-center text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Volver a la Web</span>
          </Link>
        </div>
        
        <div className="p-6">
          <h2 className="text-xs uppercase font-bold text-zinc-500 tracking-wider mb-4">Administración</h2>
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
                    isActive ? "text-primary bg-primary/10" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  )}
                >
                  {isActive && (
                    <motion.div className="absolute left-0 w-1 h-full bg-primary rounded-r-full" layoutId="admin-active-nav" />
                  )}
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 overflow-hidden flex-shrink-0">
              <img src={user?.avatar || "https://github.com/shadcn.png"} alt="Admin" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || "Administrador"}</p>
              <p className="text-xs text-zinc-500 truncate">admin@ayacucho.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-black relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="p-8 relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
