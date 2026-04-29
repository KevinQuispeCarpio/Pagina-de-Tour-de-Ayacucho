export const DESTINATIONS = [
  {
    id: "plaza-armas",
    name: "Plaza Mayor de Ayacucho",
    description: "El corazón histórico rodeado de casonas coloniales de los siglos XVI y XVII.",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2000&auto=format&fit=crop", // placeholder
    category: "Historia",
    rating: 4.9,
    price: 0
  },
  {
    id: "complejo-wari",
    name: "Complejo Arqueológico Wari",
    description: "Antigua capital del primer imperio andino, con impresionantes construcciones de piedra.",
    image: "https://images.unsplash.com/photo-1526392060635-9d60198d3de3?q=80&w=2000&auto=format&fit=crop",
    category: "Arqueología",
    rating: 4.8,
    price: 15
  },
  {
    id: "pampa-ayacucho",
    name: "Pampa de Ayacucho (Quinua)",
    description: "Santuario histórico donde se libró la Batalla de Ayacucho que selló la independencia.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
    category: "Historia",
    rating: 4.9,
    price: 0
  },
  {
    id: "aguas-turquesas",
    name: "Aguas Turquesas de Millpu",
    description: "Piscinas naturales de color turquesa escondidas entre los cañones de Circamarca.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
    category: "Naturaleza",
    rating: 5.0,
    price: 50
  }
];

export const GASTRONOMY = [
  {
    id: "puca-picante",
    name: "Puca Picante",
    description: "Guiso tradicional a base de papa, maní tostado, betarraga y chicharrón de cerdo.",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=2000&auto=format&fit=crop",
    price: 25
  },
  {
    id: "cuy-chactado",
    name: "Cuy Chactado Ayacuchano",
    description: "Cuy frito bajo una piedra, acompañado de papas doradas y sarsa criolla.",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=2000&auto=format&fit=crop",
    price: 45
  },
  {
    id: "muyuchi",
    name: "Helado Muyuchi",
    description: "Helado artesanal a base de leche, ajonjolí, coco y canela, típico de la Plaza.",
    image: "https://images.unsplash.com/photo-1563805042-7684c8a9e1cb?q=80&w=2000&auto=format&fit=crop",
    price: 5
  }
];

export const TOURS = [
  {
    id: "tour-imperial",
    name: "Ruta Imperial Wari & Quinua",
    description: "Explora la capital del primer imperio andino y la histórica Pampa de Ayacucho.",
    image: "https://images.unsplash.com/photo-1526392060635-9d60198d3de3?q=80&w=2000&auto=format&fit=crop",
    price: 85,
    duration: "Full Day (8 horas)",
    includes: ["Transporte privado", "Guía oficial", "Almuerzo típico", "Tickets de ingreso"],
  },
  {
    id: "tour-millpu",
    name: "Aventura en Aguas Turquesas",
    description: "Caminata por el impresionante cañón de Circamarca hasta llegar a las piscinas naturales.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
    price: 120,
    duration: "Full Day (10 horas)",
    includes: ["Transporte ida y vuelta", "Guía de aventura", "Box lunch", "Botiquín 1ros auxilios"],
  },
  {
    id: "tour-ciudad",
    name: "City Tour Colonial",
    description: "Recorrido por las principales iglesias, casonas coloniales y talleres de artesanía.",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2000&auto=format&fit=crop",
    price: 45,
    duration: "Half Day (4 horas)",
    includes: ["Transporte turístico", "Guía especializado", "Degustación de Muyuchi"],
  }
];

export const CULTURE_ITEMS = [
  {
    id: "semana-santa",
    title: "Semana Santa",
    description: "La segunda Semana Santa más importante del mundo. Diez días de fervor, procesiones majestuosas y alfombras florales en toda la ciudad.",
    image: "https://images.unsplash.com/photo-1544027984-754641fe03f9?q=80&w=2000&auto=format&fit=crop",
    category: "Festividad"
  },
  {
    id: "retablos",
    title: "Retablos Ayacuchanos",
    description: "Cajas mágicas de madera que cuentan historias a través de cientos de figuras en miniatura modeladas en pasta de papa.",
    image: "https://images.unsplash.com/photo-1605335133612-9c59573887d1?q=80&w=2000&auto=format&fit=crop",
    category: "Artesanía"
  },
  {
    id: "carnavales",
    title: "Carnavales",
    description: "Tres días de música, danza y color donde las comparsas toman las calles cantando en quechua y español.",
    image: "https://images.unsplash.com/photo-1561578330-802c31e9c2ec?q=80&w=2000&auto=format&fit=crop",
    category: "Festividad"
  },
  {
    id: "ceramica-quinua",
    title: "Cerámica de Quinua",
    description: "Iglesias de barro que protegen los techos de las casas, músicos y toritos moldeados por artesanos de Quinua.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2000&auto=format&fit=crop",
    category: "Artesanía"
  }
];
