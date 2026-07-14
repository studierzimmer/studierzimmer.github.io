
interface GridItemProps {
  title: string;
  image: string;
  onClick: () => void;
}

export const GridItem = ({ title, image, onClick }: GridItemProps) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer transform transition-all duration-200 hover-active:scale-110 hover:scale-110 hover:z-100"
    >
      <div className="bg-alpha dark:bg-alpha overflow-hidden transition-colors duration-200">
        {/* Image Area */}
        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              // Fallback to gradient background if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </div>
        
        {/* Title Area */}
        <div className="p-4">
          <h3 className="font-regular text-gray-900 dark:text-white text-left truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};
