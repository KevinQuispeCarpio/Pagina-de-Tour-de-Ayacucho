import Link from "next/link";
import { Map, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 text-zinc-50">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <Map className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Ayacucho<span className="text-primary">Tour</span></span>
          </Link>
          <p className="text-sm">
            Descubre la magia, historia y gastronomía de la Ciudad de las Iglesias. Tu aventura inolvidable en los Andes peruanos comienza aquí.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Youtube className="w-5 h-5" /></a>
          </div>
        </div>

        <div>
          <h3 className="text-zinc-50 font-semibold mb-4">Explorar</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/destinos" className="hover:text-primary transition-colors">Destinos Principales</Link></li>
            <li><Link href="/gastronomia" className="hover:text-primary transition-colors">Ruta Gastronómica</Link></li>
            <li><Link href="/cultura" className="hover:text-primary transition-colors">Cultura y Fiestas</Link></li>
            <li><Link href="/tours" className="hover:text-primary transition-colors">Paquetes Turísticos</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-zinc-50 font-semibold mb-4">Soporte</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contacto" className="hover:text-primary transition-colors">Contacto</Link></li>
            <li><Link href="/faqs" className="hover:text-primary transition-colors">Preguntas Frecuentes</Link></li>
            <li><Link href="/terminos" className="hover:text-primary transition-colors">Términos de Servicio</Link></li>
            <li><Link href="/privacidad" className="hover:text-primary transition-colors">Política de Privacidad</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-zinc-50 font-semibold mb-4">Boletín</h3>
          <p className="text-sm mb-4">Suscríbete para recibir ofertas de tours y noticias de Ayacucho.</p>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="Tu correo" 
              className="bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm flex-1 focus:outline-none focus:border-primary"
            />
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              Unirse
            </button>
          </form>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-zinc-800 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} Ayacucho Tour. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
