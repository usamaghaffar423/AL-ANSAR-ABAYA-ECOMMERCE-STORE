import React from 'react';

const AnnouncementBar = () => {
  const messages = [
    'CLASSYFITTERS',
    '✦',
    'KPK KA STYLE',
    '✦',
    'PESHAWAR SWAG',
    '✦',
    'APNI GAME UP KAR',
    '✦',
    'NEW ARRIVALS',
    '✦',
    'DESI DRIP',
    '✦',
    'FRESH FITS ONLY',
    '✦',
    'MARDAN TO MINGORA',
    '✦',
  ];

  return (
    <div className="bg-[#EB3461] py-0.5">
      <div className="overflow-hidden whitespace-nowrap py-3">
        <div className="inline-flex gap-8 animate-scroll">
          {[...messages, ...messages].map((msg, idx) => (
            <span
              key={idx}
              className={`text-[11px] font-black uppercase tracking-[0.3em] shrink-0 ${
                msg === '✦' ? 'text-[#EB3461]' : 'text-white/60'
              }`}
            >
              {msg}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBar;
