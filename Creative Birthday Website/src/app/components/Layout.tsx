import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, LogOut, Home, Image, Clock, MessageCircle, Gift, Sparkles, Menu, X } from 'lucide-react';

interface LayoutProps {
  onLogout: () => void;
}

export function Layout({ onLogout }: LayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/gallery', label: 'Gallery', icon: Image },
    { path: '/timeline', label: 'History', icon: Clock },
    { path: '/messages', label: 'Letters', icon: MessageCircle },
    { path: '/special', label: 'Specials', icon: Gift },
  ];

  return (
    <div className="min-h-screen bg-[#fffcfc] relative font-sans text-gray-800">
      {/* Header Container */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 py-4 md:py-6"
      >
        <div className="container-fluid">
          <div className="glass-morphism rounded-[2rem] md:rounded-[3rem] px-5 md:px-10 py-3 md:py-4 flex items-center justify-between gap-4 border border-white/60 shadow-2xl relative z-50">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 md:gap-4 flex-shrink-0 group">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="bg-gradient-to-br from-pink-500 to-rose-600 p-2.5 md:p-3 rounded-2xl shadow-lg relative"
              >
                <Heart className="text-white relative z-10" size={24} fill="currentColor" />
                <div className="absolute inset-0 bg-white/20 blur-md rounded-full animate-pulse" />
              </motion.div>
              <h1 className="text-fluid-xl font-bold bg-gradient-to-r from-gray-800 to-rose-600 bg-clip-text text-transparent hidden sm:block tracking-tight">
                Our Story
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5 p-1.5 bg-rose-50/30 rounded-full border border-rose-100/30">
              {navItems.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Link key={path} to={path}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${isActive ? 'text-white' : 'text-gray-400 hover:text-rose-600'
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavTab"
                          className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full shadow-lg z-0"
                          transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                        />
                      )}
                      <div className="relative z-10 flex items-center gap-2">
                        <Icon size={14} strokeWidth={2.5} />
                        <span>{label}</span>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 md:gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="flex items-center gap-2.5 bg-rose-50/50 text-rose-500 px-5 md:px-7 py-2.5 md:py-3.5 rounded-2xl md:rounded-3xl border border-rose-100 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-rose-500 hover:text-white transition-all duration-500 shadow-sm"
              >
                <LogOut size={16} strokeWidth={3} />
                <span className="hidden md:inline">Exit</span>
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 rounded-2xl bg-gray-50 text-gray-800 border border-gray-100 shadow-sm"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 w-full px-4 mt-2 lg:hidden"
            >
              <div className="glass-morphism rounded-[2.5rem] p-6 shadow-3xl border border-white/60 overflow-hidden relative">
                <div className="absolute -top-10 -right-10 opacity-[0.05] pointer-events-none">
                  <Heart size={200} />
                </div>

                <div className="grid gap-3 relative z-10">
                  {navItems.map(({ path, label, icon: Icon }) => {
                    const isActive = location.pathname === path;
                    return (
                      <Link key={path} to={path}>
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center gap-4 p-5 rounded-[1.5rem] transition-all duration-300 ${isActive
                            ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-xl'
                            : 'bg-white/50 text-gray-500 border border-gray-100 hover:bg-rose-50'
                            }`}
                        >
                          <Icon size={20} />
                          <span className="font-semibold text-sm uppercase tracking-[0.2em]">{label}</span>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main content - Adjusted for fixed header height */}
      <main className="relative z-10 ">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistence Decor */}
      <div className="fixed bottom-10 right-10 z-0 pointer-events-none hidden lg:block overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="text-rose-200"
        >
          <Sparkles size={300} strokeWidth={0.5} />
        </motion.div>
      </div>
    </div>
  );
}
