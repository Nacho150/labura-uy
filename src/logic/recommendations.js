export const emptyProfile = {
  name: "",
  location: "",
  department: "",
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

const sectors = {
  sales: {
    area: "Atencion al cliente y ventas",
    companies: "Comercios, supermercados, tiendas, shoppings, farmacias, call centers y locales de barrio.",
    highlight: "Tu trato con clientes, responsabilidad, presencia, manejo de caja o ganas de aprender.",
  },
  hotel: {
    area: "Hoteleria y turismo",
    companies: "Hoteles, apart hoteles, hostels, inmobiliarias turisticas, complejos y empresas de temporada.",
    highlight: "Tu prolijidad, buena presencia, puntualidad y disponibilidad para fines de semana o temporada.",
  },
  food: {
    area: "Gastronomia",
    companies: "Restaurantes, bares, cafeterias, rotiserias, paradores, hoteles y empresas de eventos.",
    highlight: "Tu ritmo de trabajo, orden, buena disposicion y disponibilidad para horarios movidos.",
  },
  cleaning: {
    area: "Limpieza y servicios",
    companies: "Empresas de limpieza, edificios, oficinas, hoteles, casas particulares y servicios por hora.",
    highlight: "Tu prolijidad, confianza, rapidez, responsabilidad y referencias si las tenes.",
  },
  security: {
    area: "Seguridad y vigilancia",
    companies: "Empresas de seguridad, edificios, estacionamientos, eventos, porteria y control de acceso.",
    highlight: "Tu responsabilidad, puntualidad, presencia, atencion y disponibilidad para turnos.",
  },
  delivery: {
    area: "Choferes, cadetes y reparto",
    companies: "Cadeterias, delivery, farmacias, supermercados, distribuidoras, comercios y empresas de reparto.",
    highlight: "Tu libreta, locomocion, conocimiento de zonas, puntualidad y cuidado con la mercaderia.",
  },
  trades: {
    area: "Construccion y oficios",
    companies: "Obras, reformas, barracas, empresas de mantenimiento, particulares y servicios por dia.",
    highlight: "Las herramientas que sabes usar, trabajos realizados, puntualidad y fuerza si aplica.",
  },
  maintenance: {
    area: "Mantenimiento y edificios",
    companies: "Edificios, complejos, hoteles, clubes, inmobiliarias, administradores y casas particulares.",
    highlight: "Tu capacidad para resolver tareas basicas, cuidar espacios comunes y trabajar con orden.",
  },
  admin: {
    area: "Administracion basica",
    companies: "Oficinas, inmobiliarias, consultorios, comercios, estudios, recepciones y empresas chicas.",
    highlight: "Tu orden, comunicacion, computadora basica, agenda, datos y atencion telefonica.",
  },
  care: {
    area: "Cuidado de personas",
    companies: "Residenciales, familias, cuidados domiciliarios, acompanamiento y servicios por hora.",
    highlight: "Tu paciencia, responsabilidad, confianza, trato humano y disponibilidad horaria.",
  },
  pets: {
    area: "Mascotas y hogar",
    companies: "Familias, vecinos, veterinarias, paseos por zona, casas particulares y redes barriales.",
    highlight: "Tu confianza, cuidado, responsabilidad y experiencia con mascotas o tareas del hogar.",
  },
  events: {
    area: "Eventos y temporada",
    companies: "Organizadoras de eventos, salones, fiestas, paradores, hoteles, seguridad y promociones.",
    highlight: "Tu disponibilidad, energia, puntualidad y flexibilidad para trabajos eventuales.",
  },
  rural: {
    area: "Campo, rural y exterior",
    companies: "Chacras, viveros, campos, quintas, predios, empresas rurales y trabajos zafrales.",
    highlight: "Tu resistencia, experiencia al aire libre, cuidado de animales o mantenimiento de predios.",
  },
  logistics: {
    area: "Deposito y logistica",
    companies: "Depositos, supermercados, distribuidoras, e-commerce, cargas, pedidos y centros logisticos.",
    highlight: "Tu orden, fuerza si aplica, puntualidad, control de stock y disposicion para moverte.",
  },
  digital: {
    area: "Trabajos digitales simples",
    companies: "Comercios, emprendimientos, ventas por redes, marketplaces, oficinas y atencion online.",
    highlight: "Tu manejo de WhatsApp, redes, computadora basica, escritura clara y respuesta a clientes.",
  },
  gigs: {
    area: "Changas y cuenta propia",
    companies: "Vecinos, comercios cercanos, grupos barriales, Instagram, WhatsApp, Google Maps y conocidos.",
    highlight: "Tu disponibilidad, confianza, rapidez para responder y tareas concretas que podes resolver.",
  },
};

const roleCatalog = [
  role("Vendedor/a", "sales", ["ventas", "vendedor", "comercio", "local", "mostrador", "clientes"], "fijo", "basico", "ventas"),
  role("Cajero/a", "sales", ["caja", "cajero", "cobro", "pos", "efectivo", "supermercado"], "fijo", "intermedio", "caja"),
  role("Repositor/a", "sales", ["reposicion", "repositor", "stock", "supermercado", "orden", "mercaderia"], "fijo", "basico", "reposicion"),
  role("Atencion al publico", "sales", ["atencion", "publico", "clientes", "consultas", "reclamos"], "fijo", "basico", "atencion"),
  role("Promotor/a", "sales", ["promotor", "promocion", "ventas", "evento", "publico"], "zafral o eventual", "basico", "promocion"),
  role("Recepcionista", "sales", ["recepcion", "telefono", "agenda", "clientes", "computadora"], "fijo", "intermedio", "recepcion"),
  role("Teleoperador/a o call center", "sales", ["telefono", "call", "center", "ventas", "consultas", "reclamos"], "fijo", "basico", "telefono"),
  role("Atencion por WhatsApp", "digital", ["whatsapp", "clientes", "mensajes", "redes", "respuesta"], "fijo o changa", "basico", "digital"),
  role("Ventas por redes sociales", "digital", ["redes", "instagram", "facebook", "marketplace", "publicaciones", "ventas"], "changa o fijo", "basico", "digital"),

  role("Recepcionista de hotel", "hotel", ["hotel", "recepcion", "turismo", "huespedes", "reservas"], "fijo o zafral", "intermedio", "hotel"),
  role("Mucama", "hotel", ["mucama", "hotel", "habitaciones", "limpieza", "camas"], "fijo o zafral", "basico", "hotel-limpieza"),
  role("Auxiliar de limpieza hotelera", "hotel", ["hotel", "limpieza", "habitaciones", "servicios", "temporada"], "fijo o zafral", "basico", "hotel-limpieza"),
  role("Bellboy / maletero", "hotel", ["hotel", "maletero", "bellboy", "huespedes", "equipaje"], "zafral o fijo", "basico", "hotel"),
  role("Mozo/a de desayuno", "hotel", ["hotel", "desayuno", "mozo", "salon", "cafeteria"], "zafral o fijo", "basico", "hotel-food"),
  role("Auxiliar de reservas", "hotel", ["reservas", "hotel", "telefono", "computadora", "agenda"], "fijo", "intermedio", "hotel-admin"),
  role("Personal zafral de temporada", "events", ["temporada", "zafral", "verano", "turismo", "evento"], "zafral", "basico", "temporada"),

  role("Mozo/a", "food", ["mozo", "restaurante", "bar", "salon", "bandeja", "clientes"], "fijo o zafral", "basico", "salon"),
  role("Ayudante de cocina", "food", ["cocina", "ayudante", "preparacion", "comida", "restaurante"], "fijo o zafral", "basico", "cocina"),
  role("Bachero/a", "food", ["bachero", "bacha", "lavado", "cocina", "limpieza"], "fijo o zafral", "basico", "bacha"),
  role("Barista", "food", ["barista", "cafe", "cafeteria", "mostrador", "bebidas"], "fijo", "intermedio", "barista"),
  role("Delivery gastronomico", "delivery", ["delivery", "moto", "bicicleta", "reparto", "comida"], "fijo o changa", "basico", "delivery", { mobility: true }),
  role("Pizzero/a o parrillero/a", "food", ["pizza", "pizzero", "parrilla", "parrillero", "cocina"], "fijo o zafral", "con experiencia", "cocina"),
  role("Personal para eventos", "events", ["evento", "fiesta", "salon", "mozo", "apoyo"], "changa o zafral", "basico", "eventos"),

  role("Auxiliar de limpieza", "cleaning", ["limpieza", "limpiar", "orden", "servicios", "oficinas"], "fijo o changa", "basico", "limpieza"),
  role("Limpieza de casas", "cleaning", ["limpieza", "casas", "domestica", "hogar", "planchado"], "changa", "basico", "limpieza-hogar"),
  role("Limpieza de edificios", "cleaning", ["edificio", "limpieza", "areas comunes", "porter", "servicios"], "fijo o changa", "basico", "limpieza-edificios"),
  role("Limpieza post obra", "cleaning", ["post obra", "obra", "limpieza", "polvo", "construccion"], "changa", "intermedio", "limpieza-obra"),
  role("Lavanderia y planchado", "cleaning", ["lavanderia", "plancha", "planchado", "ropa", "hotel"], "fijo o changa", "basico", "lavanderia"),

  role("Guardia de seguridad", "security", ["seguridad", "guardia", "vigilancia", "control", "turnos"], "fijo", "intermedio", "seguridad"),
  role("Sereno", "security", ["sereno", "noche", "vigilancia", "seguridad", "predio"], "fijo", "basico", "seguridad"),
  role("Porteria / control de acceso", "security", ["porteria", "control", "acceso", "edificio", "recepcion"], "fijo", "basico", "porteria"),
  role("Seguridad para eventos", "events", ["seguridad", "eventos", "control", "ingreso", "fiestas"], "changa o zafral", "basico", "eventos"),

  role("Chofer", "delivery", ["chofer", "camioneta", "camion", "manejo", "conduccion"], "fijo", "con experiencia", "chofer", { license: true }),
  role("Repartidor/a", "delivery", ["reparto", "repartidor", "moto", "auto", "entregas"], "fijo o changa", "basico", "reparto", { mobility: true }),
  role("Cadete", "delivery", ["cadete", "mandados", "tramites", "moto", "bicicleta"], "fijo o changa", "basico", "cadete", { mobility: true }),
  role("Auxiliar de logistica", "logistics", ["logistica", "deposito", "stock", "pedidos", "carga"], "fijo", "basico", "logistica"),
  role("Peon de reparto", "delivery", ["reparto", "carga", "descarga", "mercaderia", "camioneta"], "fijo", "basico", "reparto"),

  role("Peon de obra", "trades", ["obra", "construccion", "peon", "albanil", "carga"], "fijo o changa", "basico", "obra"),
  role("Albanil o ayudante", "trades", ["albanil", "obra", "mezcla", "ladrillo", "construccion"], "fijo o changa", "con experiencia", "obra"),
  role("Pintor o ayudante de pintura", "trades", ["pintura", "pintor", "pared", "lijar", "rodillo"], "changa o fijo", "basico", "pintura"),
  role("Electricista basico", "trades", ["electricidad", "electricista", "luces", "cables", "enchufe"], "changa o fijo", "intermedio", "electricidad"),
  role("Sanitario basico", "trades", ["sanitaria", "caneria", "agua", "bano", "arreglos"], "changa o fijo", "intermedio", "sanitaria"),
  role("Jardinero / cortador de pasto", "trades", ["jardin", "jardineria", "pasto", "cortar", "predio"], "changa o fijo", "basico", "jardin"),
  role("Piscinero", "maintenance", ["piscina", "piscinero", "agua", "mantenimiento", "complejo"], "changa o fijo", "intermedio", "piscina"),
  role("Mantenimiento general", "maintenance", ["mantenimiento", "arreglos", "herramientas", "reparaciones", "luces"], "fijo o changa", "intermedio", "mantenimiento"),
  role("Encargado de edificio", "maintenance", ["edificio", "portero", "mantenimiento", "areas comunes", "bombas"], "fijo", "intermedio", "edificio"),

  role("Auxiliar administrativo", "admin", ["administracion", "oficina", "archivo", "facturacion", "datos"], "fijo", "basico", "admin"),
  role("Data entry", "admin", ["datos", "data", "entry", "computadora", "planillas", "excel"], "fijo o changa", "basico", "datos"),
  role("Recepcionista administrativa", "admin", ["recepcion", "agenda", "telefono", "email", "oficina"], "fijo", "intermedio", "admin"),
  role("Agenda de turnos", "admin", ["turnos", "agenda", "telefono", "whatsapp", "consultorio"], "fijo", "basico", "admin"),

  role("Cuidador/a de adultos mayores", "care", ["adultos", "mayores", "cuidado", "acompanante", "paciente"], "fijo o por horas", "intermedio", "cuidados"),
  role("Acompanante", "care", ["acompanante", "cuidado", "personas", "salud", "noche"], "fijo o por horas", "basico", "cuidados"),
  role("Ninera", "care", ["ninos", "ninera", "cuidado", "familia", "escuela"], "por horas o fijo", "intermedio", "ninos"),
  role("Apoyo domiciliario", "care", ["domicilio", "cuidado", "adultos", "acompanar", "asistencia"], "por horas o fijo", "basico", "cuidados"),

  role("Paseador/a de perros", "pets", ["perros", "mascotas", "paseo", "animales", "barrio"], "changa", "basico", "mascotas"),
  role("Pet sitter / cuidado de mascotas", "pets", ["mascotas", "animales", "perros", "gatos", "cuidado"], "changa", "basico", "mascotas"),
  role("Casero/a o cuidado de casas", "pets", ["casero", "casa", "hogar", "mantenimiento", "predio"], "fijo o changa", "intermedio", "hogar"),
  role("Mandados", "gigs", ["mandados", "tramites", "compras", "barrio", "cadete"], "changa", "basico", "mandados"),

  role("Armado de eventos", "events", ["eventos", "armado", "sillas", "mesas", "fiestas"], "changa o zafral", "basico", "eventos"),
  role("Acreditacion y control de ingreso", "events", ["acreditacion", "control", "ingreso", "evento", "publico"], "changa", "basico", "eventos"),
  role("Atencion en playa/paradores", "events", ["playa", "parador", "temporada", "verano", "turismo"], "zafral", "basico", "temporada"),

  role("Peon rural", "rural", ["campo", "rural", "peon", "chacra", "animales"], "fijo o zafral", "basico", "rural"),
  role("Viveros y riego", "rural", ["vivero", "riego", "plantas", "jardin", "chacra"], "fijo o zafral", "basico", "rural"),
  role("Mantenimiento de predios", "rural", ["predio", "terreno", "alambrado", "limpieza", "pasto"], "changa o fijo", "basico", "rural"),

  role("Auxiliar de deposito", "logistics", ["deposito", "stock", "orden", "mercaderia", "carga"], "fijo", "basico", "deposito"),
  role("Picking / packing", "logistics", ["picking", "packing", "pedidos", "ecommerce", "deposito"], "fijo", "basico", "deposito"),
  role("Carga y descarga", "logistics", ["carga", "descarga", "camion", "deposito", "fuerza"], "fijo o changa", "basico", "deposito"),
  role("Armado de pedidos", "logistics", ["pedidos", "stock", "deposito", "orden", "packing"], "fijo", "basico", "deposito"),

  role("Asistente virtual basico", "digital", ["asistente", "virtual", "computadora", "whatsapp", "email"], "changa o fijo", "basico", "digital"),
  role("Publicacion de productos", "digital", ["publicaciones", "productos", "redes", "marketplace", "fotos"], "changa o fijo", "basico", "digital"),
  role("Respuesta a clientes por redes", "digital", ["redes", "clientes", "mensajes", "instagram", "whatsapp"], "changa o fijo", "basico", "digital"),

  role("Limpieza por hora", "gigs", ["changa", "por hora", "limpieza", "casas", "oficinas"], "changa", "basico", "limpieza-hogar"),
  role("Fletes pequenos", "gigs", ["flete", "mudanza", "camioneta", "carga", "traslado"], "changa", "basico", "fletes", { mobility: true }),
  role("Ayuda en mudanzas", "gigs", ["mudanza", "carga", "ayuda", "muebles", "flete"], "changa", "basico", "mudanzas"),
  role("Armado de muebles", "gigs", ["muebles", "armado", "herramientas", "reparaciones", "hogar"], "changa", "intermedio", "muebles"),
  role("Lavado de autos", "gigs", ["autos", "lavado", "limpieza", "vehiculos"], "changa", "basico", "autos"),
  role("Cocina casera por pedido", "gigs", ["cocina", "comida", "pedido", "casera", "tortas"], "changa", "intermedio", "cocina-casera"),
];

const touristLocations = ["maldonado", "punta del este", "punta", "san carlos", "piriapolis", "la barra", "jose ignacio", "rocha", "colonia", "atlantida"];
const noExperienceWords = ["sin experiencia", "no tengo experiencia", "ninguna", "primera oportunidad", "primer trabajo"];
const changaSectors = ["gigs", "cleaning", "trades", "pets", "care", "events", "delivery"];
const touristSectors = ["hotel", "food", "events", "cleaning", "maintenance", "sales"];
const entryFamilies = ["reposicion", "limpieza", "cadete", "bacha", "deposito", "atencion", "temporada"];

const companySuggestions = [
  suggestion("Hoteles", ["hotel", "hoteleria", "mucama", "habitaciones", "recepcion", "turismo"], ["Hoteleria y turismo", "Limpieza y servicios"], "pueden necesitar limpieza, habitaciones, recepcion, lavanderia, desayuno o apoyo de temporada."),
  suggestion("Restaurantes", ["cocina", "mozo", "restaurante", "bar", "cafeteria", "bachero"], ["Gastronomia"], "encajan con cocina, salon, bacha, cafeteria, caja gastronomica o eventos."),
  suggestion("Supermercados", ["ventas", "caja", "reposicion", "stock", "supermercado"], ["Atencion al cliente y ventas", "Deposito y logistica"], "suelen tomar perfiles para caja, reposicion, deposito, atencion y tareas de entrada."),
  suggestion("Comercios", ["ventas", "local", "clientes", "mostrador", "whatsapp"], ["Atencion al cliente y ventas", "Trabajos digitales simples"], "son una buena opcion para atencion, ventas, mostrador o respuesta por WhatsApp."),
  suggestion("Edificios", ["edificio", "porteria", "limpieza", "mantenimiento"], ["Limpieza y servicios", "Mantenimiento y edificios", "Seguridad y vigilancia"], "pueden necesitar limpieza, porteria, mantenimiento basico o control de acceso."),
  suggestion("Empresas de limpieza", ["limpieza", "casas", "oficinas", "edificios"], ["Limpieza y servicios"], "convienen si tenes experiencia limpiando, ordenando o trabajando por hora."),
  suggestion("Empresas de seguridad", ["seguridad", "vigilancia", "sereno", "porteria"], ["Seguridad y vigilancia"], "pueden servir si sos responsable, puntual y tenes disponibilidad para turnos."),
  suggestion("Inmobiliarias", ["administracion", "recepcion", "telefono", "clientes", "agenda"], ["Administracion basica", "Atencion al cliente y ventas"], "pueden necesitar recepcion, agenda, llamadas, atencion y apoyo administrativo."),
  suggestion("Depositos/logistica", ["deposito", "logistica", "stock", "reparto", "carga"], ["Deposito y logistica", "Choferes, cadetes y reparto"], "encajan con stock, armado de pedidos, reparto, carga o apoyo operativo."),
  suggestion("Residenciales/cuidado de personas", ["cuidado", "adultos", "ninos", "acompanante"], ["Cuidado de personas"], "pueden ser buena opcion si tenes paciencia, responsabilidad y experiencia cuidando personas."),
  suggestion("Casas particulares y vecinos", ["changa", "limpieza", "pasto", "mascotas", "mandados"], ["Changas y cuenta propia", "Mascotas y hogar"], "sirven para empezar con changas por hora, tareas del hogar, mascotas o mandados."),
];

function role(title, sectorKey, keywords, workMode, level, family, flags = {}) {
  return {
    title,
    sectorKey,
    area: sectors[sectorKey].area,
    keywords,
    workMode,
    level,
    family,
    ...flags,
  };
}

function suggestion(type, keywords, areas, reason) {
  return {
    type,
    keywords,
    areas,
    reason,
    message: `Hola, buen dia. Estoy buscando trabajo y me interesa postularme en ${type}. Tengo disponibilidad y puedo enviar mi perfil si estan tomando personal.`,
  };
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function hasRealExperience(text) {
  const clean = normalize(text);
  if (!clean.trim()) return false;
  return !noExperienceWords.some((word) => clean.includes(word));
}

export function createRecommendationResult(profile) {
  const context = buildContext(profile);
  const scored = roleCatalog
    .map((item) => scoreRole(item, profile, context))
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  const selected = selectDiverse(scored, context);
  const recommendations = selected.map((item) => enrichRole(item, context));
  const secondaryOptions = scored
    .filter((item) => !selected.some((selectedItem) => selectedItem.title === item.title))
    .filter((item) => item.score > 2)
    .slice(0, 14)
    .map((item) => ({ title: item.title, area: item.area }));

  return {
    summary: createProfileSummary(profile, recommendations, context),
    recommendations,
    secondaryOptions,
    advice: createAdvice(profile, recommendations, context),
    nextSteps: createNextSteps(profile, recommendations),
    companySuggestions: createCompanySuggestions(profile, recommendations, context),
    whatsappMessage: createWhatsappMessage(profile, recommendations),
    miniCv: createMiniCv(profile, recommendations),
  };
}

function buildContext(profile) {
  const text = normalize([
    profile.experience,
    profile.skills,
    profile.education,
    profile.availability,
    profile.workType,
    profile.location,
    profile.department,
    profile.interests?.join(" "),
  ].join(" "));

  return {
    text,
    interestText: normalize(profile.interests?.join(" ")),
    locationText: normalize([profile.location, profile.department].join(" ")),
    hasLicense: profile.hasLicense === "si",
    hasTransport: profile.hasTransport === "si",
    workType: profile.workType || "cualquiera",
    hasExperience: hasRealExperience(profile.experience),
    isTouristLocation: touristLocations.some((location) => text.includes(location)),
    wantsChangas: profile.workType === "changas" || text.includes("changa") || text.includes("por hora"),
    wantsSeasonal: profile.workType === "zafral" || text.includes("zafral") || text.includes("temporada"),
  };
}

function scoreRole(item, profile, context) {
  let score = 0;
  const matches = item.keywords.filter((keyword) => context.text.includes(normalize(keyword)));
  score += matches.length * 4;

  if (context.interestText.includes(normalize(item.area))) score += 8;
  if (context.interestText.includes(normalize(sectors[item.sectorKey].area.split(" ")[0]))) score += 4;
  if (item.license && context.hasLicense) score += 14;
  if (item.mobility && (context.hasLicense || context.hasTransport)) score += 12;
  if ((context.hasLicense || context.hasTransport) && ["delivery", "logistics", "gigs"].includes(item.sectorKey)) score += 4;
  if (context.isTouristLocation && touristSectors.includes(item.sectorKey)) score += 7;
  if (context.wantsChangas && changaSectors.includes(item.sectorKey)) score += 8;
  if (context.wantsSeasonal && ["hotel", "food", "events", "cleaning", "sales"].includes(item.sectorKey)) score += 7;
  if (!context.hasExperience && (item.level === "basico" || entryFamilies.includes(item.family))) score += 8;
  if (context.text.includes("noche") && ["security", "care", "food"].includes(item.sectorKey)) score += 2;
  if (context.text.includes("fines de semana") && ["food", "hotel", "events", "sales"].includes(item.sectorKey)) score += 2;
  if (profile.workType === "fijo" && item.workMode.includes("fijo")) score += 3;

  if (item.license && !context.hasLicense) score -= 8;
  if (item.mobility && !context.hasLicense && !context.hasTransport) score -= 3;

  return {
    ...item,
    score,
    matches,
    compatibility: score >= 16 ? "alto" : score >= 8 ? "medio" : "bajo",
  };
}

function selectDiverse(scored, context) {
  const useful = scored.filter((item) => item.score > 0);
  const fallback = roleCatalog
    .filter((item) => ["Auxiliar de limpieza", "Repositor/a", "Atencion al publico", "Cadete", "Personal zafral de temporada", "Auxiliar de deposito"].includes(item.title))
    .map((item) => scoreRole(item, {}, context));
  const pool = [...useful, ...fallback].filter((item, index, list) => list.findIndex((other) => other.title === item.title) === index);
  const selected = [];
  const families = new Map();
  const sectorsCount = new Map();

  for (const item of pool.sort((a, b) => b.score - a.score)) {
    if (selected.length >= 8) break;
    const familyCount = families.get(item.family) || 0;
    const sectorCount = sectorsCount.get(item.sectorKey) || 0;
    if (familyCount >= 1 && selected.length < 5) continue;
    if (sectorCount >= 2 && selected.length < 6) continue;
    selected.push(item);
    families.set(item.family, familyCount + 1);
    sectorsCount.set(item.sectorKey, sectorCount + 1);
  }

  return selected.slice(0, Math.max(5, Math.min(8, selected.length)));
}

function enrichRole(item, context) {
  const sector = sectors[item.sectorKey];
  return {
    ...item,
    reason: createReason(item, context),
    highlight: sector.highlight,
    companies: sector.companies,
    tip: createTip(item, context),
  };
}

function createReason(item, context) {
  if (!context.hasExperience && item.level === "basico") {
    return "Puede servirte como entrada si estas buscando empezar rapido y mostrar responsabilidad, disponibilidad y ganas de aprender.";
  }
  if (item.matches.length) {
    return `Con lo que contaste, aparecen senales relacionadas con ${item.matches.slice(0, 3).join(", ")}. Por eso este puesto podria encajar contigo.`;
  }
  if (context.isTouristLocation && touristSectors.includes(item.sectorKey)) {
    return "Tu zona puede tener demanda en turismo, temporada, servicios, gastronomia u hoteleria.";
  }
  return "Tu experiencia tambien suma, aunque no haya sido en una empresa formal. Este puesto puede ser una opcion real para explorar.";
}

function createTip(item, context) {
  if (context.wantsChangas) return "Podrias ofrecerte por WhatsApp, en comercios cercanos, grupos barriales o buscando empresas de tu zona.";
  if (item.mobility || item.license) return "Aclaralo desde el primer mensaje: libreta, locomocion, zonas donde te moves y horarios.";
  if (item.level === "basico") return "Mostra buena actitud, puntualidad, disponibilidad y tareas concretas que ya hiciste.";
  return "Conta ejemplos simples y concretos de trabajos anteriores, aunque hayan sido changas o tareas informales.";
}

function createCompanySuggestions(profile, recommendations, context) {
  const areas = recommendations.map((item) => item.area);
  return companySuggestions
    .map((item) => {
      const keywordScore = item.keywords.filter((keyword) => context.text.includes(normalize(keyword))).length * 2;
      const areaScore = item.areas.filter((area) => areas.includes(area)).length * 3;
      const locationScore = context.isTouristLocation && ["Hoteles", "Restaurantes"].includes(item.type) ? 3 : 0;
      return {
        ...item,
        score: keywordScore + areaScore + locationScore,
        mapsTip: `Busca en Google Maps o Instagram: "${item.type} en ${profile.location || "tu zona"}" y escribile a lugares cercanos.`,
      };
    })
    .sort((a, b) => b.score - a.score || a.type.localeCompare(b.type))
    .slice(0, 6);
}

function createProfileSummary(profile, recommendations, context) {
  const areas = [...new Set(recommendations.map((item) => item.area))].slice(0, 3).join(", ");
  const location = [profile.location, profile.department].filter(Boolean).join(", ") || "Uruguay";
  const base = `${profile.name || "Tu perfil"} tiene informacion que puede servir para ${areas || "trabajos de entrada"} en ${location}.`;
  if (!context.hasExperience) return `${base} Si no tenes experiencia formal, igual podes destacar responsabilidad, disponibilidad y ganas de aprender.`;
  return `${base} Con lo que contaste, estas oportunidades podrian encajar contigo y ayudarte a postularte mejor.`;
}

function createAdvice(profile, recommendations, context) {
  const advice = [
    "No necesitas tener un CV perfecto. Lo importante es contar claro que sabes hacer y cuando podes empezar.",
    "Tu experiencia tambien suma, aunque haya sido informal, zafral, familiar o por changas.",
    "Manda un mensaje corto, educado y directo. En Uruguay eso ayuda mucho.",
  ];
  if (!context.hasExperience) advice.push("Si estas empezando, destaca puntualidad, buena actitud y ganas de aprender.");
  if (profile.hasLicense === "si") advice.push("Menciona la libreta de conducir desde el primer mensaje.");
  if (profile.hasTransport === "si") advice.push("Aclara que tenes locomocion propia porque puede abrir opciones de reparto, cadeteria o zonas mas lejanas.");
  if (recommendations.some((item) => item.workMode.includes("changa"))) advice.push("Para changas, ofrece tareas concretas, precio a coordinar y zonas donde podes moverte.");
  return advice.slice(0, 6);
}

function createNextSteps(profile, recommendations) {
  const topRole = recommendations[0]?.title || "el puesto que mas te interese";
  return [
    `Copia el mensaje de WhatsApp y adaptalo para postularte a ${topRole}.`,
    "Busca empresas cercanas en Google Maps, Instagram o comercios de tu zona.",
    "Guarda tu mini CV y revisa que horarios, zona y contacto esten bien.",
    "Prepara dos ejemplos simples de tareas que hiciste bien, aunque hayan sido changas.",
    "Actualiza tu perfil cuando cambie tu disponibilidad o sumes experiencia.",
  ];
}

function createWhatsappMessage(profile, recommendations) {
  const name = profile.name || "mi nombre";
  const location = profile.location || "Uruguay";
  const topRole = recommendations[0]?.title || "el puesto";
  const availability = profile.availability || "disponibilidad a coordinar";
  const experience = profile.experience || "buena disposicion y ganas de trabajar";
  return `Hola, buen dia. Mi nombre es ${name}, soy de ${location} y me interesa postularme para ${topRole}. Tengo experiencia o habilidades en ${experience}. Cuento con ${availability}. Quedo a las ordenes para enviar mas informacion o coordinar una entrevista. Muchas gracias.`;
}

function createMiniCv(profile, recommendations) {
  const topRoles = recommendations.map((item) => item.title).join(", ");
  return [
    `Nombre: ${profile.name || "Sin especificar"}`,
    `Ubicacion: ${profile.location || "Sin especificar"}`,
    profile.department ? `Departamento: ${profile.department}` : null,
    profile.age ? `Edad: ${profile.age}` : null,
    `Experiencia: ${profile.experience || "Sin experiencia formal declarada"}`,
    `Tareas y habilidades: ${profile.skills || "Buena disposicion para aprender"}`,
    `Estudios: ${profile.education || "Sin especificar"}`,
    `Disponibilidad: ${profile.availability || "A coordinar"}`,
    `Tipo de trabajo buscado: ${profile.workType || "cualquiera"}`,
    `Locomocion propia: ${profile.hasTransport === "si" ? "Si" : "No"}`,
    `Libreta de conducir: ${profile.hasLicense === "si" ? "Si" : "No"}`,
    `Puestos recomendados: ${topRoles}`,
    profile.contact ? `Contacto: ${profile.contact}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}
