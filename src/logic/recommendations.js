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
    area: "Atención al cliente y ventas",
    companies: "Comercios, supermercados, tiendas, shoppings, farmacias, call centers y locales de barrio.",
    highlight: "Tu trato con clientes, responsabilidad, presencia, manejo de caja o ganas de aprender.",
  },
  hotel: {
    area: "Hotelería y turismo",
    companies: "Hoteles, apart hoteles, hostels, inmobiliarias turísticas, complejos y empresas de temporada.",
    highlight: "Tu prolijidad, buena presencia, puntualidad y disponibilidad para fines de semana o temporada.",
  },
  food: {
    area: "Gastronomía",
    companies: "Restaurantes, bares, cafeterías, rotiserías, paradores, hoteles y empresas de eventos.",
    highlight: "Tu ritmo de trabajo, orden, buena disposición y disponibilidad para horarios movidos.",
  },
  cleaning: {
    area: "Limpieza y servicios",
    companies: "Empresas de limpieza, edificios, oficinas, hoteles, casas particulares y servicios por hora.",
    highlight: "Tu prolijidad, confianza, rapidez, responsabilidad y referencias si las tenés.",
  },
  security: {
    area: "Seguridad y vigilancia",
    companies: "Empresas de seguridad, edificios, estacionamientos, eventos, portería y control de acceso.",
    highlight: "Tu responsabilidad, puntualidad, presencia, atención y disponibilidad para turnos.",
  },
  delivery: {
    area: "Choferes, cadetes y reparto",
    companies: "Cadeterías, delivery, farmacias, supermercados, distribuidoras, comercios y empresas de reparto.",
    highlight: "Tu libreta, locomoción, conocimiento de zonas, puntualidad y cuidado con la mercadería.",
  },
  trades: {
    area: "Construcción y oficios",
    companies: "Obras, reformas, barracós, empresas de mantenimiento, particulares y servicios por día.",
    highlight: "Las herramientas que sabés usar, trabajos realizados, puntualidad y fuerza si aplica.",
  },
  maintenance: {
    area: "Mantenimiento y edificios",
    companies: "Edificios, complejos, hoteles, clubes, inmobiliarias, administradores y casas particulares.",
    highlight: "Tu capacidad para resolver tareas básicas, cuidar espacios comunes y trabajar con orden.",
  },
  admin: {
    area: "Administración básica",
    companies: "Oficinas, inmobiliarias, consultorios, comercios, estudios, recepciónes y empresas chicas.",
    highlight: "Tu orden, comunicación, computadora básica, agenda, datos y atención telefónica.",
  },
  care: {
    area: "Cuidado de personas",
    companies: "Residenciales, familias, cuidados domiciliarios, acompañamiento y servicios por hora.",
    highlight: "Tu paciencia, responsabilidad, confianza, trato humano y disponibilidad horaria.",
  },
  pets: {
    area: "Mascotas y hogar",
    companies: "Familias, vecinos, veterinarias, paseos por zona, casas particulares y redes barriales.",
    highlight: "Tu confianza, cuidado, responsabilidad y experiencia con mascotas o tareas del hogar.",
  },
  events: {
    area: "Eventos y temporada",
    companies: "Organizadoras de eventos, salónes, fiestas, paradores, hoteles, seguridad y promociónes.",
    highlight: "Tu disponibilidad, energía, puntualidad y flexibilidad para trabajos eventuales.",
  },
  rural: {
    area: "Campo, rural y exterior",
    companies: "Chacras, viveros, campos, quintas, predios, empresas rurales y trabajos zafrales.",
    highlight: "Tu resistencia, experiencia al aire libre, cuidado de animales o mantenimiento de predios.",
  },
  logistics: {
    area: "Depósito y logística",
    companies: "Depósitos, supermercados, distribuidoras, e-commerce, cargas, pedidos y centros logisticos.",
    highlight: "Tu orden, fuerza si aplica, puntualidad, control de stock y disposición para moverte.",
  },
  digital: {
    area: "Trabajos digitales simples",
    companies: "Comercios, emprendimientos, ventas por redes, marketplaces, oficinas y atención online.",
    highlight: "Tu manejo de WhatsApp, redes, computadora básica, escritura clara y respuesta a clientes.",
  },
  gigs: {
    area: "Changas y cuenta propia",
    companies: "Vecinos, comercios cercanos, grupos barriales, Instagram, WhatsApp, Google Maps y conocidos.",
    highlight: "Tu disponibilidad, confianza, rapidez para responder y tareas concretas que podés resolver.",
  },
};

const roleCatalog = [
  role("Vendedor/a", "sales", ["ventas", "vendedor", "comercio", "local", "mostrador", "clientes"], "fijo", "básico", "ventas"),
  role("Cajero/a", "sales", ["caja", "cajero", "cobro", "pos", "efectivo", "supermercado"], "fijo", "intermedio", "caja"),
  role("Repositor/a", "sales", ["reposición", "repositor", "stock", "supermercado", "orden", "mercadería"], "fijo", "básico", "reposición"),
  role("Atención al público", "sales", ["atención", "público", "clientes", "consultas", "reclamos"], "fijo", "básico", "atención"),
  role("Promotor/a", "sales", ["promotor", "promoción", "ventas", "evento", "público"], "zafral o eventual", "básico", "promoción"),
  role("Recepcionista", "sales", ["recepción", "teléfono", "agenda", "clientes", "computadora"], "fijo", "intermedio", "recepción"),
  role("Teleoperador/a o call center", "sales", ["teléfono", "call", "center", "ventas", "consultas", "reclamos"], "fijo", "básico", "teléfono"),
  role("Atención por WhatsApp", "digital", ["WhatsApp", "clientes", "mensajes", "redes", "respuesta"], "fijo o changa", "básico", "digital"),
  role("Ventas por redes sociales", "digital", ["redes", "instagram", "facebook", "marketplace", "publicaciones", "ventas"], "changa o fijo", "básico", "digital"),

  role("Recepcionista de hotel", "hotel", ["hotel", "recepción", "turismo", "huespedes", "reservas"], "fijo o zafral", "intermedio", "hotel"),
  role("Mucama", "hotel", ["mucama", "hotel", "habitaciones", "limpieza", "camas"], "fijo o zafral", "básico", "hotel-limpieza"),
  role("Auxiliar de limpieza hotelera", "hotel", ["hotel", "limpieza", "habitaciones", "servicios", "temporada"], "fijo o zafral", "básico", "hotel-limpieza"),
  role("Bellboy / maletero", "hotel", ["hotel", "maletero", "bellboy", "huespedes", "equipaje"], "zafral o fijo", "básico", "hotel"),
  role("Mozo/a de desayuno", "hotel", ["hotel", "desayuno", "mozo", "salón", "cafetería"], "zafral o fijo", "básico", "hotel-food"),
  role("Auxiliar de reservas", "hotel", ["reservas", "hotel", "teléfono", "computadora", "agenda"], "fijo", "intermedio", "hotel-admin"),
  role("Personal zafral de temporada", "events", ["temporada", "zafral", "verano", "turismo", "evento"], "zafral", "básico", "temporada"),

  role("Mozo/a", "food", ["mozo", "restaurante", "bar", "salón", "bandeja", "clientes"], "fijo o zafral", "básico", "salón"),
  role("Ayudante de cocina", "food", ["cocina", "ayudante", "preparación", "comida", "restaurante"], "fijo o zafral", "básico", "cocina"),
  role("Bachero/a", "food", ["bachero", "bacha", "lavado", "cocina", "limpieza"], "fijo o zafral", "básico", "bacha"),
  role("Barista", "food", ["barista", "cafe", "cafetería", "mostrador", "bebidas"], "fijo", "intermedio", "barista"),
  role("Delivery gastronómico", "delivery", ["delivery", "moto", "bicicleta", "reparto", "comida"], "fijo o changa", "básico", "delivery", { mobility: true }),
  role("Pizzero/a o parrillero/a", "food", ["pizza", "pizzero", "parrilla", "parrillero", "cocina"], "fijo o zafral", "con experiencia", "cocina"),
  role("Personal para eventos", "events", ["evento", "fiesta", "salón", "mozo", "apoyo"], "changa o zafral", "básico", "eventos"),

  role("Auxiliar de limpieza", "cleaning", ["limpieza", "limpiar", "orden", "servicios", "oficinas"], "fijo o changa", "básico", "limpieza"),
  role("Limpieza de casas", "cleaning", ["limpieza", "casas", "doméstica", "hogar", "planchado"], "changa", "básico", "limpieza-hogar"),
  role("Limpieza de edificios", "cleaning", ["edificio", "limpieza", "áreas comunes", "porter", "servicios"], "fijo o changa", "básico", "limpieza-edificios"),
  role("Limpieza post obra", "cleaning", ["post obra", "obra", "limpieza", "polvo", "construcción"], "changa", "intermedio", "limpieza-obra"),
  role("Lavandería y planchado", "cleaning", ["lavandería", "plancha", "planchado", "ropa", "hotel"], "fijo o changa", "básico", "lavandería"),

  role("Guardía de seguridad", "security", ["seguridad", "guardía", "vigilancia", "control", "turnos"], "fijo", "intermedio", "seguridad"),
  role("Sereno", "security", ["sereno", "noche", "vigilancia", "seguridad", "predio"], "fijo", "básico", "seguridad"),
  role("Portería / control de acceso", "security", ["portería", "control", "acceso", "edificio", "recepción"], "fijo", "básico", "portería"),
  role("Seguridad para eventos", "events", ["seguridad", "eventos", "control", "ingreso", "fiestas"], "changa o zafral", "básico", "eventos"),

  role("Chofer", "delivery", ["chofer", "camióneta", "camión", "manejo", "conduccion"], "fijo", "con experiencia", "chofer", { license: true }),
  role("Repartidor/a", "delivery", ["reparto", "repartidor", "moto", "auto", "entregas"], "fijo o changa", "básico", "reparto", { mobility: true }),
  role("Cadete", "delivery", ["cadete", "mandados", "trámites", "moto", "bicicleta"], "fijo o changa", "básico", "cadete", { mobility: true }),
  role("Auxiliar de logística", "logistics", ["logística", "depósito", "stock", "pedidos", "carga"], "fijo", "básico", "logística"),
  role("Peón de reparto", "delivery", ["reparto", "carga", "descarga", "mercadería", "camióneta"], "fijo", "básico", "reparto"),

  role("Peón de obra", "trades", ["obra", "construcción", "peón", "albañil", "carga"], "fijo o changa", "básico", "obra"),
  role("Albañil o ayudante", "trades", ["albañil", "obra", "mezcla", "ladrillo", "construcción"], "fijo o changa", "con experiencia", "obra"),
  role("Pintor o ayudante de pintura", "trades", ["pintura", "pintor", "pared", "lijar", "rodillo"], "changa o fijo", "básico", "pintura"),
  role("Electricista básico", "trades", ["electricidad", "electricista", "luces", "cables", "enchufe"], "changa o fijo", "intermedio", "electricidad"),
  role("Sanitario básico", "trades", ["sanitaria", "cañería", "agua", "baño", "arreglos"], "changa o fijo", "intermedio", "sanitaria"),
  role("Jardinero / cortador de pasto", "trades", ["jardin", "jardinería", "pasto", "cortar", "predio"], "changa o fijo", "básico", "jardin"),
  role("Piscinero", "maintenance", ["piscina", "piscinero", "agua", "mantenimiento", "complejo"], "changa o fijo", "intermedio", "piscina"),
  role("Mantenimiento general", "maintenance", ["mantenimiento", "arreglos", "herramientas", "reparaciones", "luces"], "fijo o changa", "intermedio", "mantenimiento"),
  role("Encargado de edificio", "maintenance", ["edificio", "portero", "mantenimiento", "áreas comunes", "bombas"], "fijo", "intermedio", "edificio"),

  role("Auxiliar administrativo", "admin", ["administración", "oficina", "archivo", "facturación", "datos"], "fijo", "básico", "admin"),
  role("Data entry", "admin", ["datos", "data", "entry", "computadora", "planillas", "excel"], "fijo o changa", "básico", "datos"),
  role("Recepcionista administrativa", "admin", ["recepción", "agenda", "teléfono", "email", "oficina"], "fijo", "intermedio", "admin"),
  role("Agenda de turnos", "admin", ["turnos", "agenda", "teléfono", "WhatsApp", "consultorio"], "fijo", "básico", "admin"),

  role("Cuidador/a de adultos mayores", "care", ["adultos", "mayores", "cuidado", "acompañante", "paciente"], "fijo o por horas", "intermedio", "cuidados"),
  role("Acompañante", "care", ["acompañante", "cuidado", "personas", "salud", "noche"], "fijo o por horas", "básico", "cuidados"),
  role("Niñera", "care", ["niños", "niñera", "cuidado", "familia", "escuela"], "por horas o fijo", "intermedio", "niños"),
  role("Apoyo domiciliario", "care", ["domicilio", "cuidado", "adultos", "acompañar", "asistencia"], "por horas o fijo", "básico", "cuidados"),

  role("Paseador/a de perros", "pets", ["perros", "mascotas", "paseo", "animales", "barrio"], "changa", "básico", "mascotas"),
  role("Pet sitter / cuidado de mascotas", "pets", ["mascotas", "animales", "perros", "gatos", "cuidado"], "changa", "básico", "mascotas"),
  role("Casero/a o cuidado de casas", "pets", ["casero", "casa", "hogar", "mantenimiento", "predio"], "fijo o changa", "intermedio", "hogar"),
  role("Mandados", "gigs", ["mandados", "trámites", "compras", "barrio", "cadete"], "changa", "básico", "mandados"),

  role("Armado de eventos", "events", ["eventos", "armado", "sillas", "mesas", "fiestas"], "changa o zafral", "básico", "eventos"),
  role("Acreditación y control de ingreso", "events", ["acreditación", "control", "ingreso", "evento", "público"], "changa", "básico", "eventos"),
  role("Atención en playa/paradores", "events", ["playa", "parador", "temporada", "verano", "turismo"], "zafral", "básico", "temporada"),

  role("Peón rural", "rural", ["campo", "rural", "peón", "chacra", "animales"], "fijo o zafral", "básico", "rural"),
  role("Viveros y riego", "rural", ["vivero", "riego", "plantas", "jardin", "chacra"], "fijo o zafral", "básico", "rural"),
  role("Mantenimiento de predios", "rural", ["predio", "terreno", "alambrado", "limpieza", "pasto"], "changa o fijo", "básico", "rural"),

  role("Auxiliar de depósito", "logistics", ["depósito", "stock", "orden", "mercadería", "carga"], "fijo", "básico", "depósito"),
  role("Picking / packing", "logistics", ["picking", "packing", "pedidos", "ecommerce", "depósito"], "fijo", "básico", "depósito"),
  role("Carga y descarga", "logistics", ["carga", "descarga", "camión", "depósito", "fuerza"], "fijo o changa", "básico", "depósito"),
  role("Armado de pedidos", "logistics", ["pedidos", "stock", "depósito", "orden", "packing"], "fijo", "básico", "depósito"),

  role("Asistente virtual básico", "digital", ["asistente", "virtual", "computadora", "WhatsApp", "email"], "changa o fijo", "básico", "digital"),
  role("Publicación de productos", "digital", ["publicaciones", "productos", "redes", "marketplace", "fotos"], "changa o fijo", "básico", "digital"),
  role("Respuesta a clientes por redes", "digital", ["redes", "clientes", "mensajes", "instagram", "WhatsApp"], "changa o fijo", "básico", "digital"),

  role("Limpieza por hora", "gigs", ["changa", "por hora", "limpieza", "casas", "oficinas"], "changa", "básico", "limpieza-hogar"),
  role("Fletes pequeños", "gigs", ["flete", "mudanza", "camióneta", "carga", "traslado"], "changa", "básico", "fletes", { mobility: true }),
  role("Ayuda en mudanzas", "gigs", ["mudanza", "carga", "ayuda", "muebles", "flete"], "changa", "básico", "mudanzas"),
  role("Armado de muebles", "gigs", ["muebles", "armado", "herramientas", "reparaciones", "hogar"], "changa", "intermedio", "muebles"),
  role("Lavado de autos", "gigs", ["autos", "lavado", "limpieza", "vehículos"], "changa", "básico", "autos"),
  role("Cocina casera por pedido", "gigs", ["cocina", "comida", "pedido", "casera", "tortas"], "changa", "intermedio", "cocina-casera"),
];

const touristLocations = ["maldonado", "punta del este", "punta", "san carlos", "piriapolis", "la barra", "josé ignacio", "rocha", "colonia", "atlantida"];
const noExperienceWords = ["sin experiencia", "no tengo experiencia", "ninguna", "primera oportunidad", "primer trabajo"];
const changaSectors = ["gigs", "cleaning", "trades", "pets", "care", "events", "delivery"];
const touristSectors = ["hotel", "food", "events", "cleaning", "maintenance", "sales"];
const entryFamilies = ["reposición", "limpieza", "cadete", "bacha", "depósito", "atención", "temporada"];

const companySuggestions = [
  suggestion("Hoteles", ["hotel", "hotelería", "mucama", "habitaciones", "recepción", "turismo"], ["Hotelería y turismo", "Limpieza y servicios"], "pueden necesitar limpieza, habitaciones, recepción, lavandería, desayuno o apoyo de temporada."),
  suggestion("Restaurantes", ["cocina", "mozo", "restaurante", "bar", "cafetería", "bachero"], ["Gastronomía"], "encajan con cocina, salón, bacha, cafetería, caja gastronómica o eventos."),
  suggestion("Supermercados", ["ventas", "caja", "reposición", "stock", "supermercado"], ["Atención al cliente y ventas", "Depósito y logística"], "suelen tomar perfiles para caja, reposición, depósito, atención y tareas de entrada."),
  suggestion("Comercios", ["ventas", "local", "clientes", "mostrador", "WhatsApp"], ["Atención al cliente y ventas", "Trabajos digitales simples"], "son una buena opción para atención, ventas, mostrador o respuesta por WhatsApp."),
  suggestion("Edificios", ["edificio", "portería", "limpieza", "mantenimiento"], ["Limpieza y servicios", "Mantenimiento y edificios", "Seguridad y vigilancia"], "pueden necesitar limpieza, portería, mantenimiento básico o control de acceso."),
  suggestion("Empresas de limpieza", ["limpieza", "casas", "oficinas", "edificios"], ["Limpieza y servicios"], "convienen si tenés experiencia limpiando, ordenando o trabajando por hora."),
  suggestion("Empresas de seguridad", ["seguridad", "vigilancia", "sereno", "portería"], ["Seguridad y vigilancia"], "pueden servir si sos responsable, puntual y tenés disponibilidad para turnos."),
  suggestion("Inmobiliarias", ["administración", "recepción", "teléfono", "clientes", "agenda"], ["Administración básica", "Atención al cliente y ventas"], "pueden necesitar recepción, agenda, llamadas, atención y apoyo administrativo."),
  suggestion("Depósitos/logística", ["depósito", "logística", "stock", "reparto", "carga"], ["Depósito y logística", "Choferes, cadetes y reparto"], "encajan con stock, armado de pedidos, reparto, carga o apoyo operativo."),
  suggestion("Residenciales/cuidado de personas", ["cuidado", "adultos", "niños", "acompañante"], ["Cuidado de personas"], "pueden ser buena opción si tenés paciencia, responsabilidad y experiencia cuidando personas."),
  suggestion("Casas particulares y vecinos", ["changa", "limpieza", "pasto", "mascotas", "mandados"], ["Changas y cuenta propia", "Mascotas y hogar"], "sirven para empezar con changas por hora, tareas del hogar, mascotas o mandados."),
];

const gigCatalog = [
  gig("Limpieza por hora", "Hogar y limpieza", ["limpieza", "limpiar", "casas", "oficinas", "mucama"], "Por hora o por jornada", "Responsabilidad, puntualidad y referencias si tenés.", "Vecinos, edificios, grupos de barrio, inmobiliarias y comercios.", "fácil"),
  gig("Limpieza de casas", "Hogar y limpieza", ["limpieza", "casas", "hogar", "doméstica"], "Por hora o por tarea", "Confianza, prolijidad y disponibilidad clara.", "Vecinos, familias, grupos barriales y recomendaciones.", "fácil"),
  gig("Limpieza de oficinas", "Hogar y limpieza", ["limpieza", "oficinas", "orden", "servicios"], "Por hora o por jornada", "Orden, constancia y horarios definidos.", "Oficinas chicas, consultorios, comercios y administradores.", "fácil"),
  gig("Limpieza post obra", "Hogar y limpieza", ["post obra", "obra", "construcción", "limpieza", "polvo"], "Por tarea o por día", "Trabajo con detalle, fuerza y ganas de dejar prolijo.", "Constructoras chicas, reformas, arquitectos, vecinos y barracós.", "media"),
  gig("Planchado o lavado de ropa", "Hogar y limpieza", ["planchado", "plancha", "lavado", "ropa", "lavandería"], "Por tarea", "Prolijidad, cuidado de prendas y compromiso con horarios.", "Familias, residenciales, lavanderías y vecinos.", "fácil"),
  gig("Limpieza de apartamentos temporales", "Hogar y limpieza", ["apartamento", "temporal", "airbnb", "alquiler", "hotel", "mucama"], "Por tarea", "Rapidez, prolijidad y buena coordinación de horarios.", "Inmobiliarias, propietarios, administradores y alojamientos.", "media", { tourist: true }),

  gig("Corte de pasto", "Jardín y mantenimiento", ["pasto", "cortar", "jardin", "jardinería", "terreno"], "Por tarea o por día", "Herramientas o posibilidad de coordinar, puntualidad y prolijidad.", "Casas, vecinos, complejos, administradores y grupos de barrio.", "fácil"),
  gig("Jardinería", "Jardín y mantenimiento", ["jardin", "jardinería", "plantas", "riego", "pasto"], "Por hora o por tarea", "Cuidado de plantas, orden y experiencia al aire libre.", "Casas, chacras, viveros, edificios y complejos.", "media"),
  gig("Limpieza de terrenos o patios", "Jardín y mantenimiento", ["terreno", "patio", "predio", "limpieza", "pasto"], "Por día o por tarea", "Ganas de trabajar al aire libre y tolerancia a tareas físicas.", "Vecinos, inmobiliarias, chacras, administradores y propietarios.", "fácil"),
  gig("Piscinero básico", "Jardín y mantenimiento", ["piscina", "piscinero", "agua", "mantenimiento"], "Por visita o por mes", "Conocimiento básico de limpieza y control de piscina.", "Complejos, casas, hoteles chicos y administradores.", "requiere experiencia", { tourist: true }),
  gig("Pintura por día", "Jardín y mantenimiento", ["pintura", "pintor", "pared", "rodillo", "lijar", "herramientas", "mantenimiento"], "Por día o por tarea", "Herramientas, prolijidad y ejemplos de trabajos si tenés.", "Casas, comercios, reformas, edificios y conocidos.", "media"),
  gig("Reparaciones menores", "Jardín y mantenimiento", ["arreglos", "reparaciones", "herramientas", "mantenimiento"], "Por tarea", "Saber resolver arreglos simples y trabajar con responsabilidad.", "Vecinos, edificios, comercios, administradores y propietarios.", "media"),
  gig("Armado de muebles", "Jardín y mantenimiento", ["muebles", "armado", "herramientas", "atornillar"], "Por tarea", "Paciencia, herramientas básicas y prolijidad.", "Vecinos, Marketplace, comercios de muebles y grupos barriales.", "media"),

  gig("Niñera por horas", "Cuidado de personas", ["niños", "niñera", "cuidado", "familia"], "Por hora", "Responsabilidad, paciencia y referencias si tenés.", "Familias, vecinos, grupos de barrio y recomendaciones.", "media"),
  gig("Acompañante de adulto mayor", "Cuidado de personas", ["adultos", "mayores", "acompañante", "cuidado"], "Por hora, noche o jornada", "Paciencia, confianza y buena comunicación con la familia.", "Familias, residenciales y redes de conocidos.", "media"),
  gig("Mandados para adultos mayores", "Cuidado de personas", ["mandados", "adultos", "compras", "trámites", "mayores"], "Por tarea o por hora", "Confianza, puntualidad y buen trato.", "Vecinos, familias, grupos barriales y residenciales.", "fácil"),
  gig("Compañía por horas", "Cuidado de personas", ["compañía", "acompañante", "adultos", "cuidado"], "Por hora", "Buen trato, responsabilidad y disponibilidad clara.", "Familias, vecinos y recomendaciones.", "fácil"),

  gig("Paseador/a de perros", "Mascotas", ["perros", "paseo", "mascotas", "animales"], "Por paseo o por semana", "Gusto por animales, responsabilidad y cuidado.", "Vecinos, veterinarias, grupos barriales e Instagram.", "fácil"),
  gig("Pet sitter", "Mascotas", ["mascotas", "perros", "gatos", "animales", "cuidado"], "Por visita o por día", "Confianza, experiencia con animales y buena coordinación.", "Vecinos, veterinarias, redes sociales y grupos de zona.", "fácil"),
  gig("Alimentar mascotas cuando viajan", "Mascotas", ["mascotas", "viaje", "alimentar", "animales"], "Por visita", "Responsabilidad, puntualidad y confianza.", "Vecinos, edificios, grupos barriales y conocidos.", "fácil"),
  gig("Traslado básico de mascotas", "Mascotas", ["mascotas", "traslado", "auto", "moto", "vehículo"], "Por traslado", "Locomoción, cuidado y coordinación.", "Veterinarias, vecinos, grupos de mascotas y redes.", "media", { mobility: true }),

  gig("Mandados", "Reparto y mandados", ["mandados", "compras", "trámites", "barrio"], "Por tarea", "Responsabilidad, rapidez y buena comunicación.", "Vecinos, adultos mayores, comercios y grupos barriales.", "fácil"),
  gig("Delivery independiente", "Reparto y mandados", ["delivery", "reparto", "moto", "bicicleta", "comida"], "Por tarea o por día", "Locomoción, puntualidad y cuidado con entregas.", "Comercios, rotiserías, farmacias, emprendimientos y conocidos.", "media", { mobility: true }),
  gig("Cadetería", "Reparto y mandados", ["cadete", "trámites", "paquetes", "reparto", "moto"], "Por tarea o por jornada", "Locomoción, responsabilidad y conocimiento de zonas.", "Comercios, oficinas, farmacias y tiendas online.", "media", { mobility: true }),
  gig("Fletes pequeños", "Reparto y mandados", ["flete", "camióneta", "auto", "mudanza", "traslado"], "Por tarea", "Vehículo, cuidado al cargar y puntualidad.", "Vecinos, Marketplace, mudanzas chicas y grupos barriales.", "media", { mobility: true }),

  gig("Mozo/a eventual", "Eventos y temporada", ["mozo", "evento", "fiesta", "salón"], "Por evento", "Buena presencia, ritmo y disponibilidad nocturna o fin de semana.", "Salones, organizadores de eventos, hoteles y restaurantes.", "media", { tourist: true }),
  gig("Ayuda en eventos", "Eventos y temporada", ["evento", "apoyo", "fiesta", "armado"], "Por evento o por día", "Puntualidad, energía y disposición para varias tareas.", "Salones, organizadores, fiestas, paradores y productoras.", "fácil", { tourist: true }),
  gig("Armado y desarmado de eventos", "Eventos y temporada", ["armado", "desarmado", "evento", "sillas", "mesas"], "Por evento", "Fuerza física, puntualidad y trabajo en equipo.", "Organizadores, salónes, fiestas y empresas de sonido.", "fácil"),
  gig("Acreditación o control de acceso", "Eventos y temporada", ["acreditación", "control de acceso", "evento", "público"], "Por evento", "Buena presencia, orden y trato con personas.", "Eventos, ferias, fiestas, congresos y productoras.", "fácil"),
  gig("Promotor/a eventual", "Eventos y temporada", ["promotor", "promoción", "ventas", "clientes", "público"], "Por evento o por día", "Buen trato, presencia y fácilidad para hablar con personas.", "Eventos, supermercados, lanzamientos, comercios y agencias.", "fácil"),
  gig("Atención en paradores", "Eventos y temporada", ["parador", "playa", "temporada", "verano", "turismo"], "Por día o temporada", "Disponibilidad en temporada, buena presencia y trato con clientes.", "Paradores, restaurantes, hoteles y comercios de playa.", "fácil", { tourist: true }),

  gig("Cocina casera por pedido", "Cocina y alimentos", ["cocina", "comida", "casera", "pedido"], "Por pedido", "Orden, higiene y saber preparar comidas simples.", "Vecinos, oficinas, redes sociales, grupos de barrio y conocidos.", "media"),
  gig("Viandas", "Cocina y alimentos", ["viandas", "comida", "cocina", "familias"], "Por pedido o por semana", "Organización, higiene y constancia.", "Oficinas, familias, estudíantes, grupos barriales e Instagram.", "media"),
  gig("Repostería casera", "Cocina y alimentos", ["repostería", "tortas", "postres", "cocina"], "Por pedido", "Buena presentación, higiene y cumplimiento de entregas.", "Redes sociales, vecinos, cumpleaños, oficinas y conocidos.", "media"),
  gig("Ayudante de cocina eventual", "Cocina y alimentos", ["cocina", "ayudante", "evento", "restaurante"], "Por día o por evento", "Orden, rapidez y disposición para apoyar al equipo.", "Restaurantes, eventos, rotiserías y hoteles.", "fácil", { tourist: true }),

  gig("Publicación de productos en Marketplace", "Digital simple", ["marketplace", "publicaciones", "productos", "fotos", "redes", "ventas", "casa"], "Por tarea", "Celular o computadora, buena redacción y orden.", "Comercios, emprendimientos, vendedores y redes.", "fácil"),
  gig("Atención por WhatsApp", "Digital simple", ["WhatsApp", "mensajes", "clientes", "respuesta", "ventas", "atención", "casa"], "Por hora o por mes", "Responder claro, buena ortografía y constancia.", "Comercios, emprendimientos, inmobiliarias y tiendas.", "fácil"),
  gig("Respuesta a Instagram", "Digital simple", ["instagram", "redes", "mensajes", "clientes"], "Por hora o por mes", "Manejo básico de redes y buen trato.", "Emprendimientos, comercios, servicios y marcas chicas.", "fácil"),
  gig("Carga de datos básica", "Digital simple", ["datos", "computadora", "excel", "planillas", "casa", "remoto"], "Por tarea o por hora", "Computadora, orden y atención al detalle.", "Oficinas, comercios, profesionales y emprendimientos.", "fácil"),
  gig("Organización de agenda", "Digital simple", ["agenda", "turnos", "WhatsApp", "teléfono", "casa", "remoto"], "Por hora o por mes", "Orden, comunicación y responsabilidad.", "Consultorios, servicios, profesionales, estéticas y comercios.", "fácil"),

  gig("Ayuda en mudanzas", "Mudanzas y fuerza física", ["mudanza", "muebles", "carga", "descarga"], "Por tarea o por día", "Fuerza física, cuidado y puntualidad.", "Vecinos, fletes, Marketplace y grupos barriales.", "fácil"),
  gig("Carga y descarga", "Mudanzas y fuerza física", ["carga", "descarga", "depósito", "camión"], "Por día o por tarea", "Fuerza, disponibilidad y cuidado con mercadería.", "Depósitos, ferias, repartos, mudanzas y comercios.", "fácil"),
  gig("Orden de depósitos", "Mudanzas y fuerza física", ["depósito", "orden", "stock", "mercadería"], "Por día", "Orden, fuerza si aplica y constancia.", "Depósitos chicos, comercios, talleres y ferias.", "fácil"),
  gig("Apoyo en ferias o armado de puestos", "Mudanzas y fuerza física", ["feria", "puesto", "armado", "carga"], "Por día o evento", "Puntualidad, fuerza y ganas de apoyar.", "Ferias, puestos, eventos, mercados y emprendimientos.", "fácil"),
];

function gig(name, category, keywords, payType, needs, places, ease, flags = {}) {
  return { name, category, keywords, payType, needs, places, ease, ...flags };
}

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
    message: `Hola, buen día. Estoy buscando trabajo y me interesa postularme en ${type}. Tengo disponibilidad y puedo enviar mi perfil si están tomando personal.`,
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
  const gigResult = createGigRecommendations(profile, context);
  const secondaryOptions = scored
    .filter((item) => !selected.some((selectedItem) => selectedItem.title === item.title))
    .filter((item) => item.score > 2)
    .slice(0, 14)
    .map((item) => ({ title: item.title, area: item.area }));

  return {
    summary: createProfileSummary(profile, recommendations, context),
    recommendations,
    secondaryOptions,
    gigRecommendations: gigResult.recommendations,
    secondaryGigs: gigResult.secondary,
    advice: createAdvice(profile, recommendations, context),
    nextSteps: createNextSteps(profile, recommendations),
    companySuggestions: createCompanySuggestions(profile, recommendations, context),
    WhatsAppMessage: createWhatsAppMessage(profile, recommendations),
    miniCv: createMiniCv(profile, recommendations),
  };
}

export function createGigRecommendations(profile, context = buildContext(profile)) {
  const scored = gigCatalog
    .map((item) => scoreGig(item, profile, context))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  const selected = selectGigs(scored, context);
  const selectedNames = new Set(selected.map((item) => item.name));

  return {
    recommendations: selected.map((item, index) => enrichGig(item, profile, context, index)),
    secondary: scored
      .filter((item) => !selectedNames.has(item.name))
      .filter((item) => item.score >= 4)
      .slice(0, 14)
      .map((item) => ({ name: item.name, category: item.category })),
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
    profile.interests.join(" "),
  ].join(" "));

  return {
    text,
    interestText: normalize(profile.interests.join(" ")),
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
  const hasMatch = matches.length > 0;
  const sectorFirstWord = normalize(item.area.split(" ")[0]);
  const interestMatch =
    context.interestText.includes(normalize(item.area)) ||
    context.interestText.includes(normalize(item.family)) ||
    (item.sectorKey !== "gigs" && context.interestText.includes(sectorFirstWord));
  score += matches.length * 4;
  if (context.text.includes(normalize(item.title.split(" ")[0])) || context.text.includes(normalize(item.family))) score += 4;

  if (context.interestText.includes(normalize(item.area))) score += 8;
  if (interestMatch) score += 4;
  if (item.license && context.hasLicense) score += 14;
  if (item.mobility && (context.hasLicense || context.hasTransport)) score += 12;
  if ((context.hasLicense || context.hasTransport) && ["delivery", "logistics", "gigs"].includes(item.sectorKey)) score += 4;
  if (context.isTouristLocation && touristSectors.includes(item.sectorKey) && (hasMatch || context.wantsSeasonal)) score += 7;
  if (context.wantsChangas && changaSectors.includes(item.sectorKey) && hasMatch) score += 8;
  if (context.wantsChangas && changaSectors.includes(item.sectorKey) && interestMatch) score += 5;
  if (context.wantsChangas && item.workMode.includes("changa") && hasMatch) score += 3;
  if (context.wantsSeasonal && ["hotel", "food", "events", "cleaning", "sales"].includes(item.sectorKey)) score += hasMatch ? 7 : 3;
  if (!context.hasExperience && (hasMatch || interestMatch || entryFamilies.includes(item.family)) && item.level === "básico") score += 8;
  if (context.text.includes("noche") && ["security", "care", "food"].includes(item.sectorKey)) score += 2;
  if (context.text.includes("fines de semana") && ["food", "hotel", "events", "sales"].includes(item.sectorKey)) score += 2;
  if (profile.workType === "fijo" && item.workMode.includes("fijo")) score += 3;
  if (profile.workType === "fijo" && !item.workMode.includes("fijo")) score -= 4;

  if (item.license && !context.hasLicense) score -= 8;
  if (item.mobility && !context.hasLicense && !context.hasTransport) score -= 3;
  if (!hasMatch && !interestMatch && score < 10) score = Math.max(0, score - 5);

  return {
    ...item,
    score,
    matches,
    compatibility: score >= 16 ? "alto" : score >= 8 ? "medio" : "bajo",
  };
}

function scoreGig(item, profile, context) {
  let score = 0;
  const matches = item.keywords.filter((keyword) => context.text.includes(normalize(keyword)));
  const categoryText = normalize(item.category);
  const directSignal = matches.length > 0 || context.interestText.includes(categoryText);
  score += matches.length * 5;
  if (context.text.includes(normalize(item.name))) score += 4;

  if (context.interestText.includes(categoryText)) score += 7;
  if (context.interestText.includes("changa")) score += 5;
  if (context.wantsChangas) score += directSignal ? 8 : 4;
  if (context.wantsSeasonal && (item.tourist || item.category === "Eventos y temporada")) score += directSignal ? 6 : 3;
  if (context.isTouristLocation && (item.tourist || ["Eventos y temporada", "Hogar y limpieza", "Cocina y alimentos", "Jardín y mantenimiento"].includes(item.category))) score += directSignal || item.tourist ? 5 : 1;
  if ((context.hasLicense || context.hasTransport) && (item.mobility || item.category === "Reparto y mandados")) score += 9;
  if (!context.hasExperience && item.ease === "fácil") score += directSignal ? 5 : 2;
  if (profile.workType === "fijo" && item.payType.includes("Por mes")) score += 2;

  if (item.mobility && !context.hasLicense && !context.hasTransport) score -= 6;
  if (!matches.length && !context.wantsChangas && score < 8) score = Math.max(0, score - 4);
  if (!directSignal && !item.mobility && !item.tourist) score = Math.min(score, context.wantsChangas ? 9 : 6);

  return {
    ...item,
    score,
    matches,
    compatibility: score >= 16 ? "alto" : score >= 8 ? "medio" : "bajo",
  };
}

function selectGigs(scored, context) {
  const minimum = 8;
  const pool = scored.filter((item) => item.score >= minimum);
  const fallbackNames = ["Limpieza por hora", "Mandados", "Ayuda en eventos", "Pet sitter", "Carga y descarga", "Publicación de productos en Marketplace"];
  const fallback = fallbackNames.map((name) => scored.find((item) => item.name === name)).filter(Boolean);
  const selected = [];
  const categories = new Map();

  for (const item of pool) {
    if (!item || selected.some((selectedItem) => selectedItem.name === item.name)) continue;
    if (selected.length >= 6) break;
    const categoryCount = categories.get(item.category) || 0;
    const categoryLimit = item.category === "Digital simple" ? 4 : item.category === "Reparto y mandados" ? 3 : item.category === "Jardín y mantenimiento" ? 5 : 2;
    if (categoryCount >= categoryLimit) continue;
    selected.push(item);
    categories.set(item.category, categoryCount + 1);
  }

  for (const item of fallback) {
    if (selected.length >= 4) break;
    if (!item || selected.some((selectedItem) => selectedItem.name === item.name)) continue;
    selected.push(item);
  }

  return selected;
}

function enrichGig(item, profile, context, index) {
  return {
    ...item,
    id: `gig-${index}`,
    reason: createGigReason(item, context),
    message: createGigMessage(item, profile),
  };
}

function createGigReason(item, context) {
  if (item.matches.length) {
    return `Podría encajar contigo porque mencionaste ${item.matches.slice(0, 3).join(", ")}.`;
  }
  if (context.wantsChangas) {
    return "Como estás buscando changas o trabajos eventuales, esta puede ser una idea simple para ofrecer en tu zona.";
  }
  if (!context.hasExperience && item.ease === "fácil") {
    return "Puede servir como entrada porque no exige gran experiencia previa y permite mostrar responsabilidad.";
  }
  if (context.isTouristLocation && item.tourist) {
    return "Tu zona puede tener movimiento de temporada, turismo o alquileres temporales.";
  }
  return "Es una idea de changa posible según tu disponibilidad, zona y habilidades.";
}

function createGigMessage(item, profile) {
  const location = profile.location || "la zona";
  return `Hola, buenas. Estoy ofreciendo ${item.name.toLowerCase()} en ${location}. Tengo disponibilidad y soy una persona responsable. Les puedo pasar más información si les interesa.`;
}

function selectDiverse(scored, context) {
  const useful = scored.filter((item) => item.score >= 5);
  const fallback = roleCatalog
    .filter((item) => ["Auxiliar de limpieza", "Repositor/a", "Atención al público", "Cadete", "Personal zafral de temporada", "Auxiliar de depósito"].includes(item.title))
    .map((item) => scoreRole(item, {}, context))
    .filter((item) => context.hasExperience ? item.score >= 5 : item.score >= 8);
  const pool = [...useful, ...fallback].filter((item, index, list) => list.findIndex((other) => other.title === item.title) === index);
  const selected = [];
  const families = new Map();
  const sectorsCount = new Map();

  for (const item of pool.sort((a, b) => b.score - a.score || b.matches.length - a.matches.length)) {
    if (selected.length >= 8) break;
    const familyCount = families.get(item.family) || 0;
    const sectorCount = sectorsCount.get(item.sectorKey) || 0;
    const earlySectorLimit = item.sectorKey === "sales" || item.sectorKey === "delivery" ? 4 : 2;
    if (familyCount >= 1 && selected.length < 5 && item.score < 18) continue;
    if (sectorCount >= earlySectorLimit && selected.length < 6) continue;
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
  if (!context.hasExperience && item.level === "básico") {
    return "Puede servirte como entrada si estás buscando empezar rápido y mostrar responsabilidad, disponibilidad y ganas de aprender.";
  }
  if (item.matches.length) {
    return `Con lo que contaste, aparecen señales relacionadas con ${item.matches.slice(0, 3).join(", ")}. Por eso este puesto podría encajar contigo.`;
  }
  if (context.isTouristLocation && touristSectors.includes(item.sectorKey)) {
    return "Tu zona puede tener demanda en turismo, temporada, servicios, gastronomía u hotelería.";
  }
  return "Tu experiencia también suma, aunque no haya sido en una empresa formal. Este puesto puede ser una opción real para explorar.";
}

function createTip(item, context) {
  if (context.wantsChangas) return "Podrías ofrecerte por WhatsApp, en comercios cercanos, grupos barriales o buscando empresas de tu zona.";
  if (item.mobility || item.license) return "Aclarálo desde el primer mensaje: libreta, locomoción, zonas donde te moves y horarios.";
  if (item.level === "básico") return "Mostrá buena actitud, puntualidad, disponibilidad y tareas concretas que ya hiciste.";
  return "Conta ejemplos simples y concretos de trabajos anteriores, aunque hayan sido changas o tareas informales.";
}

function createCompanySuggestions(profile, recommendations, context) {
  const areas = recommendations.map((item) => item.area);
  return companySuggestions
    .map((item) => {
      const keywords = Array.isArray(item.keywords) ? item.keywords : [];
      const itemAreas = Array.isArray(item.areas) ? item.areas : [];
      const keywordScore = keywords.filter((keyword) => context.text.includes(normalize(keyword))).length * 2;
      const areaScore = itemAreas.filter((area) => areas.includes(area)).length * 3;
      const locationScore = context.isTouristLocation && ["Hoteles", "Restaurantes"].includes(item.type) ? 3 : 0;
      return {
        ...item,
        score: keywordScore + areaScore + locationScore,
        mapsTip: `Buscá en Google Maps o Instagram: "${item.type} en ${profile.location || "tu zona"}" y escribíle a lugares cercanos.`,
      };
    })
    .sort((a, b) => b.score - a.score || a.type.localeCompare(b.type))
    .slice(0, 6);
}

function createProfileSummary(profile, recommendations, context) {
  const areas = [...new Set(recommendations.map((item) => item.area))].slice(0, 3).join(", ");
  const location = [profile.location, profile.department].filter(Boolean).join(", ") || "Uruguay";
  const base = `${profile.name || "Tu perfil"} tiene información que puede servir para ${areas || "trabajos de entrada"} en ${location}.`;
  if (!context.hasExperience) return `${base} Si no tenés experiencia formal, igual podés destacar responsabilidad, disponibilidad y ganas de aprender.`;
  return `${base} Con lo que contaste, estas oportunidades podrían encajar contigo y ayudarte a postularte mejor.`;
}

function createAdvice(profile, recommendations, context) {
  const advice = [
    "No necesitás tener un CV perfecto. Lo importante es contar claro que sabés hacer y cuándo podés empezar.",
    "Tu experiencia también suma, aunque haya sido informal, zafral, familiar o por changas.",
    "Mandá un mensaje corto, educado y directo. En Uruguay eso ayuda mucho.",
  ];
  if (!context.hasExperience) advice.push("Si estás empezando, destacá puntualidad, buena actitud y ganas de aprender.");
  if (profile.hasLicense === "si") advice.push("Mencioná la libreta de conducir desde el primer mensaje.");
  if (profile.hasTransport === "si") advice.push("Aclará que tenés locomoción propia porque puede abrir opciones de reparto, cadetería o zonas más lejanas.");
  if (recommendations.some((item) => item.workMode.includes("changa"))) advice.push("Para changas, ofrecé tareas concretas, precio a coordinar y zonas donde podés moverte.");
  return advice.slice(0, 6);
}

function createNextSteps(profile, recommendations) {
  const topRole = recommendations[0]?.title || "el puesto que más te interese";
  return [
    `Copiá el mensaje de WhatsApp y adaptalo para postularte a ${topRole}.`,
    "Buscá empresas cercanas en Google Maps, Instagram o comercios de tu zona.",
    "Guardá tu mini CV y revisá que horarios, zona y contacto estén bien.",
    "Prepará dos ejemplos simples de tareas que hiciste bien, aunque hayan sido changas.",
    "Actualizá tu perfil cuando cambie tu disponibilidad o sumes experiencia.",
  ];
}

function createWhatsAppMessage(profile, recommendations) {
  const name = profile.name || "mi nombre";
  const location = profile.location || "Uruguay";
  const topRole = recommendations[0]?.title || "el puesto";
  const availability = profile.availability || "disponibilidad a coordinar";
  const experience = profile.experience || "buena disposición y ganas de trabajar";
  return `Hola, buen día. Mi nombre es ${name}, soy de ${location} y me interesa postularme para ${topRole}. Tengo experiencia o habilidades en ${experience}. Cuento con ${availability}. Quedo a las órdenes para enviar más información o coordinar una entrevista. Muchas gracias.`;
}

function createMiniCv(profile, recommendations) {
  const topRoles = recommendations.map((item) => item.title).join(", ");
  return [
    `Nombre: ${profile.name || "Sin especificar"}`,
    `Ubicacion: ${profile.location || "Sin especificar"}`,
    profile.department ? `Departamento: ${profile.department}` : null,
    profile.age ? `Edad: ${profile.age}` : null,
    `Experiencia: ${profile.experience || "Sin experiencia formal declarada"}`,
    `Tareas y habilidades: ${profile.skills || "Buena disposición para aprender"}`,
    `Estudios: ${profile.education || "Sin especificar"}`,
    `Disponibilidad: ${profile.availability || "A coordinar"}`,
    `Tipo de trabajo buscado: ${profile.workType || "cualquiera"}`,
    `Locomoción propia: ${profile.hasTransport === "si" ? "Sí" : "No"}`,
    `Libreta de conducir: ${profile.hasLicense === "si" ? "Sí" : "No"}`,
    `Puestos recomendados: ${topRoles}`,
    profile.contact ? `Contacto: ${profile.contact}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}
