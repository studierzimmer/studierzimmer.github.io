import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface CarouselItem {
  id: number;
  title: string;
  image: string;
}

interface CarouselViewProps {
  items: CarouselItem[];
  initialIndex: number;
  onClose: () => void;
}

export const CarouselView = ({ items, initialIndex, onClose }: CarouselViewProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isExiting, setIsExiting] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 500); // duration must match the CSS animation
  };

  const currentItem = items[currentIndex];

  return (
    <div className={`fixed inset-0 z-50 flex flex-col transition-all duration-500 ${isExiting ? "animate-fade-out" : "animate-fade-in"}`}>
      {/* Blurred Background Overlay */}
      <div 
        className="absolute inset-0 bg-white dark:bg-black/20 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Carousel Content */}
      <div className={`relative flex-1 flex items-center justify-center p-6 transition-transform duration-500 ${isExiting ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-10 p-3 rounded-none bg-alpha dark:bg-alpha text-gray-800 dark:text-gray-200 hover:bg-alpha dark:hover:bg-alpha transition-all duration-200 hover:scale-150 active:scale-150"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="absolute left-6 z-10 p-3 rounded-none bg-alpha dark:bg-alpha text-gray-800 dark:text-gray-200 hover:bg-alpha dark:hover:bg-alpha transition-all duration-200 hover:scale-150 active:scale-150"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Image Container */}
        <div className="max-w-8xl max-h-full flex flex-col items-center">
          <div className="relative mb-6">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="max-w-full max-h-[70vh] object-contain shadow-2xl rounded-lg transition-opacity duration-500"
            />
          </div>
          <h2 className="text-2xl font-regular text-gray-900 dark:text-white text-left mb-2">
            {currentItem.title}
          </h2>
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="absolute right-6 z-10 p-3 bg-alpha dark:bg-alpha text-gray-800 dark:text-gray-200 hover:bg-alpha dark:hover:bg-alpha transition-all duration-200 hover:scale-150 active:scale-150"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className={`relative p-6 bg-alpha dark:bg-alpha backdrop-blur-sm transition-all duration-500 ${isExiting ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}>
        <div className="flex justify-left space-x-2 overflow-y-hidden overflow-x-auto">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 overflow-hidden transition-all duration-200 ${
                index === currentIndex 
                  ? 'ring-2 ring-blue-500 scale-110' 
                  : 'opacity-90 hover:opacity-100'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};