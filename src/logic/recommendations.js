export const emptyProfile = {
  name: "",
  location: "",
  age: "",
  experience: "",
  skills: "",
  education: "",
  availability: "",
  hasTransport: "no",
  hasLicense: "no",
  workType: "cualquiera",
  interests: [],
  contact: "",
};

const roles = [
  {
    title: "Vendedor/a de local",
    area: "Ventas",
    keywords: ["ventas", "vendedor", "comercio", "atencion", "publico", "clientes", "local"],
    reason: "ya aparece experiencia de mostrador, trato con gente, ventas o trabajo en comercio.",
    tip: "Conta ejemplos concretos: atencion, reposicion, caja, cierre de ventas o manejo de reclamos.",
    tourismPriority: true,
  },
  {
    title: "Cajero/a",
    area: "Atencion al cliente",
    keywords: ["caja", "cajero", "cobro", "pos", "efectivo", "comercio", "clientes"],
    reason: "tu perfil menciona cobros, caja, atencion o tareas donde importa ser prolijo y confiable.",
    tip: "Remarca puntualidad, buen trato y responsabilidad para manejar pagos.",
  },
  {
    title: "Atencion al cliente",
    area: "Atencion al cliente",
    keywords: ["atencion", "publico", "clientes", "consultas", "telefono", "whatsapp", "reclamos"],
    reason: "tenes señales de buen trato con personas, consultas o clientes.",
    tip: "Mostra que podes responder con respeto, paciencia y claridad.",
    tourismPriority: true,
  },
  {
    title: "Recepcionista",
    area: "Atencion al cliente",
    keywords: ["recepcion", "telefono", "agenda", "clientes", "atencion", "publico", "computadora"],
    reason: "encaja si te resulta natural recibir personas, responder consultas y ordenar informacion.",
    tip: "Menciona si manejas WhatsApp, llamadas, agenda o computadora basica.",
    tourismPriority: true,
  },
  {
    title: "Auxiliar de limpieza",
    area: "Limpieza",
    keywords: ["limpieza", "limpiar", "casas", "edificio", "servicios", "orden", "hotel"],
    reason: "aparecen tareas de limpieza, orden o servicios generales en tu experiencia.",
    tip: "Suma disponibilidad horaria, zonas donde podes trabajar y referencias si las tenes.",
    entryLevel: true,
  },
  {
    title: "Servicios generales",
    area: "Limpieza",
    keywords: ["servicios", "generales", "limpieza", "orden", "mantenimiento", "hotel", "edificio"],
    reason: "tu perfil puede servir para tareas variadas de apoyo, orden y limpieza.",
    tip: "Conta si podes hacer varias tareas en el dia y en que horarios estas disponible.",
    entryLevel: true,
  },
  {
    title: "Mucama/o de hotel",
    area: "Hoteleria",
    keywords: ["hotel", "mucama", "habitaciones", "limpieza", "turismo", "lavanderia"],
    reason: "puede servirte si ya hiciste limpieza y podes trabajar con rutina y detalle.",
    tip: "Destaca prolijidad, rapidez y buena presencia.",
    tourismPriority: true,
  },
  {
    title: "Auxiliar de hoteleria",
    area: "Hoteleria",
    keywords: ["hotel", "hoteleria", "turismo", "habitaciones", "servicios", "recepcion", "lavanderia"],
    reason: "tu ubicacion o experiencia puede encajar con tareas de apoyo en hoteles y alojamientos.",
    tip: "Aclara disponibilidad para fines de semana, feriados o temporada.",
    tourismPriority: true,
  },
  {
    title: "Mozo/a",
    area: "Gastronomia",
    keywords: ["mozo", "restaurante", "bar", "cafeteria", "clientes", "bandeja", "salon"],
    reason: "combina atencion al publico con ritmo de trabajo en gastronomia.",
    tip: "Aclara si tenes disponibilidad nocturna o fines de semana.",
    tourismPriority: true,
  },
  {
    title: "Ayudante de cocina",
    area: "Gastronomia",
    keywords: ["cocina", "cocinero", "ayudante", "restaurante", "comida", "preparacion"],
    reason: "tu experiencia o habilidades apuntan a tareas de cocina y apoyo operativo.",
    tip: "Nombra tareas simples: preparacion, limpieza de cocina, mise en place o lavado.",
    tourismPriority: true,
  },
  {
    title: "Barista",
    area: "Gastronomia",
    keywords: ["barista", "cafe", "cafeteria", "bar", "clientes", "mozo"],
    reason: "mencionas cafeteria, bar o atencion en lugares con contacto directo con clientes.",
    tip: "Si preparaste cafe, bebidas o atendiste mostrador, ponelo bien claro.",
    tourismPriority: true,
  },
  {
    title: "Bachero/a",
    area: "Gastronomia",
    keywords: ["bachero", "bacha", "lavado", "cocina", "restaurante", "bar", "limpieza"],
    reason: "es una buena entrada a gastronomia si sabes trabajar con orden y ritmo.",
    tip: "Destaca que sos responsable, rapido y que podes apoyar al equipo de cocina.",
    entryLevel: true,
    tourismPriority: true,
  },
  {
    title: "Repartidor/a",
    area: "Choferes",
    keywords: ["moto", "auto", "libreta", "reparto", "delivery", "chofer", "logistica"],
    reason: "tener libreta o locomocion abre oportunidades de reparto y traslados.",
    tip: "Indica claramente que libreta tenes, zona donde te moves y disponibilidad.",
    requiresMobility: true,
  },
  {
    title: "Cadete",
    area: "Choferes",
    keywords: ["cadete", "moto", "auto", "mandados", "reparto", "tramites", "delivery"],
    reason: "si tenes movilidad o libreta, podes servir para mandados, tramites y entregas.",
    tip: "Aclara zonas donde podes moverte y si tenes moto, auto o bicicleta.",
    requiresMobility: true,
    entryLevel: true,
  },
  {
    title: "Chofer",
    area: "Choferes",
    keywords: ["chofer", "camioneta", "camion", "libreta", "reparto", "conduccion"],
    reason: "tu perfil muestra condiciones para trabajos de conduccion o reparto.",
    tip: "Agrega anos manejando, tipo de libreta y conocimiento de zonas.",
    requiresLicense: true,
  },
  {
    title: "Auxiliar de logistica",
    area: "Logistica",
    keywords: ["logistica", "deposito", "stock", "reparto", "carga", "descarga", "orden"],
    reason: "tu perfil puede encajar con deposito, stock, reparto o apoyo operativo.",
    tip: "Menciona si podes cargar peso, ordenar mercaderia o usar planillas simples.",
    requiresMobility: true,
  },
  {
    title: "Operario/a de mantenimiento general",
    area: "Mantenimiento",
    keywords: ["mantenimiento", "pintura", "jardineria", "electricidad", "arreglos", "herramientas"],
    reason: "hay tareas manuales o de reparacion que sirven para mantenimiento general.",
    tip: "Lista herramientas que sabes usar y trabajos que puedas mostrar.",
  },
  {
    title: "Peon de construccion",
    area: "Construccion",
    keywords: ["construccion", "obra", "albanil", "peon", "herramientas", "pintura"],
    reason: "encaja si ya hiciste obra, arreglos, carga o apoyo a oficiales.",
    tip: "Deci si podes levantar peso, trabajar temprano y trasladarte a obra.",
  },
  {
    title: "Auxiliar administrativo/a basico",
    area: "Administracion basica",
    keywords: ["administracion", "computadora", "excel", "datos", "facturas", "agenda", "archivo"],
    reason: "tu perfil tiene senales de orden, computadora o manejo de informacion.",
    tip: "Aclara programas que usas, aunque sea nivel basico.",
  },
  {
    title: "Cuidador/a de personas",
    area: "Cuidado de personas",
    keywords: ["cuidado", "ninos", "adultos", "acompanante", "salud", "personas", "paciente"],
    reason: "puede ser buena opcion si tenes experiencia cuidando o acompanando personas.",
    tip: "Menciona paciencia, responsabilidad y horarios disponibles.",
  },
  {
    title: "Trabajo zafral de temporada",
    area: "Trabajos zafrales",
    keywords: ["zafral", "temporada", "cosecha", "verano", "evento", "changas"],
    reason: "tu busqueda acepta trabajos por temporada, changas o ingresos rapidos.",
    tip: "Mostra flexibilidad y deja claro desde cuando podes empezar.",
    tourismPriority: true,
    entryLevel: true,
  },
  {
    title: "Repositor/a",
    area: "Ventas",
    keywords: ["reposicion", "repositor", "supermercado", "orden", "stock", "deposito"],
    reason: "encaja con tareas de orden, reposicion, stock o trabajo en local.",
    tip: "Destaca responsabilidad, velocidad y disposicion para moverte.",
    entryLevel: true,
  },
  {
    title: "Aprendiz o auxiliar general",
    area: "Entrada laboral",
    keywords: ["sin experiencia", "aprendiz", "auxiliar", "ayudante", "ganas", "responsable"],
    reason: "es una buena puerta de entrada si todavia no tenes mucha experiencia formal.",
    tip: "Pone el foco en ganas de aprender, puntualidad y disponibilidad.",
    entryLevel: true,
  },
];

const defaultRoles = [
  "Aprendiz o auxiliar general",
  "Auxiliar de limpieza",
  "Repositor/a",
  "Cadete",
  "Atencion al cliente",
  "Trabajo zafral de temporada",
];

const touristLocations = [
  "maldonado",
  "punta del este",
  "punta",
  "san carlos",
  "piriapolis",
  "la barra",
  "jose ignacio",
  "rocha",
  "colonia",
  "costa de oro",
  "atlantida",
];

const companySuggestions = [
  {
    type: "Hoteles",
    keywords: ["hotel", "hoteleria", "mucama", "habitaciones", "limpieza", "recepcion", "turismo"],
    areas: ["Hoteleria", "Limpieza", "Atencion al cliente"],
    reason: "pueden necesitar gente para limpieza, habitaciones, recepcion, apoyo general o temporada.",
    message:
      "Hola, buen dia. Estoy buscando trabajo y tengo disponibilidad para apoyar en hoteleria, limpieza o atencion. Me gustaria saber si estan tomando personal.",
    tourismPriority: true,
  },
  {
    type: "Restaurantes",
    keywords: ["cocina", "mozo", "restaurante", "bar", "cafeteria", "bachero", "barista", "clientes"],
    areas: ["Gastronomia", "Atencion al cliente"],
    reason: "encajan con perfiles de cocina, salon, bacha, cafeteria o atencion al publico.",
    message:
      "Hola, buen dia. Estoy buscando trabajo en gastronomia. Tengo disponibilidad y puedo apoyar en cocina, salon, bacha o atencion. Quedo a las ordenes.",
    tourismPriority: true,
  },
  {
    type: "Supermercados",
    keywords: ["ventas", "caja", "reposicion", "repositor", "stock", "clientes", "comercio", "orden"],
    areas: ["Ventas", "Atencion al cliente", "Entrada laboral"],
    reason: "suelen tomar perfiles para caja, reposicion, atencion y tareas de entrada.",
    message:
      "Hola, buen dia. Estoy buscando trabajo y me interesa postularme para caja, reposicion o atencion. Tengo buena disponibilidad y ganas de trabajar.",
    entryLevel: true,
  },
  {
    type: "Comercios",
    keywords: ["ventas", "vendedor", "comercio", "local", "clientes", "atencion", "caja"],
    areas: ["Ventas", "Atencion al cliente"],
    reason: "son una buena opcion si tenes trato con clientes, ventas, caja o experiencia en local.",
    message:
      "Hola, buen dia. Estoy buscando trabajo en comercio. Tengo experiencia o interes en atencion al publico, ventas y tareas de local.",
    tourismPriority: true,
  },
  {
    type: "Edificios",
    keywords: ["edificio", "limpieza", "servicios", "mantenimiento", "porter", "orden"],
    areas: ["Limpieza", "Mantenimiento", "Seguridad"],
    reason: "pueden necesitar limpieza, porteria, mantenimiento basico o servicios generales.",
    message:
      "Hola, buen dia. Estoy buscando trabajo en edificios para limpieza, servicios generales o apoyo de mantenimiento. Tengo disponibilidad para coordinar.",
  },
  {
    type: "Empresas de limpieza",
    keywords: ["limpieza", "limpiar", "casas", "edificio", "servicios", "hotel", "mucama"],
    areas: ["Limpieza", "Hoteleria"],
    reason: "convienen si tenes experiencia limpiando, ordenando, trabajando en casas, hoteles o edificios.",
    message:
      "Hola, buen dia. Estoy buscando trabajo en limpieza. Tengo experiencia, responsabilidad y disponibilidad para distintos horarios o zonas.",
    entryLevel: true,
  },
  {
    type: "Empresas de seguridad",
    keywords: ["seguridad", "vigilancia", "porteria", "control", "noche", "responsable"],
    areas: ["Seguridad"],
    reason: "pueden servir si sos responsable, puntual y tenes disponibilidad para turnos.",
    message:
      "Hola, buen dia. Estoy buscando trabajo en seguridad, vigilancia o porteria. Tengo buena disponibilidad y responsabilidad para turnos.",
  },
  {
    type: "Inmobiliarias",
    keywords: ["administracion", "computadora", "recepcion", "telefono", "clientes", "agenda", "archivo"],
    areas: ["Administracion basica", "Atencion al cliente"],
    reason: "pueden necesitar apoyo administrativo, recepcion, agenda, llamadas o atencion a clientes.",
    message:
      "Hola, buen dia. Estoy buscando trabajo administrativo o de atencion. Puedo apoyar con recepcion, agenda, llamadas y tareas basicas.",
    tourismPriority: true,
  },
  {
    type: "Depositos/logistica",
    keywords: ["deposito", "logistica", "stock", "reparto", "carga", "descarga", "cadete", "libreta"],
    areas: ["Logistica", "Choferes", "Ventas"],
    reason: "encajan si tenes movilidad, libreta, experiencia en stock, reparto o tareas de deposito.",
    message:
      "Hola, buen dia. Estoy buscando trabajo en deposito, reparto o logistica. Tengo disponibilidad y puedo apoyar con stock, orden o entregas.",
    mobilityPriority: true,
  },
  {
    type: "Residenciales/cuidado de personas",
    keywords: ["cuidado", "adultos", "ninos", "acompanante", "salud", "personas", "paciente"],
    areas: ["Cuidado de personas"],
    reason: "pueden ser buena opcion si tenes paciencia, responsabilidad y experiencia cuidando personas.",
    message:
      "Hola, buen dia. Estoy buscando trabajo en cuidado o acompanamiento de personas. Soy responsable y tengo disponibilidad para coordinar horarios.",
  },
];

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function hasFormalExperience(text) {
  const cleanText = text.trim();
  if (!cleanText) return false;

  return !["no", "ninguna", "sin experiencia", "no tengo", "no tengo experiencia"].some((phrase) =>
    cleanText.includes(phrase),
  );
}

export function createRecommendationResult(profile) {
  const text = normalize(
    [
      profile.experience,
      profile.skills,
      profile.education,
      profile.availability,
      profile.workType,
      profile.interests?.join(" "),
    ].join(" "),
  );
  const interestText = normalize(profile.interests?.join(" "));
  const locationText = normalize(profile.location);
  const hasLicense = profile.hasLicense === "si";
  const hasTransport = profile.hasTransport === "si";
  const formalExperience = hasFormalExperience(normalize(profile.experience));
  const isTouristLocation = touristLocations.some((location) => locationText.includes(location));

  const scoredRoles = roles.map((role) => {
    let score = 0;
    const matches = role.keywords.filter((keyword) => text.includes(normalize(keyword)));
    score += matches.length * 2;

    if (interestText.includes(normalize(role.area))) score += 3;
    if (role.requiresLicense && hasLicense) score += 12;
    if (role.requiresMobility && (hasLicense || hasTransport)) score += 9;
    if (role.entryLevel && !formalExperience) score += 5;
    if (role.entryLevel && !formalExperience && defaultRoles.includes(role.title)) score += 3;
    if (role.tourismPriority && isTouristLocation) score += 3;
    if (profile.workType === "zafral" && role.area === "Trabajos zafrales") score += 4;
    if (profile.workType === "zafral" && role.tourismPriority && isTouristLocation) score += 2;
    if (profile.workType === "changas" && ["Trabajos zafrales", "Mantenimiento"].includes(role.area)) score += 2;

    return {
      ...role,
      score,
      matches,
      compatibility: score >= 8 ? "alto" : score >= 4 ? "medio" : "bajo",
    };
  });

  const ranked = scoredRoles
    .filter((role) => role.score > 0)
    .sort((a, b) => b.score - a.score || b.matches.length - a.matches.length || a.title.localeCompare(b.title));

  const fallback = defaultRoles
    .map((title) => scoredRoles.find((role) => role.title === title))
    .filter(Boolean);

  const recommendations = [...ranked, ...fallback]
    .filter((role, index, list) => list.findIndex((item) => item.title === role.title) === index)
    .slice(0, 5);

  return {
    summary: createProfileSummary(profile, recommendations),
    recommendations,
    advice: createAdvice(profile, recommendations),
    nextSteps: createNextSteps(profile, recommendations),
    companySuggestions: createCompanySuggestions(profile, recommendations, {
      text,
      interestText,
      isTouristLocation,
      hasLicense,
      hasTransport,
      formalExperience,
    }),
    whatsappMessage: createWhatsappMessage(profile, recommendations),
    miniCv: createMiniCv(profile, recommendations),
  };
}

function createCompanySuggestions(profile, recommendations, context) {
  const recommendedAreas = recommendations.map((item) => item.area);
  const scoredSuggestions = companySuggestions.map((suggestion) => {
    let score = 0;
    const matches = suggestion.keywords.filter((keyword) => context.text.includes(normalize(keyword)));
    score += matches.length * 2;
    score += suggestion.areas.filter((area) => recommendedAreas.includes(area)).length * 2;

    if (suggestion.areas.some((area) => context.interestText.includes(normalize(area)))) score += 2;
    if (suggestion.tourismPriority && context.isTouristLocation) score += 3;
    if (suggestion.mobilityPriority && (context.hasLicense || context.hasTransport)) score += 3;
    if (suggestion.entryLevel && !context.formalExperience) score += 2;

    return {
      ...suggestion,
      score,
      mapsTip: createMapsTip(profile.location, suggestion.type),
    };
  });

  const fallbackTypes = ["Comercios", "Supermercados", "Empresas de limpieza", "Depositos/logistica"];
  const fallback = fallbackTypes
    .map((type) => scoredSuggestions.find((suggestion) => suggestion.type === type))
    .filter(Boolean);

  return [...scoredSuggestions.filter((suggestion) => suggestion.score > 0), ...fallback]
    .filter((suggestion, index, list) => list.findIndex((item) => item.type === suggestion.type) === index)
    .sort((a, b) => b.score - a.score || a.type.localeCompare(b.type))
    .slice(0, 5);
}

function createMapsTip(location, type) {
  const place = location || "tu zona";
  return `Busca en Google Maps o Instagram: "${type} en ${place}" y escribile a los lugares cercanos.`;
}

function createProfileSummary(profile, recommendations) {
  const firstAreas = recommendations.map((item) => item.area).slice(0, 3).join(", ");
  const location = profile.location || "Uruguay";
  const availability = profile.availability || "disponibilidad a coordinar";
  return `${profile.name || "Tu perfil"} tiene experiencia y habilidades que pueden servir para ${firstAreas || "trabajos de entrada"}. La busqueda esta enfocada en ${location}, con ${availability}.`;
}

function createAdvice(profile, recommendations) {
  const advice = [
    "No necesitas tener un CV perfecto. Lo importante es contar claro que sabes hacer y cuando podes empezar.",
    "Manda un mensaje corto, educado y directo. En Uruguay eso pesa mucho.",
    "Si tenes referencias de trabajos anteriores, agregalas aunque hayan sido changas o trabajos informales.",
  ];

  if (profile.hasLicense === "si") advice.push("Menciona la libreta de conducir desde el primer mensaje.");
  if (profile.hasTransport === "si") advice.push("Aclara que tenes locomocion propia porque mejora tus chances.");
  if (recommendations.some((item) => item.compatibility === "bajo")) {
    advice.push("Para puestos con compatibilidad baja, proba sumar un curso corto o una experiencia puntual.");
  }

  return advice.slice(0, 5);
}

function createNextSteps(profile, recommendations) {
  const topRole = recommendations[0]?.title || "el puesto que mas te interese";
  const steps = [
    `Copia el mensaje de WhatsApp y mandalo a empresas que busquen ${topRole}.`,
    "Guarda el mini CV y revisa que nombre, zona, horarios y contacto esten bien.",
    "Prepara dos ejemplos simples de trabajos anteriores o tareas que hayas hecho bien.",
    "Anota tus horarios reales y las zonas donde podes moverte sin problema.",
  ];

  if (profile.hasLicense === "si") {
    steps.push("Tene a mano que libreta tenes y desde cuando manejas.");
  }

  return steps.slice(0, 5);
}

function createWhatsappMessage(profile, recommendations) {
  const name = profile.name || "mi nombre";
  const location = profile.location || "Uruguay";
  const topRole = recommendations[0]?.title || "el puesto";
  const availability = profile.availability || "disponibilidad a coordinar";
  const experience = profile.experience || "experiencia y muchas ganas de trabajar";

  return `Hola, buen dia. Mi nombre es ${name}, soy de ${location} y me interesa postularme para ${topRole}. Tengo experiencia en ${experience}. Cuento con ${availability}. Quedo a las ordenes para enviar mas informacion o coordinar una entrevista. Muchas gracias.`;
}

function createMiniCv(profile, recommendations) {
  const topRoles = recommendations.map((item) => item.title).join(", ");
  const transport = profile.hasTransport === "si" ? "Si" : "No";
  const license = profile.hasLicense === "si" ? "Si" : "No";

  return [
    `Nombre: ${profile.name || "Sin especificar"}`,
    `Ubicacion: ${profile.location || "Sin especificar"}`,
    profile.age ? `Edad: ${profile.age}` : null,
    `Experiencia: ${profile.experience || "Sin experiencia formal declarada"}`,
    `Tareas y habilidades: ${profile.skills || "Buena disposicion para aprender"}`,
    `Estudios: ${profile.education || "Sin especificar"}`,
    `Disponibilidad: ${profile.availability || "A coordinar"}`,
    `Locomocion propia: ${transport}`,
    `Libreta de conducir: ${license}`,
    `Puestos recomendados: ${topRoles}`,
    profile.contact ? `Contacto: ${profile.contact}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}
