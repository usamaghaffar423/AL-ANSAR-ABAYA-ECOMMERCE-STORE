import React from 'react';
import { motion } from 'framer-motion';

const AnnouncementBar = () => {
  const messages = [
    'STYLE',
    'PESHAWAR SWAG',
    'APNI GAME UP KAR',
    'NEW ARRIVALS',
    'DESI DRIP',
    'FRESH FITS ONLY',
    'MARDAN TO HINGORA',
    'CLASSYFITTERS',
    'KPK KA STYLE',
    'PESHAWAR',
  ];

  // Duplicate messages for seamless loop
  const extendedMessages = [...messages, ...messages];

  return (
    <div className="bg-[#EB3461] text-white overflow-hidden py-2.5 md:py-3 font-['Outfit']">
      <motion.div
        className="flex gap-8 md:gap-12 whitespace-nowrap"
        animate={{ x: [0, -1920] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {extendedMessages.map((msg, idx) => (
          <span
            key={idx}
            className="text-[10px] md:text-[11px] font-black uppercase tracking-widest flex-shrink-0"
          >
            {msg}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default AnnouncementBar;
