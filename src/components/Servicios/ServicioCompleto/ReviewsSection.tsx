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