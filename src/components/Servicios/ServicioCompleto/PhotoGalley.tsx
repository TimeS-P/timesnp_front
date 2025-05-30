interface PhotoGalleryProps {
  images: string[];
}

const PhotoGallery = ({ images }: PhotoGalleryProps) => {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-3 gap-2">
        {images.slice(0, 5).map((image, index) => (
          <div key={index} className="relative aspect-square">
            <img
              src={image}
              alt={`Trabajo ${index + 1}`}
              className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            />
          </div>
        ))}
        {images.length > 5 && (
          <div className="relative aspect-square bg-gray-900 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
            <span className="text-white font-bold text-2xl">+{images.length - 5}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;