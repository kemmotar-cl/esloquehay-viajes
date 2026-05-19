interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'giant';
  showText?: boolean;
  animated?: boolean;
}

export default function Logo({ size = 'md', showText = true, animated = true }: LogoProps) {
  const sizes = {
    sm: { w: 100, h: 90, text: 'text-lg' },
    md: { w: 140, h: 125, text: 'text-2xl' },
    lg: { w: 180, h: 160, text: 'text-3xl' },
    xl: { w: 240, h: 215, text: 'text-5xl' },
    giant: { w: 320, h: 290, text: 'text-6xl' },
  };

  const s = sizes[size];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${animated ? 'group' : ''}`}>
        <svg
          width={s.w}
          height={s.h}
          viewBox="0 0 280 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xl"
        >
          <defs>
            <linearGradient id="travelerGrad" x1="100" y1="80" x2="180" y2="200">
              <stop offset="0%" stopColor="#f1923f" />
              <stop offset="100%" stopColor="#de5a0e" />
            </linearGradient>
            <linearGradient id="shirtGrad" x1="120" y1="140" x2="160" y2="220">
              <stop offset="0%" stopColor="#fdecd5" />
              <stop offset="100%" stopColor="#fad5aa" />
            </linearGradient>
            <radialGradient id="cloudGrad2" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f9fafb" />
              <stop offset="100%" stopColor="#e5e7eb" />
            </radialGradient>
            <filter id="softShadow2" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="3"
                floodColor="#000000"
                floodOpacity="0.08"
              />
            </filter>
          </defs>

          {/* NUBE DE PENSAMIENTO */}
          <g filter="url(#softShadow2)">
            <ellipse cx="200" cy="55" rx="55" ry="32" fill="url(#cloudGrad2)" />
            <circle cx="165" cy="50" r="22" fill="url(#cloudGrad2)" />
            <circle cx="195" cy="38" r="25" fill="url(#cloudGrad2)" />
            <circle cx="230" cy="48" r="20" fill="url(#cloudGrad2)" />
            <circle cx="215" cy="68" r="18" fill="url(#cloudGrad2)" />
            <circle cx="180" cy="70" r="16" fill="url(#cloudGrad2)" />

            <ellipse cx="140" cy="82" rx="10" ry="7" fill="url(#cloudGrad2)" />
            <ellipse cx="125" cy="90" rx="6" ry="4" fill="url(#cloudGrad2)" />

            {/* Destinos flotando dentro de la nube */}
            <g opacity="0.45">
              <text x="175" y="48" fontSize="14" textAnchor="middle">
                ✈️
              </text>
              <text x="200" y="42" fontSize="12" textAnchor="middle">
                🏖️
              </text>
              <text x="220" y="52" fontSize="13" textAnchor="middle">
                ⛰️
              </text>
              <text x="190" y="62" fontSize="11" textAnchor="middle">
                🗺️
              </text>
              <text x="210" y="65" fontSize="10" textAnchor="middle">
                🌅
              </text>
              <text x="185" y="55" fontSize="9" textAnchor="middle">
                📷
              </text>
            </g>

            <path
              d="M245,30 L252,22 M255,35 L264,28 M250,25 L258,18"
              stroke="#f1923f"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.5"
              className={animated ? 'animate-pulse' : ''}
            />
          </g>

          {/* VIAJERO */}
          <path
            d="M90,200 L85,150 Q82,130 100,125 L140,125 Q158,130 155,150 L150,200 Q145,225 120,230 Q95,225 90,200"
            fill="url(#shirtGrad)"
            stroke="#b8420f"
            strokeWidth="1.5"
          />

          <path d="M105,125 L120,110 L135,125" fill="#ffffff" stroke="#b8420f" strokeWidth="1" />

          <ellipse
            cx="120"
            cy="95"
            rx="22"
            ry="26"
            fill="#fdecd5"
            stroke="#b8420f"
            strokeWidth="1.5"
          />

          <path
            d="M98,85 Q95,65 110,62 Q120,58 130,62 Q145,65 142,85 Q142,95 138,100 Q135,70 120,68 Q105,70 102,100 Q98,95 98,85"
            fill="#772d14"
            stroke="#772d14"
            strokeWidth="1"
          />

          {/* Gorra de viajero */}
          <path
            d="M95,75 Q90,55 105,48 Q120,42 135,48 Q150,55 145,75 Q140,72 120,74 Q100,72 95,75"
            fill="#4b5563"
            stroke="#374151"
            strokeWidth="1.5"
          />
          <rect x="92" y="70" width="56" height="4" rx="2" fill="#374151" />

          {/* Ojos pensantes mirando hacia la nube */}
          <ellipse cx="113" cy="95" rx="3" ry="4" fill="#111827" />
          <ellipse cx="127" cy="95" rx="3" ry="4" fill="#111827" />
          <circle cx="114" cy="93" r="1.2" fill="#ffffff" />
          <circle cx="128" cy="93" r="1.2" fill="#ffffff" />

          <path
            d="M108,88 Q113,84 118,88"
            stroke="#772d14"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M122,88 Q127,84 132,88"
            stroke="#772d14"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />

          <path
            d="M120,98 Q118,104 122,104"
            stroke="#b8420f"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
          <line
            x1="116"
            y1="108"
            x2="124"
            y2="108"
            stroke="#b8420f"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          <ellipse cx="108" cy="102" rx="4" ry="2.5" fill="#fca5a5" opacity="0.3" />
          <ellipse cx="132" cy="102" rx="4" ry="2.5" fill="#fca5a5" opacity="0.3" />

          {/* Brazo izquierdo — mano en la barbilla */}
          <path
            d="M85,145 Q70,155 75,170 Q78,178 88,175"
            fill="none"
            stroke="#fdecd5"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M85,145 Q70,155 75,170 Q78,178 88,175"
            fill="none"
            stroke="#b8420f"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <ellipse cx="88" cy="175" rx="7" ry="5" fill="#fdecd5" stroke="#b8420f" strokeWidth="1" />
          <line
            x1="85"
            y1="173"
            x2="83"
            y2="168"
            stroke="#b8420f"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Brazo derecho — con mapa */}
          <path
            d="M155,145 Q170,155 165,170"
            fill="none"
            stroke="#fdecd5"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M155,145 Q170,155 165,170"
            fill="none"
            stroke="#b8420f"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <ellipse
            cx="165"
            cy="170"
            rx="7"
            ry="5"
            fill="#fdecd5"
            stroke="#b8420f"
            strokeWidth="1"
          />

          {/* Mapa en la mano */}
          <rect
            x="158"
            y="152"
            width="22"
            height="16"
            rx="2"
            fill="#fef7ee"
            stroke="#b8420f"
            strokeWidth="1"
            transform="rotate(-15 169 160)"
          />
          <path
            d="M162,156 L168,154 L172,158 L166,162 Z"
            fill="#fde68a"
            opacity="0.6"
            transform="rotate(-15 169 160)"
          />
          <circle cx="168" cy="158" r="1.5" fill="#de5a0e" transform="rotate(-15 169 160)" />

          {/* Mochila */}
          <path
            d="M65,140 Q55,130 58,115 Q60,105 72,108 Q80,112 78,125 Q76,135 65,140"
            fill="#4b5563"
            stroke="#374151"
            strokeWidth="1"
          />
          <rect x="62" y="118" width="8" height="12" rx="2" fill="#6b7280" />

          <ellipse cx="120" cy="232" rx="45" ry="6" fill="#000000" opacity="0.06" />

          <g className={animated ? 'animate-pulse' : ''} opacity="0.4">
            <circle cx="260" cy="25" r="2" fill="#f1923f" />
            <circle cx="270" cy="35" r="1.2" fill="#fad5aa" />
            <circle cx="255" cy="40" r="1" fill="#fdecd5" />
          </g>
        </svg>

        {animated && (
          <div className="absolute inset-0 -z-10 rounded-full bg-brand-200 opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-2xl scale-125" />
        )}
      </div>

      {showText && (
        <div className="text-center">
          <h1 className={`${s.text} font-black tracking-tight text-gray-900 leading-none`}>
            <span className="text-brand-600">Es</span>
            <span className="text-gray-900">Lo</span>
            <span className="text-brand-600">Que</span>
            <span className="text-gray-900">Hay</span>
          </h1>
          {size !== 'sm' && size !== 'giant' && (
            <p className="text-xs text-gray-400 font-medium mt-1.5 tracking-widest uppercase">
              Viajes
            </p>
          )}
        </div>
      )}
    </div>
  );
}
