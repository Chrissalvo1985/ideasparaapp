import type { DiaryEntry, LiberationSession, UserProgress } from '../types/index';

// Función para crear fechas relativas
const getDaysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const mockDiaryEntries: DiaryEntry[] = [
  {
    id: 'entry_1699123456789_abc123',
    title: 'Un domingo de lluvia y té',
    content: `Hoy ha llovido toda la mañana y algo en mí se ha relajado con el sonido constante del agua contra la ventana. He preparado té de manzanilla y me he quedado mirando las gotas deslizarse por el cristal, cada una como pequeñas historias que no conoceré nunca.

Me pregunto por qué la lluvia me tranquiliza tanto. Quizás porque me da permiso para quedarme adentro, para moverme más lento, para ser más contemplativa. 

Hoy no tengo grandes revelaciones que escribir, solo esta sensación de estar presente en mi propio hogar, en mi propia piel. A veces la felicidad es tan simple como un té caliente y el permiso para no hacer nada productivo.`,
    emotion: 'paz',
    date: getDaysAgo(1),
    isPrivate: false,
    tags: ['lluvia', 'tranquilidad', 'hogar', 'presente'],
    mood: 7,
    category: 'dormir',
    entryType: 'category',
    promptText: 'Describe un momento de calma perfecta en tu hogar'
  },
  {
    id: 'entry_1699023456789_def456',
    title: 'Conversación con mamá',
    content: `Llamé a mamá esta tarde y terminamos hablando por casi dos horas. Me contó sobre el jardín, sobre cómo las rosas están floreciendo este año más que nunca. Hay algo en su voz cuando habla de las plantas que me devuelve a la infancia, a esas tardes donde yo la seguía por el patio mientras ella regaba y hablaba con cada flor como si fueran amigas.

Me dijo que me extraña, y yo le dije que yo también la extraño. Pero no hablamos de la distancia con tristeza, sino con esa nostalgia cálida que a veces duele y consuela a la vez.

Colgué el teléfono sintiendo esa mezcla extraña de amor y melancolía. Qué raro es crecer y seguir sintiendo que una parte de ti siempre va a vivir en la casa de tu infancia.`,
    emotion: 'nostalgia',
    date: getDaysAgo(3),
    isPrivate: false,
    tags: ['familia', 'madre', 'infancia', 'amor'],
    mood: 6,
    entryType: 'free'
  },
  {
    id: 'entry_1698923456789_ghi789',
    title: 'Crisis de las 3 am',
    content: `Son las 3:17 am y no puedo dormir. Mi mente está como un torbellino de preocupaciones que durante el día logro mantener a raya, pero que en la oscuridad se vuelven gigantes.

¿Estoy haciendo las cosas bien? ¿Esta vida que estoy construyendo es la que realmente quiero? ¿Por qué a veces siento que estoy actuando en una obra de teatro donde no conozco mi papel?

El trabajo, las relaciones, las decisiones que tomé el año pasado... todo se siente tan incierto en estos momentos. Como si caminara en la niebla y no supiera si el siguiente paso va a ser sobre tierra firme o sobre un precipicio.

Respiro profundo. Mañana estas preguntas no se sentirán tan urgentes. Mañana el sol va a salir y esto va a ser solo otro episodio de ansiedad nocturna que sobreviví. Pero ahora, en este momento, necesitaba escribir esto. Necesitaba sacar este nudo del pecho.`,
    emotion: 'ansiedad',
    date: getDaysAgo(5),
    isPrivate: true,
    tags: ['insomnio', 'ansiedad', 'dudas', 'futuro'],
    mood: 3,
    category: 'emociones',
    entryType: 'category',
    promptText: 'Escribe sobre algo que te quita el sueño'
  },
  {
    id: 'entry_1698823456789_jkl012',
    title: 'Pequeñas victorias',
    content: `Hoy terminé de leer ese libro que había empezado hace tres meses. No es algo extraordinario, pero se siente como una pequeña victoria personal.

También logré hacer esa llamada que llevaba postergando desde la semana pasada. Y cociné algo nuevo en lugar de pedir delivery por cuarta vez esta semana.

Son cosas pequeñas, pero hoy me siento orgullosa de estos pequeños actos de cuidado hacia mí misma. A veces la vida no se trata de grandes gestos heroicos, sino de estas pequeñas decisiones que nos hacen sentir un poquito más conectadas con quienes queremos ser.

Me voy a dormir temprano hoy, otro pequeño regalo para mi yo de mañana.`,
    emotion: 'alegria',
    date: getDaysAgo(7),
    isPrivate: false,
    tags: ['logros', 'autocuidado', 'libros', 'orgullo'],
    mood: 8,
    entryType: 'random',
    promptText: 'Celebra tres pequeñas victorias de tu día'
  },
  {
    id: 'entry_1698723456789_mno345',
    title: 'Extrañando a Julia',
    content: `Se cumple un año desde que Julia se mudó a otra ciudad. Hoy encontré fotos nuestras en el celular y me quedé ahí, mirándolas durante mucho tiempo.

La extraño de una manera que duele. Extraño nuestras conversaciones hasta muy tarde, extraño que apareciera en mi casa sin avisar con helado y chismes. Extraño tener a alguien que me conociera tan bien que podía leer mi estado de ánimo antes de que yo mismo lo identificara.

Hablamos por WhatsApp casi todos los días, pero no es lo mismo. Las videollamadas no reemplazan los abrazos, y los mensajes no capturan esas conversaciones que fluyen sin dirección, esas donde empiezas hablando del clima y terminas confesando tus miedos más profundos.

La amistad a distancia es un músculo que estoy aprendiendo a ejercitar. Duele, pero también me enseña a valorar de manera diferente los vínculos que tengo cerca.`,
    emotion: 'tristeza',
    date: getDaysAgo(10),
    isPrivate: false,
    tags: ['amistad', 'distancia', 'pérdida', 'nostalgia'],
    mood: 4,
    entryType: 'free'
  },
  {
    id: 'entry_1698623456789_pqr678',
    title: 'Primer día de otoño',
    content: `Las hojas empezaron a cambiar de color y hay algo mágico en cómo la ciudad se transforma. Caminé por el parque esta tarde y me detuve a recoger algunas hojas especialmente bonitas. Como una niña.

El otoño siempre me pone reflexiva. Hay algo en la manera como la naturaleza se prepara para hibernar que me invita a mirar hacia adentro también. Qué aprendí este año, qué quiero soltar, qué quiero conservar.

Este año aprendí que está bien no tener todas las respuestas. Aprendí que la vulnerabilidad puede ser una fortaleza. Aprendí que puedo cuidar a otros sin olvidarme de cuidarme a mí misma.

Quiero soltar la necesidad de control, la ansiedad por el futuro, esa voz interna que siempre encuentra algo que criticar.

Quiero conservar la capacidad de asombrarme, la curiosidad, la esperanza que persiste a pesar de todo.`,
    emotion: 'nostalgia',
    date: getDaysAgo(14),
    isPrivate: false,
    tags: ['otoño', 'reflexión', 'crecimiento', 'naturaleza'],
    mood: 7,
    category: 'creatividad',
    entryType: 'category',
    promptText: 'Escribe una carta a la estación que está llegando'
  },
  {
    id: 'entry_1698523456789_stu901',
    title: 'Día de furia',
    content: `Hoy estoy furiosa y no me voy a disculpar por ello.

Furiosa con la injusticia, con la indiferencia, con las personas que tienen poder y lo usan para hacer daño. Furiosa conmigo misma por quedarme callada cuando debería haber hablado.

A veces siento que la rabia es una emoción que no se nos permite sentir, especialmente a las mujeres. Que se supone que debemos ser comprensivas, empáticas, que debemos buscar explicaciones para todo.

Pero hoy no. Hoy mi rabia es justa y la voy a honrar. La voy a usar como combustible para hacer algo, para moverme, para no quedarme paralizada en la comodidad de la pasividad.

No sé exactamente qué voy a hacer con esta energía, pero sé que no la voy a desperdiciar pretendiendo que no existe.`,
    emotion: 'rabia',
    date: getDaysAgo(18),
    isPrivate: true,
    tags: ['rabia', 'injusticia', 'poder', 'acción'],
    mood: 5,
    category: 'emociones',
    entryType: 'category',
    promptText: 'Dale voz a una emoción que has estado callando'
  },
  {
    id: 'entry_1698423456789_vwx234',
    title: 'Una tarde perfecta',
    content: `No pasó nada extraordinario hoy, y precisamente por eso fue perfecto.

Me levanté sin alarma, desayuné despacio mientras leía. El sol entraba por la ventana de la cocina de esa manera dorada que solo pasa los sábados por la mañana. 

Salí a caminar sin rumbo fijo y terminé en esa librería pequeña donde encontré un libro de poemas que no conocía. El librero me recomendó un té que resultó ser exactamente lo que necesitaba sin saberlo.

Almorcé en el parque, leyendo y observando a la gente pasar. Una pareja de ancianos se sentó en la banca de al lado y se quedaron ahí en silencio, simplemente acompañándose. Me emocioné viendo tanta ternura casual.

Es raro como a veces la felicidad no llega con fuegos artificiales, sino con esta sensación sutil de estar exactamente donde necesitas estar.`,
    emotion: 'alegria',
    date: getDaysAgo(21),
    isPrivate: false,
    tags: ['sábado', 'simplicidad', 'libros', 'felicidad'],
    mood: 9,
    entryType: 'inspiration'
  },
  {
    id: 'entry_1698323456789_yza567',
    title: 'Navegando la incertidumbre',
    content: `Todo está cambiando tan rápido que a veces me siento como si estuviera tratando de leer un mapa mientras alguien lo mueve constantemente.

El trabajo, las relaciones, incluso la relación conmigo misma. Siento que cada día descubro algo nuevo sobre quien soy, y no siempre me gusta lo que encuentro.

Pero también hay algo liberador en aceptar que no tengo que tener todo resuelto. Que está bien estar en construcción permanente, que está bien cambiar de opinión, que está bien no saber qué quiero ser cuando sea grande a los 28 años.

Tal vez la vida no se trata de llegar a un lugar específico, sino de aprender a estar cómoda con el movimiento constante. Como aprender a bailar en lugar de buscar desesperadamente una silla donde sentarse.

Hoy elijo confiar en el proceso, aunque no entienda hacia dónde me lleva.`,
    emotion: 'confusion',
    date: getDaysAgo(25),
    isPrivate: false,
    tags: ['cambio', 'incertidumbre', 'crecimiento', 'aceptación'],
    mood: 6,
    category: 'viajar',
    entryType: 'category',
    promptText: 'Describe tu proceso de navegación ante lo incierto'
  },
  {
    id: 'entry_1698223456789_bcd890',
    title: 'Gratitud en mayúsculas',
    content: `Hoy estoy desbordada de gratitud y necesito escribirlo antes de que la rutina me haga olvidar esta sensación.

Gratitud por mi salud, por poder caminar, respirar, ver los colores del atardecer. Gratitud por las personas que eligieron quedarse en mi vida a pesar de mis imperfecciones. Gratitud por el techo sobre mi cabeza, por la comida en mi mesa, por el lujo de poder elegir qué escribir en estas páginas.

Gratitud por los libros que me abrieron mundos, por la música que me acompañó en los días difíciles, por todas las pequeñas obras de arte que han hecho mi vida más bella.

Gratitud por las lágrimas que me enseñaron compasión, por los errores que me enseñaron humildad, por los miedos que me enseñaron valentía.

A veces necesito recordarme conscientemente de todo lo bueno que hay en mi vida. No porque no lo valore, sino porque es fácil que lo cotidiano se vuelva invisible.

Hoy lo veo todo, y estoy profundamente agradecida.`,
    emotion: 'gratitud',
    date: getDaysAgo(30),
    isPrivate: false,
    tags: ['gratitud', 'reflexión', 'vida', 'abundancia'],
    mood: 10,
    category: 'salud',
    entryType: 'category',
    promptText: 'Haz una lista de 10 cosas por las que sientes gratitud hoy'
  }
];

export const mockLiberationSessions: LiberationSession[] = [
  {
    id: 'liberation_1699000000000_abc',
    content: 'Todas esas veces que no fui suficiente para ti. Todo ese tiempo que gasté tratando de convertirme en alguien que no era solo para que me quisieras. La versión de mí que creí que necesitabas.',
    emotion: 'tristeza',
    action: 'burn',
    date: getDaysAgo(12),
    isDestroyed: true
  },
  {
    id: 'liberation_1698900000000_def',
    content: 'El miedo a fracasar que me ha paralizado tantas veces. Esa voz que me dice que mejor no intento porque probablemente no lo voy a lograr.',
    emotion: 'miedo',
    action: 'tear',
    date: getDaysAgo(20),
    isDestroyed: true
  },
  {
    id: 'liberation_1698800000000_ghi',
    content: 'La culpa por haber dicho que no a esa oportunidad de trabajo el año pasado. Por haber priorizado mi bienestar mental sobre el dinero.',
    emotion: 'ansiedad',
    action: 'release',
    date: getDaysAgo(35),
    isDestroyed: true
  }
];

export const mockUserProgress: UserProgress = {
  totalEntries: 10,
  consecutiveDays: 3,
  favoriteEmotion: 'alegria',
  completedPrompts: [
    'prompt_1', 'prompt_2', 'prompt_3', 'prompt_4', 'prompt_5'
  ],
  liberationSessions: 3,
  lastActiveDate: new Date().toDateString(),
  categoriesExplored: ['emociones', 'creatividad', 'viajar', 'dormir']
};

// Función para inicializar datos de prueba
export const initializeMockData = () => {
  const hasExistingData = localStorage.getItem('ideas-para-app-storage');
  
  // Solo cargar datos de prueba si no hay datos existentes
  if (!hasExistingData) {
    const mockData = {
      state: {
        currentEmotion: null,
        currentPrompt: null,
        diaryEntries: mockDiaryEntries,
        liberationSessions: mockLiberationSessions,
        dailyQuote: null,
        userProgress: mockUserProgress,
        categoryProgress: {
          'emociones': 4,
          'creatividad': 2,
          'viajar': 1, 
          'dormir': 1,
          'fiestas': 0,
          'salud': 2
        },
        isWriting: false,
        writingContent: '',
        showPrivateEntries: false,
        currentCategory: null
      },
      version: 4
    };
    
    localStorage.setItem('ideas-para-app-storage', JSON.stringify(mockData));
    console.log('🎭 Datos de prueba inicializados - Entradas:', mockDiaryEntries.length, 'Liberaciones:', mockLiberationSessions.length);
    return true;
  }
  
  return false;
};

// Función para forzar la carga de datos de prueba (para desarrollo)
export const loadMockData = () => {
  const mockData = {
    state: {
      currentEmotion: null,
      currentPrompt: null,
      diaryEntries: mockDiaryEntries,
      liberationSessions: mockLiberationSessions,
      dailyQuote: null,
      userProgress: mockUserProgress,
      categoryProgress: {
        'emociones': 4,
        'creatividad': 2,
        'viajar': 1,
        'dormir': 1,
        'fiestas': 0,
        'salud': 2
      },
      isWriting: false,
      writingContent: '',
      showPrivateEntries: false,
      currentCategory: null
    },
    version: 4
  };
  
  localStorage.setItem('ideas-para-app-storage', JSON.stringify(mockData));
  console.log('🎭 Datos de prueba cargados forzadamente - Entradas:', mockDiaryEntries.length, 'Liberaciones:', mockLiberationSessions.length);
  window.location.reload();
}; 