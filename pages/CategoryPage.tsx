
import React from 'react';
import { MOCK_PHOTOS } from '../constants';
import PhotoCard from '../components/PhotoCard';
import { MapPin } from 'lucide-react';

interface CategoryPageProps {
  title: string;
  category: string;
  showGeo?: boolean;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ title, category, showGeo }) => {
  const filteredPhotos = MOCK_PHOTOS.filter(p => p.category === category || p.category === 'Trending');

  return (
    <div className="space-y-8">
      <div className="relative h-48 rounded-3xl overflow-hidden mb-8">
        <img 
          src={`https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80`}
          className="w-full h-full object-cover"
          alt={title}
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8">
          <h1 className="text-4xl font-bold text-white">{title}</h1>
          <p className="text-white/80 mt-2">Authentic {title.toLowerCase()} from the heart of the region.</p>
        </div>
      </div>

      {showGeo && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-full">
            <MapPin className="text-red-600" size={18} />
          </div>
          <div>
            <span className="font-bold text-red-900 block text-sm">Nearby Content</span>
            <span className="text-xs text-red-700">Allow location access to see photos from your current city.</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhotos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} showGeo={showGeo} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
