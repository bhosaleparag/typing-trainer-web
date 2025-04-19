import React from 'react';
import { motion } from 'framer-motion';

const TIPS = [
  {
    id: 1,
    title: "Proper Posture",
    description: "Sit up straight with your feet flat on the floor. Keep your elbows bent at a 90-degree angle.",
    icon: "🧘"
  },
  {
    id: 2,
    title: "Home Row Position",
    description: "Keep your fingers on the home row keys (ASDF for left hand, JKL; for right hand).",
    icon: "⌨️"
  },
  {
    id: 3,
    title: "Regular Practice",
    description: "Practice for at least 15-20 minutes daily to build muscle memory and improve speed.",
    icon: "⏱️"
  },
  {
    id: 4,
    title: "Look at the Screen",
    description: "Focus on the screen, not your keyboard. This helps improve accuracy and speed.",
    icon: "👀"
  },
  {
    id: 5,
    title: "Take Breaks",
    description: "Take regular breaks to prevent strain and maintain focus.",
    icon: "☕"
  }
];

const Tips = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Typing Tips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TIPS.map((tip, index) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="text-4xl mb-4">{tip.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
            <p className="text-gray-600">{tip.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tips;
