import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Image as ImageIcon, CheckCircle, AlertCircle, Files, Star, Heart, CloudUpload, X, Gift, Sparkles } from 'lucide-react';
import { uploadImage, bulkUploadImages } from '../../services/api';

interface AdminUploadProps {
  token: string;
  onLogout: () => void;
}

export function AdminUpload({ token, onLogout }: AdminUploadProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [page, setPage] = useState('gallery');
  const [category, setCategory] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;
    if (files.length === 1 && !title) return;

    setStatus('uploading');
    setErrorMessage('');

    try {
      if (files.length > 1) {
        // Bulk Upload
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('page', page);
        if (category) formData.append('category', category);
        formData.append('is_favorite', String(isFavorite));
        formData.append('is_special', String(isSpecial));
        
        files.forEach(file => {
          formData.append('files', file);
        });
        await bulkUploadImages(formData, token);
      } else {
        // Single Upload
        const formData = new FormData();
        formData.append('title', title);
        if (description) formData.append('description', description);
        formData.append('page', page);
        if (category) formData.append('category', category);
        formData.append('is_favorite', String(isFavorite));
        formData.append('is_special', String(isSpecial));
        formData.append('file', files[0]);
        await uploadImage(formData, token);
      }

      setStatus('success');
      setTitle('');
      setDescription('');
      setCategory('');
      setIsFavorite(false);
      setIsSpecial(false);
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err: any) {
      console.error(err);
      if (err.message === 'Unauthorized') {
        onLogout();
        return;
      }
      setStatus('error');
      setErrorMessage(`Failed to upload. Please try again.`);
    }
  };

  return (
    <div className="container-fluid min-h-screen py-20 flex flex-col items-center justify-center font-sans relative z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl glass-morphism rounded-[3.5rem] shadow-2xl p-8 md:p-16 relative overflow-hidden border border-white/60"
      >
        {/* Background Decorative Heart */}
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] -translate-y-10 translate-x-10">
            <Heart size={300} />
        </div>

        <div className="flex justify-between items-center mb-12 relative z-10">
          <div>
            <h1 className="heading-fluid-3xl font-bold text-gray-800">Memory Manager</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-300 mt-2">Uploading Beauty</p>
          </div>
          <button 
             onClick={onLogout} 
             className="p-4 rounded-2xl bg-gray-50 text-rose-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm flex items-center gap-2 font-black uppercase text-[10px] tracking-widest"
          >
             <X size={16} /> Exit
          </button>
        </div>

        <form onSubmit={handleUpload} className="space-y-10 relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-rose-300 ml-4">
                {files.length > 1 ? 'Common Title' : 'Memory Title *'}
              </label>
              <input 
                type="text" 
                required={files.length === 1}
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Give it a beautiful name..."
                className="w-full px-8 py-5 rounded-[2rem] bg-gray-50/50 border-2 border-transparent focus:border-rose-100 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-50 transition-all font-bold text-gray-700" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-rose-300 ml-4">Target Display</label>
              <select 
                value={page}
                onChange={e => setPage(e.target.value)}
                className="w-full px-8 py-5 rounded-[2rem] bg-gray-50/50 border-2 border-transparent focus:border-rose-100 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-50 transition-all font-bold text-gray-700 appearance-none"
              >
                <option value="gallery">Gallery Only</option>
                <option value="home">Home Featured</option>
                <option value="timeline">Timeline History</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-rose-300 ml-4">The Story Behind</label>
            <textarea 
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Tell the story of these moments..."
              className="w-full px-8 py-5 rounded-[2.5rem] bg-gray-50/50 border-2 border-transparent focus:border-rose-100 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-50 transition-all font-bold text-gray-700 min-h-[120px] resize-none" 
            />
          </div>

          <div className="grid md:grid-cols-2 gap-10">
             <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-rose-300 ml-4 mb-4 block">Classify As</label>
                <div className="flex flex-col gap-4">
                    {[
                      { id: 'Gifted from Him', icon: Gift, label: 'Gifted From Him' },
                      { id: 'Make my day', icon: Sparkles, label: 'Make My Day' },
                      { id: 'Good Memories of my life', icon: ImageIcon, label: 'Shared Memories' }
                    ].map(opt => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setCategory(category === opt.id ? '' : opt.id)}
                          className={`flex items-center gap-4 px-6 py-4 rounded-[1.5rem] border-2 transition-all font-bold text-sm ${
                            category === opt.id 
                            ? 'bg-rose-500 border-rose-500 text-white shadow-lg' 
                            : 'bg-white border-rose-50 text-gray-400 hover:border-rose-200'
                          }`}
                        >
                          <opt.icon size={18} />
                          {opt.label}
                        </button>
                    ))}
                </div>
             </div>

             <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-rose-300 ml-4 mb-4 block">Attributes</label>
                <div className="flex flex-col gap-4">
                   <button
                        type="button"
                        onClick={() => setIsFavorite(!isFavorite)}
                        className={`flex items-center gap-4 px-6 py-4 rounded-[1.5rem] border-2 transition-all font-bold text-sm ${
                        isFavorite 
                            ? 'bg-pink-100 border-pink-100 text-pink-600 shadow-sm' 
                            : 'bg-white border-rose-50 text-gray-300 hover:border-rose-100'
                        }`}
                    >
                        <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                        Favorite Memory
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsSpecial(!isSpecial)}
                        className={`flex items-center gap-4 px-6 py-4 rounded-[1.5rem] border-2 transition-all font-bold text-sm ${
                        isSpecial 
                            ? 'bg-amber-100 border-amber-100 text-amber-600 shadow-sm' 
                            : 'bg-white border-rose-50 text-gray-300 hover:border-rose-100'
                        }`}
                    >
                        <Star size={18} fill={isSpecial ? "currentColor" : "none"} />
                        Special Highlight
                    </button>
                </div>
             </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-rose-300 ml-4">Digital Files</label>
            <div className="group relative">
                <input 
                    type="file" ref={fileInputRef} required multiple accept="image/*"
                    onChange={e => setFiles(Array.from(e.target.files || []))}
                    className="hidden" id="file-upload"
                />
                <label 
                  htmlFor="file-upload" 
                  className="cursor-pointer border-2 border-dashed border-rose-100 rounded-[3rem] p-12 flex flex-col items-center justify-center bg-gray-50/30 group-hover:bg-rose-50/50 group-hover:border-rose-300 transition-all duration-500"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="p-6 bg-white rounded-full shadow-xl mb-6 text-rose-500"
                  >
                    <CloudUpload size={48} />
                  </motion.div>
                  <span className="text-gray-700 font-black uppercase text-xs tracking-widest">
                    {files.length > 0 ? `${files.length} Files Prepared` : 'Choose Memories'}
                  </span>
                </label>
            </div>
          </div>

          <AnimatePresence>
            {status === 'success' && (
               <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-emerald-600 bg-emerald-50 p-6 rounded-[2rem] flex items-center justify-center gap-4 font-bold border border-emerald-100"
                >
                 <CheckCircle size={24} /> Upload Successful! Moments Saved.
               </motion.div>
            )}
            {status === 'error' && (
               <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-rose-600 bg-rose-50 p-6 rounded-[2rem] flex items-center justify-center gap-4 font-bold border border-rose-100"
                >
                 <AlertCircle size={24} /> {errorMessage}
               </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(219,39,119,0.25)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={status === 'uploading' || files.length === 0 || (files.length === 1 && !title)}
            className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-rose-600 text-white font-black uppercase text-xs tracking-[0.4em] py-8 rounded-[3rem] shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {status === 'uploading' ? 'Syncing with Server...' : 'Confirm Upload'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
