import { motion, AnimatePresence } from 'motion/react';
import { Heart, Search, Camera, Filter, Grid3x3, LayoutGrid, Music, Star, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../services/config';
import { fetchImagesByPage, Photo, fetchFavorites, fetchSpecialMemories } from '../../services/api';

export function GalleryPage() {
  const [viewMode, setViewMode] = useState<'masonry' | 'grid'>('masonry');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'favorites' | 'special'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      try {
        let data: Photo[] = [];
        if (activeFilter === 'all') {
          data = await fetchImagesByPage('gallery');
        } else if (activeFilter === 'favorites') {
          data = await fetchFavorites();
        } else if (activeFilter === 'special') {
          data = await fetchSpecialMemories();
        }
        setPhotos(data);
      } catch (err) {
        console.error('Failed to load gallery photos', err);
      } finally {
        setLoading(false);
      }
    };
    loadPhotos();
  }, [activeFilter]);

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = !searchQuery ||
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (photo.description && photo.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 relative overflow-hidden pb-12">
      {/* Background Animated Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`music-${i}`}
            className="absolute text-pink-300/20"
            initial={{ x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000, rotate: 0 }}
            animate={{
              y: -150,
              x: `calc(${Math.random() * 100}vw + ${Math.sin(i) * 100}px)`,
              rotate: [0, 180, 360],
            }}
            transition={{ duration: Math.random() * 15 + 15, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
          >
            <Music size={Math.random() * 30 + 15} fill="currentColor" />
          </motion.div>
        ))}
        {/* Giant glowing background heart */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 z-0"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart size={800} fill="currentColor" className="text-pink-200" />
        </motion.div>
      </div>

      <div className="container-fluid py-20 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 relative"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-10"
          >
            <Camera className="text-pink-500" size={64} />
          </motion.div>

          <h1 className="heading-fluid-mega font-bold mb-6 bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text text-transparent drop-shadow-sm tracking-tight">
            Our Love Gallery 📸
          </h1>
          <p className="text-fluid-xl text-pink-900/80 mb-12 font-medium italic">
            "A collection of {photos.length} beautiful moments we've shared together..."
          </p>

          {/* Controls */}
          <div className="flex flex-col md:flex-row items-center gap-6 bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/50">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by description or title..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-pink-100 hover:border-pink-200 focus:border-pink-500 focus:outline-none bg-white/80 transition-colors text-pink-900 font-medium placeholder:text-pink-300"
              />
            </div>

            <div className="flex items-center gap-2 p-1 bg-pink-50/50 rounded-2xl border border-pink-100">
              {[
                { id: 'all', label: 'All Photos', icon: LayoutGrid },
                //  { id: 'favorites', label: 'Favorites', icon: Heart },
                //  { id: 'special', label: 'Special', icon: Star }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeFilter === tab.id
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                      : 'text-pink-400 hover:text-pink-600 hover:bg-pink-100/50'
                    }`}
                >
                  <tab.icon size={18} fill={activeFilter === tab.id ? "currentColor" : "none"} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex gap-2 bg-white/80 rounded-2xl p-1 shadow-sm border border-pink-50">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('masonry')}
                className={`p-3 rounded-lg transition-colors ${viewMode === 'masonry' ? 'bg-pink-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <LayoutGrid size={20} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-pink-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Grid3x3 size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Photo Grid */}
        {loading ? (
          <div className="text-center py-20 text-pink-500 text-2xl animate-pulse">Loading amazing memories...</div>
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center py-20 text-pink-500 text-xl">No photos found matching your description!</div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-8">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: Math.min(index * 0.05, 0.5) }}
                onClick={() => setSelectedPhoto(photo)}
                className="relative cursor-pointer"
              >
                <div className="glass-morphism p-4 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-700 group/card relative border border-white/60">
                  <div className="aspect-square rounded-[2rem] overflow-hidden relative bg-gray-50">
                    <ImageWithFallback
                      src={`${API_BASE_URL}${photo.url}`}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                    />

                    {/* Status Badges */}
                    <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
                      {photo.is_favorite && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg text-rose-500">
                          <Heart size={16} fill="currentColor" />
                        </motion.div>
                      )}
                      {(photo.is_special || photo.category) && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg text-amber-500">
                          <Star size={16} fill="currentColor" />
                        </motion.div>
                      )}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-pink-500/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col items-center justify-center">
                      <Heart className="text-white drop-shadow-md scale-0 group-hover/card:scale-100 transition-transform duration-300 delay-100" size={40} fill="currentColor" />
                    </div>
                  </div>
                  <div className="mt-5 text-center px-3 pb-2">
                    <p className="text-pink-600 font-bold text-fluid-base truncate group-hover/card:text-rose-500 transition-colors uppercase tracking-[0.1em]">{photo.title}</p>
                    {photo.category && (
                      <span className="inline-block mt-2 px-3 py-1 bg-rose-50/50 text-rose-300 text-[0.65rem] font-black rounded-full uppercase tracking-[0.2em] border border-rose-100/50">
                        {photo.category}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-10 space-y-10">
            {filteredPhotos.map((photo, index) => {
              const heights = ['aspect-square', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[2/3]'];
              return (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: Math.min(index * 0.05, 0.5) }}
                  onClick={() => setSelectedPhoto(photo)}
                  className="relative cursor-pointer break-inside-avoid"
                >
                  <div className="glass-morphism p-4 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-700 group/card relative border border-white/60">
                    <div className={`${heights[index % heights.length]} rounded-[2rem] overflow-hidden relative bg-gray-50`}>
                      <ImageWithFallback
                        src={`${API_BASE_URL}${photo.url}`}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                      />

                      {/* Status Badges */}
                      <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
                        {photo.is_favorite && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg text-rose-500">
                            <Heart size={16} fill="currentColor" />
                          </motion.div>
                        )}
                        {(photo.is_special || photo.category) && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg text-amber-500">
                            <Star size={16} fill="currentColor" />
                          </motion.div>
                        )}
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col items-center justify-center">
                        <Heart className="text-white drop-shadow-md scale-0 group-hover/card:scale-100 transition-transform duration-300 delay-100" size={48} fill="currentColor" />
                      </div>
                    </div>
                    <div className="mt-4 text-center px-2">
                      <p className="text-pink-600 font-bold text-lg truncate">{photo.title}</p>
                      {photo.description && (
                        <p className="text-pink-400/80 text-xs font-medium line-clamp-1 mt-1">{photo.description}</p>
                      )}
                      {photo.category && (
                        <span className="inline-block mt-2 px-2 py-0.5 bg-pink-100 text-pink-500 text-[10px] font-bold rounded-full uppercase tracking-wider">
                          {photo.category}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            {photos.length} Memories Loaded! 💕
          </motion.button>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 backdrop-blur-3xl bg-[#1a050d]/95"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Background elements in modal */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
              >
                <Heart size={800} fill="#ffffff" />
              </motion.div>
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-[#120308]/60 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden border border-pink-500/30 shadow-[0_0_100px_-20px_rgba(236,72,153,0.4)] flex flex-col md:flex-row"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-pink-500/20 text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/10"
              >
                <X size={20} />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 h-[35vh] md:h-[65vh] flex items-center justify-center bg-black/40 p-4 relative group">
                <img
                  src={`${API_BASE_URL}${selectedPhoto.url}`}
                  alt={selectedPhoto.title}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl transition-transform duration-500"
                />
              </div>

              {/* Info Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#fffafa] relative overflow-hidden">
                {/* Decorative backgrounds */}
                <div className="absolute -bottom-12 -right-12 opacity-[0.04] pointer-events-none">
                  <Heart size={300} fill="#ec4899" />
                </div>

                <div className="relative z-10 w-full text-center md:text-left">
                  <div className="flex flex-col gap-3 mb-6 items-center md:items-start">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-pink-50 w-fit p-2.5 rounded-2xl text-pink-500 shadow-sm"
                    >
                      <Heart size={20} fill="currentColor" />
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-br from-pink-600 via-rose-600 to-indigo-600 bg-clip-text text-transparent leading-[1.2] tracking-tight">
                      {selectedPhoto.title}
                    </h2>
                  </div>

                  {selectedPhoto.category && (
                    <div className="mb-6">
                      <span className="px-4 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-black rounded-full uppercase tracking-[0.2em] shadow-md">
                        {selectedPhoto.category}
                      </span>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="relative">
                      <span className="absolute -left-3 -top-3 text-5xl text-pink-100 font-serif opacity-60">"</span>
                      <p className="text-gray-600 text-lg font-medium leading-relaxed italic">
                        {selectedPhoto.description || 'Creating a beautiful story together, one special moment at a time.'}
                      </p>
                      <span className="absolute -right-1 -bottom-2 text-5xl text-pink-100 font-serif opacity-60">"</span>
                    </div>

                    <div className="h-1 w-20 bg-gradient-to-r from-pink-400 to-transparent rounded-full mx-auto md:mx-0" />

                    <div className="flex items-center justify-center md:justify-start gap-8 pt-2">
                      <div className="flex flex-col items-center gap-2">
                        <div className={`p-3 rounded-2xl shadow-sm ${selectedPhoto.is_favorite ? 'bg-rose-50 text-rose-500' : 'bg-white text-gray-200'}`}>
                          <Heart size={28} fill={selectedPhoto.is_favorite ? "currentColor" : "none"} />
                        </div>
                        <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Loved</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className={`p-3 rounded-2xl shadow-sm ${selectedPhoto.is_special ? 'bg-amber-50 text-amber-500' : 'bg-white text-gray-200'}`}>
                          <Star size={28} fill={selectedPhoto.is_special ? "currentColor" : "none"} />
                        </div>
                        <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest">Special</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPhoto(null)}
                    className="mt-10 w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black rounded-2xl shadow-lg hover:shadow-xl transition-all uppercase tracking-widest text-sm"
                  >
                    Back to Gallery 💕
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
