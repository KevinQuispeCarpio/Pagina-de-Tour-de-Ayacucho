"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Map, MapPin, Utensils, Info, Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

import { useStore } from "@/store/useStore";
import { Heart, Search } from "lucide-react";
import { SearchModal } from "@/components/ui/search-modal";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  // Escuchar Cmd+K o Ctrl+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  
  // Zustand state
  const cart = useStore((state) => state.cart);
  const favorites = useStore((state) => state.favorites);
  const user = useStore((state) => state.user);

  const routes = [
    { href: "/", label: "Inicio", icon: Map },
    { href: "/destinos", label: "Destinos", icon: MapPin },
    { href: "/gastronomia", label: "Gastronomía", icon: Utensils },
    { href: "/cultura", label: "Cultura", icon: Info },
  ];

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 glass border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg group-hover:scale-105 transition-transform">
            <Map className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">Ayacucho<span className="text-primary">Tour</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-1",
                pathname === route.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {route.label}
              {pathname === route.href && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </Link>
          ))}
          <div className="ml-4 flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-primary"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </Button>
            <Link href="/favoritos">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute 0 top-0 right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/checkout">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </Link>
            {user ? (
              <Button asChild variant="outline" className="rounded-full ml-2 border-zinc-800 hover:bg-zinc-800 gap-2">
                <Link href="/perfil">
                  <div className="w-5 h-5 rounded-full overflow-hidden bg-primary/20">
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  Mi Perfil
                </Link>
              </Button>
            ) : (
              <Button asChild className="rounded-full ml-2">
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 text-sm font-medium p-3 rounded-lg transition-colors",
                    pathname === route.href
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  <route.icon className="w-5 h-5" />
                  {route.label}
                </Link>
              ))}
              <Button className="w-full mt-2 rounded-full">Reservar Tour</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
