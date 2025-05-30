import React, { useState } from 'react';

// Interfaces
interface ResenaFormData {
  calificacion: number;
  comentario: string;
  reportarServicio: boolean;
}

interface ResenaFormProps {
  contratacionId: string;
  onClose: () => void;
  onSubmit: (data: ResenaFormData) => void;
}

// Componente de estrellas
const StarRating: React.FC<{
  rating: number;
  onRatingChange: (rating: number) => void;
  readonly?: boolean;
}> = ({ rating, onRatingChange, readonly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          className={`text-2xl transition-colors ${
            star <= (hoverRating || rating)
              ? 'text-yellow-400'
              : 'text-gray-300'
          } ${!readonly ? 'hover:text-yellow-300 cursor-pointer' : 'cursor-default'}`}
          onClick={() => !readonly && onRatingChange(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

// Componente principal del formulario de reseña
const ResenaForm: React.FC<ResenaFormProps> = ({ 
  contratacionId, 
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState<ResenaFormData>({
    calificacion: 0,
    comentario: '',
    reportarServicio: false
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.calificacion === 0) {
      alert('Por favor selecciona una calificación');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error al enviar reseña:', error);
      alert('Error al enviar la reseña. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, calificacion: rating });
  };

  const handleComentarioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, comentario: e.target.value });
  };

  const handleReportarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, reportarServicio: e.target.checked });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Hacer Reseña
          </h3>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <div className="text-sm text-gray-600">
            <strong>Contratación:</strong> {contratacionId.slice(0, 8)}...
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calificación <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <StarRating
                rating={formData.calificacion}
                onRatingChange={handleRatingChange}
              />
              <span className="text-sm text-gray-500 ml-2">
                {formData.calificacion > 0 && `(${formData.calificacion}/5)`}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comentario
            </label>
            <textarea
              value={formData.comentario}
              onChange={handleComentarioChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
              rows={4}
              placeholder="Comparte tu experiencia con este servicio..."
              maxLength={500}
            />
            <div className="text-xs text-gray-500 mt-1">
              {formData.comentario.length}/500 caracteres
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="reportar"
                checked={formData.reportarServicio}
                onChange={handleReportarChange}
                disabled={loading}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded disabled:cursor-not-allowed"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="reportar" className="text-sm text-red-600 font-medium">
                Reportar problema con el servicio
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Marca esta opción si hubo algún problema con el servicio recibido
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || formData.calificacion === 0}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <span>⭐</span>
                  Enviar Reseña
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResenaForm;
export type { ResenaFormData };