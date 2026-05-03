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

  return (
    <div className="w-full bg-[#EB3461] text-white overflow-hidden py-3 md:py-3.5">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {[...messages, ...messages, ...messages].map((msg, idx) => (
          <span
            key={idx}
            className="text-[10px] md:text-xs font-black uppercase tracking-widest flex-shrink-0"
          >
            {msg}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default AnnouncementBar;
