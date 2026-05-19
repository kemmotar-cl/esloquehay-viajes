import { useState, useMemo, useCallback } from 'react';
import { Settings2 } from 'lucide-react';
import IngredientInput from './components/IngredientInput';
import FloatingIngredients from './components/FloatingIngredients';
import RecipeCard from './components/RecipeCard';
import PreferencesPanel from './components/PreferencesPanel';
import AdBanner from './components/AdBanner';
import AffiliateLinks from './components/AffiliateLinks';
import ScrollIndicator from './components/ScrollIndicator';
import Logo from './components/Logo';
import { useCountryDetection } from './hooks/useCountry';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getRandomTagline } from './data/phrases';
import type { Recipe } from './types/recipe';
import type { UserPreferences } from './types/preferences';
import { DEFAULT_PREFERENCES } from './types/preferences';

const mockItinerary: Recipe = {
  id: '1',
  title: 'Fin de semana en Valparaíso',
  description:
    'Una escapada costera que transforma 2 días libres en una experiencia inolvidable de colores, sabores y vistas al Pacífico.',
  experience: 'Un abrazo del Pacífico en cada mirada',
  ingredients: [
    'Sábado: Cerro Alegre y Concepción (street art + cafés)',
    'Almuerzo en Mercado Puerto (paila marina)',
    'Ascensor El Peral y Paseo Yugoslavo',
    'Domingo: Viña del Mar (Reñaca + Castillo Wulff)',
    'Atardecer en Playa Ancha',
    'Transporte: Metro Valparaíso (trolebús)',
    'Presupuesto: $30.000 CLP por persona',
  ],
  steps: [
    'Sábado 09:00 — Llegada a Valparaíso. Dejá la mochila en el hostel y subí al Cerro Alegre por el ascensor.',
    'Sábado 10:30 — Caminata por los murales de Cerro Concepción. Cada esquina es una galería al aire libre.',
    'Sábado 13:00 — Almuerzo en el Mercado Puerto. Pedí paila marina fresca con vista a los lobos marinos.',
    'Sábado 15:30 — Paseo Yugoslavo y la Sebastiana (casa de Neruda). Reservá entrada online con anticipación.',
    'Sábado 19:00 — Cena en una picá del cerro. Probar chorrillana para compartir.',
    'Sábado 21:00 — Paseo nocturno por Sotomayor. Las luces del puerto de noche son mágicas.',
    'Domingo 09:00 — Trolebús a Viña del Mar. El viaje es parte de la experiencia.',
    'Domingo 11:00 — Playa Reñaca. Café con leche en la orilla si el día acompaña.',
    'Domingo 13:30 — Castillo Wulff y paseo por el borde costero.',
    'Domingo 16:00 — Regreso por Playa Ancha para el atardecer. Lleva un vinito y quesillo.',
    'Domingo 19:00 — Última cena y vuelta a casa con la mochila llena de recuerdos.',
  ],
  prepTime: 10,
  cookTime: 30,
  difficulty: 'Fácil',
  servings: 2,
  gourmetTips: [
    {
      title: 'Ascensores gratis antes de las 10am',
      description:
        'Los ascensores históricos no cobran antes de las 10:00. Subí temprano y ahorrá para el almuerzo.',
      technique: 'Hack local',
    },
    {
      title: 'Hostel en el cerro, no en el plan',
      description:
        'Quedarse en el cerro te ahorra transporte y te da acceso a la vida real de Valparaíso, no la turística.',
      technique: 'Alojamiento estratégico',
    },
    {
      title: 'Pescado solo en días con "R"',
      description:
        'En el mercado, preguntá qué pescaron hoy. Si no es fresco, no compres. La regla del "R" funciona.',
      technique: 'Seguridad alimentaria',
    },
    {
      title: 'Documentá con calma',
      description:
        'Los mejores spots para foto están en los pasajes escondidos, no en las rutas turísticas. Perdéte un poco.',
      technique: 'Fotografía viajera',
    },
  ],
  variations: [
    {
      name: 'Ruta del vino en Casablanca',
      description:
        'El mismo finde, pero en viñedos. Cata de vinos, almuerzo campestre y paseo entre viñas.',
      extraIngredients: ['Reserva en viña', 'Auto o transfer', 'Gorro de sol'],
      twist: 'Eno-turismo',
    },
    {
      name: 'Aventura en La Campana',
      description:
        'Trekking al cerro La Campana, donde Darwin hizo historia. Naturaleza pura a una hora de Valpo.',
      extraIngredients: ['Botella 2L de agua', 'Zapatillas de trekking', 'Protector solar'],
      twist: 'Naturaleza',
    },
    {
      name: 'Tour gastronómico porteño',
      description:
        'El mismo Valparaíso pero enfocado en comida: picás históricas, mercados, pastelerías escondidas.',
      extraIngredients: ['Estómago vacío', 'Lista de picás', 'Cámara'],
      twist: 'Foodie',
    },
  ],
  winePairing:
    'Un Sauvignon Blanc del valle de Casablanca es el compañero perfecto para la paila marina y el atardecer porteño.',
  platingTip:
    'El mejor ángulo para foto del puerto está desde el Paseo Atkinson al atardecer. Llevá un trípode liviano y un vino para la espera.',
};

const variationMocks: Record<string, Recipe> = {
  'Ruta del vino en Casablanca': {
    ...mockItinerary,
    id: '2',
    title: 'Fin de semana en la Ruta del Vino',
    description:
      'Viñedos, catas y paisajes que transforman un finde común en una experiencia sensorial.',
    experience: 'Un brindis con cada atardecer',
    difficulty: 'Medio',
    ingredients: [
      'Sábado: Viña Matetic o Emiliana (tour + cata)',
      'Almuerzo en restaurante de viña',
      'Domingo: Viña Casas del Bosque o Indómita',
      'Picnic entre viñas',
      'Transporte: Auto o tour privado',
      'Presupuesto: $60.000 CLP por persona',
    ],
    steps: [
      'Sábado 10:00 — Llegada a Casablanca. El valle despierta con niebla y aromas a tierra húmeda.',
      'Sábado 11:00 — Tour en viña orgánica. Aprendé sobre biodinámica mientras caminás entre filas de uva.',
      'Sábado 13:30 — Almuerzo maridado. Cada plato tiene su vino, y cada vino cuenta una historia.',
      'Sábado 16:00 — Cata privada de reservas. El enólogo te abre botellas que no están en la carta.',
      'Sábado 19:00 — Atardecer entre viñas con una copa en la mano.',
      'Domingo 10:00 — Segunda viña, otro estilo. Compará técnicas de elaboración.',
      'Domingo 13:00 — Picnic con productos locales entre las viñas. Queso, pan, aceitunas y un rosé.',
    ],
    gourmetTips: [
      {
        title: 'Reservá con anticipación',
        description: 'Los fines de semana se llenan. Algunas viñas cierran lista una semana antes.',
        technique: 'Planificación',
      },
      {
        title: 'Designated driver o tour',
        description: 'No manejes después de una cata. Contratá un tour o designá un conductor.',
        technique: 'Seguridad',
      },
    ],
    winePairing: 'La misma experiencia es el maridaje. Cada viña tiene su especialidad.',
    platingTip:
      'La foto icónica es entre las filas de uva con la copa en primer plano y el sol poniente detrás.',
  },
  'Aventura en La Campana': {
    ...mockItinerary,
    id: '3',
    title: 'Trekking Cerro La Campana',
    description:
      'Subida al cerro que inspiró a Darwin. Naturaleza, esfuerzo y una vista 360° que lo vale todo.',
    experience: 'Conquistá la cima que vio Darwin',
    difficulty: 'Difícil',
    ingredients: [
      'Sábado: Trekking hasta el refugio',
      'Camping o cabaña en Olmue',
      'Domingo: Cumbre del cerro La Campana',
      'Guía local recomendado',
      'Transporte: Bus a Olmue + taxi al parque',
      'Presupuesto: $25.000 CLP por persona',
    ],
    steps: [
      'Sábado 07:00 — Salida temprana desde Valparaíso. El bus a Olmué sale cada hora.',
      'Sábado 09:00 — Registro en el parque y comienzo de ascenso por el sendero Andinista.',
      'Sábado 12:00 — Llegada al refugio. Almuerzo ligero y siesta en hamaca paraguaya.',
      'Sábado 15:00 — Trekking corto a la Portezuela para ver el atardecer.',
      'Sábado 18:00 — Cena en cabaña o camping. El silencio de la montaña es terapéutico.',
      'Domingo 04:30 — Despertar en la oscuridad para la cumbre. Llevá linterna frontal.',
      'Domingo 06:30 — Cumbre del La Campana. El sol naciendo sobre el Pacífico y la cordillera al mismo tiempo.',
      'Domingo 10:00 — Descenso y regreso con las piernas temblando pero el alma llena.',
    ],
    gourmetTips: [
      {
        title: 'No subas sin guía si es tu primera vez',
        description:
          'El sendero tiene bifurcaciones poco marcadas. Un guía local cuesta $15.000 y vale cada peso.',
        technique: 'Seguridad',
      },
      {
        title: 'Capas de ropa',
        description: 'En la cumbre puede hacer 0°C incluso en verano. Llevá guantes y gorro.',
        technique: 'Equipamiento',
      },
    ],
    winePairing: 'Un Carmenere bien cargado para recuperar fuerzas en la cabaña.',
    platingTip:
      'La foto de la cumbre: panorámica 360° desde la roca marcada. Llegá temprano para luz dorada.',
  },
  'Tour gastronómico porteño': {
    ...mockItinerary,
    id: '4',
    title: 'Tour Gastronómico por Valparaíso',
    description:
      'El mismo Valparaíso pero a través del estómago. Picás históricas, mercados y sabores escondidos.',
    experience: 'Un viaje de ida para el paladar',
    difficulty: 'Fácil',
    ingredients: [
      'Sábado: Mercado Puerto + picás del cerro',
      'Cafés históricos (Café Riquet)',
      'Domingo: Pastelerías y cervecerías artesanales',
      'Ruta del chorrillana',
      'Transporte: A pie (¿qué más?)',
      'Presupuesto: $35.000 CLP por persona',
    ],
    steps: [
      'Sábado 09:00 — Desayuno en Café Riquet. Torta de chocolate y café filtrado como hace 100 años.',
      'Sábado 11:00 — Mercado Puerto. Proba los ostiones más frescos de la costa central.',
      'Sábado 13:30 — Almuerzo en J Cruz. La chorrillana original, donde nació el plato.',
      'Sábado 16:00 — Café en el cerro con vista al puerto. Lleva libreta para anotar sabores.',
      'Sábado 20:00 — Cena en una picá del plan. El Valpo nocturno sabe diferente.',
      'Domingo 10:00 — Pastelería Alemana en el cerro. Las kuchen son un viaje a Europa.',
      'Domingo 13:00 — Cervecería artesanal con picoteo. La escena craft de Valpo crece cada año.',
    ],
    gourmetTips: [
      {
        title: 'J Cruz es sagrado',
        description:
          'La chorrillana nació ahí. No aceptes imitaciones. Llegá antes del mediodía o esperás.',
        technique: 'Peregrinación foodie',
      },
      {
        title: 'Preguntá por el "plato del día"',
        description:
          'Las picás del cerro hacen platos que no están en la carta. Solo los locales saben.',
        technique: 'Insider tip',
      },
    ],
    winePairing:
      'Un pipeño bien frío acompaña cualquier picada porteña sin competir con los sabores fuertes.',
    platingTip:
      'La foto obligada es la chorrillana de J Cruz desde arriba, con el huevo frito intacto en el centro.',
  },
};

function App() {
  const [itinerary, setItinerary] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    'esloquehay-prefs',
    DEFAULT_PREFERENCES
  );
  const [elements, setElements] = useLocalStorage<string[]>('esloquehay-elements', []);

  const { country, countryName, spanishVariant, loading: countryLoading } = useCountryDetection();

  const tagline = useMemo(() => getRandomTagline(spanishVariant), [spanishVariant]);

  const addElement = useCallback(
    (el: string) => {
      const clean = el.toLowerCase().trim();
      setElements((prev) => (prev.includes(clean) ? prev : [...prev, clean]));
    },
    [setElements]
  );

  const removeElement = useCallback(
    (index: number) => {
      setElements((prev) => prev.filter((_, i) => i !== index));
    },
    [setElements]
  );

  const handleGenerate = useCallback(async (variationName?: string, _extraElements?: string[]) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (variationName !== undefined && variationName in variationMocks) {
      setItinerary(variationMocks[variationName]);
    } else {
      setItinerary(mockItinerary);
    }
    setIsLoading(false);
  }, []);

  const handleGenerateVariation = useCallback(
    (variationName: string, extraElements: string[]) => {
      extraElements.forEach((el) => {
        addElement(el.toLowerCase());
      });
      void handleGenerate(variationName, extraElements);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [addElement, handleGenerate]
  );

  if (countryLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Detectando tu ubicación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-3 sm:px-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto flex items-center justify-between mb-3 sm:mb-4">
        <span className="text-[10px] sm:text-xs text-gray-400 font-medium">📍 {countryName}</span>
        <button
          onClick={() => {
            setShowPrefs(true);
          }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white rounded-xl shadow-sm text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Settings2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Preferencias</span>
        </button>
      </div>

      {/* Floating Elements Cloud */}
      <div className="max-w-2xl mx-auto">
        <FloatingIngredients
          country={country}
          onSelect={addElement}
          selected={elements}
          speedMultiplier={preferences.particleSpeed}
        />
      </div>

      {/* Manual Input */}
      <IngredientInput
        ingredients={elements}
        tagline={tagline}
        spanishVariant={spanishVariant}
        onAdd={addElement}
        onRemove={removeElement}
        onGenerate={() => void handleGenerate()}
        isLoading={isLoading}
      />

      {/* Ad Banner — debajo del botón generar */}
      <AdBanner variant="horizontal" />

      {/* Scroll indicator cuando el itinerario está listo */}
      <ScrollIndicator visible={!!itinerary && !isLoading} />

      {/* Itinerary Result */}
      {itinerary && !isLoading && (
        <div className="mt-6 sm:mt-8">
          <RecipeCard recipe={itinerary} onGenerateVariation={handleGenerateVariation} />
          <AffiliateLinks recipeCategory={itinerary.title.split(' ')[0]} />
          <AdBanner variant="horizontal" />
        </div>
      )}

      {/* Preferences Modal */}
      {showPrefs && (
        <PreferencesPanel
          preferences={preferences}
          onChange={setPreferences}
          onClose={() => {
            setShowPrefs(false);
          }}
        />
      )}

      <footer className="mt-12 sm:mt-16 text-center text-gray-400 text-xs sm:text-sm px-4 pb-8">
        <div className="mb-6 opacity-40 hover:opacity-70 transition-opacity duration-500">
          <Logo size="giant" showText={false} animated={false} />
        </div>
        <p>EsLoQueHay — Viajes © 2026 — Vendemos experiencias, no pasajes</p>
        <p className="text-[10px] text-gray-300 mt-1">Hecho con ganas de escapar</p>
      </footer>
    </div>
  );
}

export default App;
