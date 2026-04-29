"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewSectionProps {
  itemId: string;
}

export function ReviewSection({ itemId }: ReviewSectionProps) {
  const user = useStore((state) => state.user);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      userName: "Carlos Mendoza",
      userAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      rating: 5,
      comment: "¡Una experiencia increíble! El lugar es mágico y la atención fue de primera. Totalmente recomendado para quienes visitan Ayacucho.",
      date: "Hace 2 semanas"
    },
    {
      id: "2",
      userName: "Ana Sofía",
      userAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      rating: 4,
      comment: "Muy bonito, aunque el clima no ayudó mucho ese día. Igual disfrutamos muchísimo del recorrido.",
      date: "Hace 1 mes"
    }
  ]);

  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || newRating === 0 || !comment.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      userName: user.name,
      userAvatar: user.avatar || "https://github.com/shadcn.png",
      rating: newRating,
      comment,
      date: "Justo ahora"
    };

    setReviews([newReview, ...reviews]);
    setNewRating(0);
    setComment("");
  };

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-white">
        Reseñas de Viajeros ({reviews.length})
      </h3>

      {/* Formulario de Reseñas */}
      {user ? (
        <form onSubmit={handleSubmit} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800">
              <img src={user.avatar || "https://github.com/shadcn.png"} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{user.name}</p>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star 
                      className={`w-5 h-5 transition-colors ${
                        star <= (hoverRating || newRating) 
                          ? "fill-yellow-500 text-yellow-500" 
                          : "text-zinc-600"
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="relative">
            <textarea
              placeholder="Comparte tu experiencia con otros viajeros..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-black/50 border border-zinc-800 rounded-xl p-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary min-h-[100px] resize-none"
            />
            <Button 
              type="submit" 
              disabled={newRating === 0 || !comment.trim()}
              className="absolute bottom-3 right-3 rounded-lg"
            >
              Publicar <Send className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      ) : (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
          <p className="text-zinc-300 mb-4">Inicia sesión para dejar una reseña.</p>
          <Button asChild>
            <a href="/login">Iniciar Sesión</a>
          </Button>
        </div>
      )}

      {/* Lista de Reseñas */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-zinc-800/50 pb-6 last:border-0">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800">
                  <img src={review.userAvatar} alt={review.userName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{review.userName}</h4>
                  <p className="text-xs text-zinc-500">{review.date}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-zinc-800"}`} 
                  />
                ))}
              </div>
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
