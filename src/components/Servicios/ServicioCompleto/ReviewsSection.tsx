import { Star } from 'lucide-react';

// Componente de Reseñas separado
interface Review {
  name: string;
  date: string;
  avatar: string;
  comment: string;
  rating: number;
}

interface ReviewsSectionProps {
  reviewsData?: Review[];
}

const ReviewsSection = ({ reviewsData }: ReviewsSectionProps) => {
  // Usar datos reales si existen, si no usar datos por defecto
  const reviews = reviewsData && reviewsData.length > 0 ? reviewsData : [
    {
      name: "Estela Martínez Alcalá",
      date: "15/03/2025",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face",
      comment: "¡Increíble experiencia! El maquillaje duró toda la noche y recibí muchísimos cumplidos. Definitivamente volveré para mi próximo evento.",
      rating: 5
    },
    {
      name: "María Gabriela Tovar", 
      date: "09/05/2024",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      comment: "¡Increíble experiencia! El maquillaje duró toda la noche y recibí muchísimos cumplidos. Definitivamente volveré para mi próximo evento.",
      rating: 5
    },
    {
      name: "Alma Espinoza García",
      date: "18/06/2024",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c619e39e?w=60&h=60&fit=crop&crop=face",
      comment: "¡Increíble experiencia! El maquillaje duró toda la noche y recibí muchísimos cumplidos. Definitivamente volveré para mi próximo evento.",
      rating: 5
    }
  ];

  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-gray-900">Anonimo</h4>
            </div>
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`w-4 h-4 ${star <= (review.rating || 5) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
              ))}
              <span className="text-sm text-gray-500 ml-2">{review.date}</span>
            </div>
            <p className="text-gray-700 leading-relaxed">"{review.comment}"</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsSection;