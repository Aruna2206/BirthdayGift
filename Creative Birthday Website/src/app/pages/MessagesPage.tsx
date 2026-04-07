import { motion } from 'motion/react';
import { Heart, Mail, Sparkles } from 'lucide-react';

export function MessagesPage() {
  const messages = [
    {
      title: 'My Dearest One',
      message: 'I give one, ok? I say to you always how important you are to me and how I am attached and love you. I don\'t know why I need you or love you, but one thing is for sure: without you, I am not.',
      date: 'Forever & Always',
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'To My Soulmate',
      message: 'Hi my soul, I promise on your big day and our big day, for every year, I promise I will always be with you and live with you forever, ok?',
      date: 'With All My Heart',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Happy Birthday Baby',
      message: 'Happy birthday to you mama! Stay happy and healthy forever with me only, ok?',
      date: 'Your Birthday 🎂',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Our Anniversary',
      message: 'One fine day is this. I start with a cry to say I am with you now, but though there have been some cries, I know you will make me one day fully happy. My second part of life is my destiny, I believe. Thank you.',
      date: 'Celebrating Us 💕',
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Just Because',
      message: 'I don\'t need a special occasion to tell you how much I love you. You are my today and all of my tomorrows. Thank you for being my partner in everything.',
      date: 'Every Single Day',
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Forever Yours',
      message: 'Somebody said it is good but hard, but for me, it makes it hard and more emotional to try to survive. You take care of me well, and we both have some responsibilities to make things good. After all I finish, one fine day I will come to be with you.',
      date: 'Until The End of Time',
      color: 'from-pink-600 to-purple-600'
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Mail className="text-pink-500" size={48} />
          <h2 className="text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Love Letters
          </h2>
        </div>
        <p className="text-2xl text-gray-600">
          Messages from my heart to yours 💌
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 1 : -1 }}
            className="relative"
          >
            <div className={`absolute -top-3 -right-3 bg-gradient-to-br ${msg.color} p-4 rounded-full shadow-lg`}>
              <Heart size={24} fill="white" className="text-white" />
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-pink-100">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-yellow-500" size={24} />
                <h3 className={`text-3xl font-bold bg-gradient-to-r ${msg.color} bg-clip-text text-transparent`}>
                  {msg.title}
                </h3>
              </div>

              <p className="text-gray-700 leading-relaxed text-lg mb-6 min-h-[120px]">
                {msg.message}
              </p>

              <div className="flex justify-between items-center pt-4 border-t-2 border-pink-100">
                <p className="text-sm text-gray-500 italic">{msg.date}</p>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                    >
                      <Heart size={16} fill="currentColor" className="text-pink-400" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
