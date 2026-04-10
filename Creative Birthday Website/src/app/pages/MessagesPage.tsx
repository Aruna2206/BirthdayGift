import { motion } from 'motion/react';
import { Heart, Mail, Sparkles, Send, Quote } from 'lucide-react';

export function MessagesPage() {
  const messages = [
    {
      title: 'My Dearest One',
      message: 'I give one, ok? I say to you always how important you are to me and how I am attached and love you. I don\'t know why I need you or love you, but one thing is for sure: without you, I am not.',
      date: 'Forever & Always',
      color: 'from-pink-400 to-rose-600'
    },
    {
      title: 'To My Soulmate',
      message: 'Hi my soul, I promise on your big day and our big day, for every year, I promise I will always be with you and live with you forever, ok?',
      date: 'With All My Heart',
      color: 'from-purple-400 to-pink-600'
    },
    {
      title: 'Happy Birthday Baby',
      message: 'Happy birthday to you mama! Stay happy and healthy forever with me only, ok?',
      date: 'Your Birthday 🎂',
      color: 'from-amber-400 to-orange-600'
    },
    {
      title: 'Our Anniversary',
      message: 'One fine day is this. I start with a cry to say I am with you now, but though there have been some cries, I know you will make me one day fully happy. My second part of life is my destiny, I believe. Thank you.',
      date: 'Celebrating Us 💕',
      color: 'from-rose-500 to-red-600'
    },
    {
      title: 'Just Because',
      message: 'I don\'t need a special occasion to tell you how much I love you. You are my today and all of my tomorrows. Thank you for being my partner in everything.',
      date: 'Every Single Day',
      color: 'from-sky-500 to-indigo-600'
    },
    {
      title: 'Forever Yours',
      message: 'Somebody said it is good but hard, but for me, it makes it hard and more emotional to try to survive. You take care of me well, and we both have some responsibilities to make things good. After all I finish, one fine day I will come to be with you.',
      date: 'Until The End of Time',
      color: 'from-pink-600 to-indigo-600'
    },
  ];

  return (
    <div className="min-h-screen bg-[#fffafa] relative overflow-hidden pb-40 font-sans">
      {/* Background Floaters */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-100"
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 10 + i, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%"
            }}
          >
            <Quote size={Math.random() * 30 + 30} className="opacity-10" />
          </motion.div>
        ))}
      </div>

      <div className="container-fluid py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 px-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-10"
          >
            <div className="p-6 bg-white rounded-3xl shadow-2xl glass-morphism border border-white/60">
              <Mail className="text-pink-500" size={56} />
            </div>
          </motion.div>

          <h2 className="heading-fluid-mega font-bold mb-6 bg-gradient-to-r from-gray-800 via-rose-600 to-gray-800 bg-clip-text text-transparent px-4 tracking-tight">
            Love Letters
          </h2>
          <p className="text-fluid-xl text-rose-800/30 font-medium italic tracking-widest max-w-2xl mx-auto">
            "Whispers of my heart, preserved forever..."
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.8 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative h-full"
            >
              <div className={`absolute -top-4 -right-4 z-20 bg-gradient-to-br ${msg.color} p-5 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                <Send size={24} className="text-white" />
              </div>

              <div className="glass-morphism h-full p-10 md:p-12 rounded-[3.5rem] shadow-2xl border border-white/60 hover:shadow-pink-100/50 transition-all duration-700 flex flex-col items-center text-center overflow-hidden">
                {/* Decorative Heart Background */}
                <div className="absolute top-0 left-0 p-12 opacity-[0.03] -translate-x-8 -translate-y-8 group-hover:translate-x-0 transition-transform duration-1000">
                  <Heart size={200} fill="currentColor" className="text-rose-500" />
                </div>

                <div className="relative z-10 w-full flex-1 flex flex-col">
                  <div className="inline-block p-4 rounded-full bg-rose-50/50 text-rose-500 mb-8 mx-auto">
                    <Heart size={28} fill="currentColor" />
                  </div>

                  <h3 className="text-fluid-2xl font-bold text-gray-800 mb-8 border-b border-rose-50 pb-6 tracking-tight">
                    {msg.title}
                  </h3>

                  <p className="text-fluid-base text-gray-500 leading-[1.8] mb-12 flex-1 italic font-medium">
                    "{msg.message}"
                  </p>

                  <div className="flex flex-col items-center gap-4 pt-6 mt-auto">
                    <div className="h-0.5 w-12 bg-rose-100/50" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-300">
                      {msg.date}
                    </p>

                    <div className="flex gap-2">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                        >
                          <Sparkles size={14} className="text-rose-200" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Polish */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-40 text-center"
        >
          <div className="h-0.5 w-60 mx-auto bg-gradient-to-r from-transparent via-rose-100 to-transparent mb-10" />
          <p className="text-rose-800/10 text-fluid-mega tracking-[0.6em] font-bold uppercase overflow-hidden whitespace-nowrap">Always You</p>
        </motion.div>
      </div>

      {/* Closing Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-40 text-center"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <Quote size={80} className="mx-auto text-rose-100 opacity-20" />
          <p className="font-romantic text-4xl text-rose-800/30 tracking-widest leading-relaxed italic">
            "And we have many more letters to write in the pages of our lives."
          </p>
        </div>
      </motion.div>
    </div>
  );
}
