import { exampleProfile } from "./data/exampleProfile.js";
import { createRecommendationResult, emptyProfile } from "./logic/recommendations.js";
import { getCurrentUser, isAuthConfigured, signIn, signOut, signUp } from "./services/auth/authService.js";
import { getAdminProfiles, getMyProfile, mapStoredProfile, saveCompanyInterest, saveProfile } from "./services/profiles/profileRepository.js";

const interests = [
  "Atención al cliente",
  "Ventas",
  "Hotelería",
  "Gastronomía",
  "Limpieza",
  "Seguridad",
  "Choferes",
  "Mantenimiento",
  "Construcción",
  "Administración básica",
  "Cuidado de personas",
  "Trabajos zafrales",
];

const assets = {
  logo: "/src/assets/logo-labura-uy.png",
  checklist: "/src/assets/icon-checklist.png",
  messageCv: "/src/assets/icon-message-cv.png",
  companyLocation: "/src/assets/icon-company-location.png",
  opportunity: "/src/assets/icon-opportunity.png",
  trust: "/src/assets/icon-trust.png",
  profile: "/src/assets/icon-profile.png",
};

let profile = { ...emptyProfile };
let step = "home";
let formError = "";
let savedProfile = null;
let saveStatus = "";
let companyStatus = "";
let authMode = "signin";
let authMessage = "";
let authError = "";
let pendingAfterAuth = "form";
let adminProfiles = [];
let adminStatus = "";

const app = document.getElementById("root");

function render() {
  app.innerHTML = `
    <main>
      ${Header()}
      ${step === "home" ? `${Hero()}${WhoWeAre()}${WhoIsItFor()}${HowItWorks()}${FeaturedCategories()}${LandingGigs()}${TrustSection()}${CompanyCta()}${FinalCta()}` : ""}
      ${step === "auth" ? AuthScreen() : ""}
      ${step === "form" ? ProfileForm(profile) : ""}
      ${step === "results" ? Results(profile, createRecommendationResult(profile)) : ""}
      ${step === "saved" ? SavedProfile(savedProfile) : ""}
      ${step === "profile" ? MyProfile(savedProfile || { profile, result: createRecommendationResult(profile), source: "local" }) : ""}
      ${step === "company" ? CompanyInterestForm() : ""}
      ${step === "admin" ? AdminProfilesPanel() : ""}
      ${Footer()}
    </main>
  `;
  bindEvents();
}

function Header() {
  const user = getCurrentUser();
  return `
    <header class="site-header">
      <a class="brand" href="#" data-action="home" aria-label="Laburá UY inicio">
        <span class="brand-mark" aria-hidden="true">
          <img src="${assets.profile}" alt="" />
        </span>
        <img class="brand-logo" src="${assets.logo}" alt="Laburá UY" />
      </a>
      <nav class="header-nav" aria-label="Navegación principal">
        <button class="nav-link" type="button" data-action="home">Inicio</button>
        <button class="nav-link" type="button" data-action="section" data-target="quiénes-somos">Quiénes somos</button>
        <button class="nav-link" type="button" data-action="section" data-target="para-quien-es">Para quién es</button>
        <button class="nav-link" type="button" data-action="section" data-target="como-se-usa">Cómo se usa</button>
        <button class="nav-link" type="button" data-action="section" data-target="changas">Changas</button>
        <button class="nav-link" type="button" data-action="start">Crear perfil</button>
        <button class="nav-link" type="button" data-action="profile">Mi perfil</button>
        ${user ? `<button class="nav-link" type="button" data-action="admin">Admin</button>` : ""}
      </nav>
      <span class="header-badge">Uruguay</span>
      <button class="header-action" type="button" data-action="${user ? "logout" : "login"}">${user ? "Cerrar sesión" : "Iniciar sesión"}</button>
    </header>
  `;
}

function WhoWeAre() {
  return `
    <section class="institution-section" id="quiénes-somos">
      <div class="institution-card">
        <div class="split-section">
          <div>
            <span class="panel-label">Quiénes somos</span>
            <h2>Una herramienta uruguaya para transformar experiencia real en oportunidades.</h2>
          </div>
          <img class="section-art" src="${assets.trust}" alt="" />
        </div>
        <div class="institution-copy">
          <p>Laburá UY nace en Uruguay con una idea simple: ayudar a que más personas puedan reconocer el valor de su experiencia y encontrar mejores oportunidades laborales.</p>
          <p>Muchas veces, una persona sabe trabajar, tiene responsabilidad, oficio, trato con clientes o experiencia en tareas concretas, pero no sabe cómo mostrarlo en un CV o en una postulación.</p>
          <p>También hay personas que no se sienten cómodas usando plataformas laborales largas, con demasiados filtros o procesos complicados. Por eso Laburá UY busca simplificar ese camino: contar que sabés hacer, recibir ideas de trabajo y presentarte mejor.</p>
        </div>
      </div>
    </section>
  `;
}

function Hero() {
  return `
    <section class="hero">
      <div class="hero-content">
        <img class="hero-logo" src="${assets.logo}" alt="Laburá UY" />
        <div class="hero-kicker">Herramienta simple para buscar trabajo en Uruguay</div>
        <h1>Encontrá oportunidades laborales según tu experiencia real.</h1>
        <p>Laburá UY te ayuda a descubrir trabajos posibles, armar tu perfil y postularte mejor, aunque no tengas un CV perfecto.</p>
        <div class="hero-actions">
          <button class="primary-button" type="button" data-action="start">Crear mi perfil</button>
          <button class="secondary-button" type="button" data-action="section" data-target="como-se-usa">Ver cómo funciona</button>
        </div>
        <div class="trust-strip" aria-label="Beneficios principales">
          <span>Tu perfil solo lo ves vos</span>
          <span>No compartimos tus datos sin permiso</span>
          <span>Listo para WhatsApp</span>
        </div>
      </div>
      <div class="hero-panel" aria-label="Vista previa del resultado">
        <img class="hero-panel-art" src="${assets.opportunity}" alt="" />
        <div class="hero-panel-header">
          <span class="panel-label">Resultado orientativo</span>
          <strong>Perfil listo para postular</strong>
        </div>
        <h2>Con tu experiencia, estos trabajos pueden ser buenos para vos.</h2>
        <div class="preview-list"><span>Vendedor/a de local</span><strong>Alta</strong></div>
        <div class="preview-list"><span>Auxiliar de limpieza</span><strong>Medía</strong></div>
        <div class="preview-list"><span>Repositor/a</span><strong>Medía</strong></div>
        <div class="hero-mini-note">Tu experiencia también vale, aunque no tengas un CV armado.</div>
        <div class="hero-stats">
          <span><strong>5</strong> puestos</span>
          <span><strong>1</strong> mensaje</span>
          <span><strong>0</strong> vueltas</span>
        </div>
      </div>
    </section>
  `;
}

function HowItWorks() {
  const steps = [
    {
      icon: assets.checklist,
      title: "Creás tu perfil",
      text: "Completás datos simples sobre experiencia, habilidades, ciudad, disponibilidad y tipo de trabajo que buscas.",
    },
    {
      icon: assets.opportunity,
      title: "Recibís recomendaciones",
      text: "Laburá UY analiza tu información y te muestra puestos laborales que podrían encajar contigo.",
    },
    {
      icon: assets.messageCv,
      title: "Mejorás tu postulación",
      text: "Recibís un mini CV y un mensaje listo para copiar, mandar por WhatsApp o usar en una postulación.",
    },
    {
      icon: assets.companyLocation,
      title: "Guardás y editas",
      text: "Podés volver a tu perfil y actualizarlo cuando tengas nueva experiencia o cambie tu disponibilidad.",
    },
  ];

  return `
    <section class="info-section" id="como-se-usa">
      <div class="section-heading compact">
        <span class="section-icon" aria-hidden="true">02</span>
        <div>
          <h2>Cómo se usa Laburá UY</h2>
          <p>Es simple, rápido y pensado para Uruguay. No necesitás tener un CV perfecto para empezar.</p>
        </div>
      </div>
      <div class="info-grid">
        ${steps
          .map(
            (step, index) => `
              <article class="info-card">
                <div class="info-card-head">
                  <span class="info-number">${index + 1}</span>
                  <h3>${step.title}</h3>
                  <img class="card-icon" src="${step.icon}" alt="" />
                </div>
                <p>${step.text}</p>
              </article>
            `,
          )
          .join("")}
      </div>
      <div class="feature-strip">
        ${["Convierte experiencia real en oportunidades", "Da ideas de rubros donde buscar", "Ayuda a presentarte mejor", "Funciona bien desde el celular"].map((item) => `<span>${item}</span>`).join("")}
      </div>
    </section>
  `;
}

function WhoIsItFor() {
  const items = [
    "Personas sin experiencia formal que quieren empezar por puestos de entrada.",
    "Personas que hicieron changas o trabajos informales.",
    "Personas con experiencia en ventas, atención al público o caja.",
    "Trabajadores de temporada y personas de hotelería o gastronomía.",
    "Personas de limpieza, servicios, choferes, cadetes y reparto.",
    "Personas con oficios: pintura, albañileria, jardinería, mantenimiento o electricidad básica.",
    "Cuidadores, niñeras, acompañantes y personas mayores que quieren reinsertarse.",
    "Jovenes que buscan su primera oportunidad o personas que no tienen CV armado.",
    "Quiénes necesitan un mensaje claro para postularse por WhatsApp.",
  ];

  return `
    <section class="audience-section" id="para-quien-es">
      <div class="audience-panel">
        <div class="split-section">
          <div>
            <span class="panel-label">Para quién es</span>
            <h2>Hecho para gente que quiere buscar mejor, sin complicarse.</h2>
            <p>Laburá UY está pensado para personas que quieren trabajar, pero necesitan una forma más simple de entender qué oportunidades pueden encajar con su experiencia. No importa si fue formal, informal, zafral o por changas: lo importante es identificar que sabés hacer y cómo presentarlo mejor.</p>
          </div>
          <img class="section-art" src="${assets.profile}" alt="" />
        </div>
        <div class="audience-list">
          ${items.map((item) => `<p><span aria-hidden="true"><img src="${assets.profile}" alt="" /></span>${item}</p>`).join("")}
        </div>
        <button class="primary-button" type="button" data-action="start">Armar mi perfil</button>
      </div>
    </section>
  `;
}

function FeaturedCategories() {
  const categories = [
    "Atención al cliente",
    "Ventas",
    "Gastronomía",
    "Hotelería",
    "Limpieza",
    "Seguridad",
    "Reparto",
    "Mantenimiento",
    "Administración básica",
    "Cuidado de personas",
    "Temporada en Maldonado / Punta del Este",
  ];

  return `
    <section class="category-section">
      <div class="section-heading compact">
        <span class="section-icon image-icon" aria-hidden="true"><img src="${assets.companyLocation}" alt="" /></span>
        <div>
          <h2>Rubros destacádos en Uruguay</h2>
          <p>La recomendación se enfoca en rubros reales, de alta demanda y fáciles de entender.</p>
        </div>
      </div>
      <div class="category-grid">
        ${categories.map((category) => `<span class="category-badge">${category}</span>`).join("")}
      </div>
    </section>
  `;
}

function LandingGigs() {
  const examples = ["Limpieza por hora", "Jardinería", "Mandados", "Cuidado de mascotas", "Ayuda en eventos", "Reparto", "Cocina casera", "Atención por WhatsApp"];

  return `
    <section class="gig-landing" id="changas">
      <div class="gig-landing-card">
        <div class="split-section">
          <div>
            <span class="panel-label">Changas cerca de vos</span>
            <h2>Ideas de trabajos por hora, por día o por tarea según tu perfil.</h2>
            <p>Además de trabajos fijos o zafrales, Laburá UY también te ayuda a descubrir changas que podrías ofrecer según tus habilidades, tu zona y tu disponibilidad.</p>
          </div>
          <img class="section-art" src="${assets.messageCv}" alt="" />
        </div>
        <div class="category-grid compact-badges">
          ${examples.map((item) => `<span class="category-badge">${item}</span>`).join("")}
        </div>
        <div class="form-actions">
          <button class="primary-button" type="button" data-action="start">Crear mi perfil y ver changas recomendadas</button>
        </div>
      </div>
    </section>
  `;
}

function TrustSection() {
  return `
    <section class="trust-section">
      <div class="trust-card">
        <div class="split-section">
          <div>
            <span class="panel-label">Confianza y claridad</span>
            <h2>Una ayuda concreta para presentarte mejor.</h2>
          </div>
          <img class="section-art" src="${assets.trust}" alt="" />
        </div>
        <div class="trust-grid">
          <p><strong>Privado por ahora.</strong>No vendemos tus datos ni pedimos cuenta para usar la herramienta.</p>
          <p><strong>Práctico.</strong>Esto no reemplaza una entrevista, pero te ayuda a llegar mejor preparado.</p>
          <p><strong>Local.</strong>La recomendación es orientativa y esta pensada para rubros reales de Uruguay.</p>
          <p><strong>Control.</strong>Tus datos se usan para crear tu perfil laboral y más adelante vas a poder editarlo o borrarlo.</p>
          <p><strong>Permiso.</strong>No compartimos tu información públicamente sin tu permiso.</p>
        </div>
      </div>
    </section>
  `;
}

function CompanyCta() {
  return `
    <section class="company-cta">
      <div>
        <span class="panel-label">Para empresas</span>
        <h2>¿Sos empresa o comercio?</h2>
        <p>Más adelante vas a poder encontrar candidatos según zona, experiencia y disponibilidad.</p>
      </div>
      <button class="secondary-button" type="button" data-action="company">Quiero recibir candidatos</button>
    </section>
  `;
}

function FinalCta() {
  return `
    <section class="final-cta">
      <img src="${assets.opportunity}" alt="" />
      <div>
        <span class="panel-label">Empezá simple</span>
        <h2>Creá tu perfil laboral en pocos minutos</h2>
        <p>No necesitás tener todo perfecto. Empezá con lo que ya sabés hacer.</p>
      </div>
      <button class="primary-button" type="button" data-action="start">Empezar ahora</button>
    </section>
  `;
}

function AuthScreen() {
  const isSignUp = authMode === "signup";
  const isReady = isAuthConfigured();

  return `
    <section class="form-section">
      <div class="auth-layout">
        <div class="results-heading auth-heading">
          <img class="results-art" src="${assets.trust}" alt="" />
          <span class="eyebrow">Cuenta personal</span>
          <h1>${isSignUp ? "Creá tu cuenta para guardar tu perfil." : "Entrá a tu cuenta de Laburá UY."}</h1>
          <p>Usamos Supabase Auth. Tu contraseña no se guarda en Laburá UY y tu perfil queda asociado a tu usuario.</p>
          <div class="profile-pills">
            <span>Tu perfil solo lo ves vos</span>
            <span>Podras editarlo</span>
            <span>Sin compartir con empresas todavía</span>
          </div>
        </div>

        <div class="form-card auth-card">
          <div class="auth-tabs" role="tablist">
            <button class="${!isSignUp ? "active" : ""}" type="button" data-action="auth-signin">Iniciar sesión</button>
            <button class="${isSignUp ? "active" : ""}" type="button" data-action="auth-signup">Crear cuenta</button>
          </div>
          ${!isReady ? `<div class="form-error">Supabase no está configurado. Revisa las variables en Vercel.</div>` : ""}
          ${authMessage ? `<div class="form-helper"><strong>Listo:</strong> ${authMessage}</div>` : ""}
          ${authError ? `<div class="form-error" role="alert">${authError}</div>` : ""}
          <form class="profile-form auth-form" id="auth-form">
            ${TextField("email", "Email", "", "tuemail@ejemplo.com", true, "wide", "Usalo despues para entrar a tu perfil.")}
            <label class="wide">
              Contraseña
              <input required name="password" type="password" minlength="6" placeholder="Mínimo 6 caracteres" />
              <span class="field-help">No la guardamos nosotros. La maneja Supabase Auth de forma segura.</span>
            </label>
            <div class="form-actions wide">
              <button class="primary-button" type="submit">${isSignUp ? "Crear cuenta" : "Iniciar sesión"}</button>
              <button class="secondary-button" type="button" data-action="home">Volver al inicio</button>
            </div>
          </form>
          <div class="privacy-note">
            <p>No compartimos tus datos sin tu permiso.</p>
            <p>Más adelante podrás elegír si querés que empresas vean tu perfil.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function ProfileForm(current) {
  return `
    <section class="form-section" id="formulario">
      <div class="section-heading">
        <span class="section-icon image-icon" aria-hidden="true"><img src="${assets.checklist}" alt="" /></span>
        <div>
          <h1>Armemos tu perfil laboral</h1>
          <p>Con unas pocas respuestas armamos una recomendación clara, sin palabras raras ni formularios eternos.</p>
        </div>
      </div>
      <div class="form-helper">
        <strong>Tip:</strong> escribí como hablás. Si hiciste changas, cuidaste personas, limpiaste casas o ayudaste en un negocio, eso también cuenta.
        ${getCurrentUser() ? "<br />Estás trabajando dentro de tu cuenta. Al guardar, el perfil queda solo para vos." : ""}
      </div>
      ${formError ? `<div class="form-error" role="alert">${formError}</div>` : ""}

      <div class="form-card">
      <form class="profile-form" id="profile-form">
        ${TextField("name", "Tu nombre", current.name, "Ej: Andrea", true, "", "Solo para personalizar el resultado.")}
        ${TextField("location", "Ciudad o zona", current.location, "Ej: Pocitos, San Carlos, Las Piedras", true, "", "Así podemos sugerir lugares cercanos.")}
        ${TextField("department", "Departamento", current.department, "Ej: Montevideo, Canelones, Maldonado", false, "", "Ayuda a mejorar recomendaciones por temporada y zona.")}
        ${TextField("age", "Edad (opcional)", current.age, "Ej: 29", false, "", "Si no querés ponerla, dejala vacía.")}
        ${TextArea("experience", "Experiencia o changas", current.experience, "Ej: trabajé en comercio, hice limpieza, cuidé personas, ayudé en obra...", "Puede ser trabajo formal, informal, familiar o changas.")}
        ${TextArea("skills", "Tareas que sabés hacer", current.skills, "Ej: atención al público, caja, cocina, pintura, computadora básica...", "Escribí tareas concretas, aunque parezcan simples.")}
        ${SelectField("education", "Nivel de estudios", current.education, [
          "",
          "Primaria completa",
          "Ciclo básico incompleto",
          "Ciclo básico completo",
          "Bachillerato incompleto",
          "Bachillerato completo",
          "UTU o curso técnico",
          "Terciario o universitario",
        ], "Si no estás seguro, elegí la opción más cercana.")}
        ${TextField("availability", "Horarios disponibles", current.availability, "Ej: mañana, tarde, noche, fines de semana", true, "", "Contanos cuando podrías trabajar.")}
        ${Segmented("hasTransport", "Locomoción propia", current.hasTransport, "Auto, moto, bici o forma propia de moverte.")}
        ${Segmented("hasLicense", "Libreta de conducir", current.hasLicense, "Si tenés libreta, puede abrir opciones de reparto, cadete o chofer.")}
        ${SelectField("workType", "Tipo de trabajo", current.workType, ["fijo", "zafral", "changas", "cualquiera"], "Si te sirve cualquier opción, deja cualquiera.")}
        <div class="wide">
          <p class="field-title">Rubros que te interesan</p>
          <p class="field-help">Elegís uno o varios. Si no elegís, igual te recomendamos según lo que escribiste.</p>
          <div class="chips">
            ${interests
              .map(
                (interest) => `
                  <button class="chip ${current.interests.includes(interest) ? "selected" : ""}" type="button" data-interest="${escapeHtml(interest)}">
                    ${interest}
                  </button>
                `,
              )
              .join("")}
          </div>
        </div>
        ${TextField("contact", "Teléfono o email (opcional)", current.contact, "Ej: 099 123 456 o tu email", false, "wide", "Se usa para armar tu perfil laboral si decidís guardarlo.")}
        <div class="form-actions wide">
          <button class="primary-button" type="submit">Ver mis trabajos recomendados</button>
          <button class="secondary-button" type="button" data-action="example">Probar con datos de ejemplo</button>
        </div>
      </form>
      </div>
    </section>
  `;
}

function TextField(name, label, value, placeholder, required = false, className = "", help = "") {
  return `
    <label class="${className}">
      ${label}
      <input ${required ? "required" : ""} name="${name}" value="${escapeHtml(value)}" placeholder="${placeholder}" />
      ${help ? `<span class="field-help">${help}</span>` : ""}
    </label>
  `;
}

function TextArea(name, label, value, placeholder, help = "") {
  return `
    <label class="wide">
      ${label}
      <textarea required name="${name}" placeholder="${placeholder}">${escapeHtml(value)}</textarea>
      ${help ? `<span class="field-help">${help}</span>` : ""}
    </label>
  `;
}

function SelectField(name, label, value, options, help = "") {
  return `
    <label>
      ${label}
      <select name="${name}">
        ${options
          .map((option) => {
            const optionLabel = option || "Seleccionar";
            return `<option value="${escapeHtml(option)}" ${option === value ? "selected" : ""}>${optionLabel}</option>`;
          })
          .join("")}
      </select>
      ${help ? `<span class="field-help">${help}</span>` : ""}
    </label>
  `;
}

function Segmented(name, label, value, help = "") {
  return `
    <fieldset>
      <legend>${label}</legend>
      <div class="segmented">
        <button class="${value === "si" ? "active" : ""}" type="button" data-field="${name}" data-value="si">Sí</button>
        <button class="${value === "no" ? "active" : ""}" type="button" data-field="${name}" data-value="no">No</button>
      </div>
      ${help ? `<span class="field-help">${help}</span>` : ""}
    </fieldset>
  `;
}

function Results(current, result) {
  const best = result.recommendations[0];
  return `
    <section class="results-section">
      <div class="results-heading">
        <img class="results-art" src="${assets.opportunity}" alt="" />
        <span class="eyebrow">Resultado para ${escapeHtml(current.name || "tu perfil")}</span>
        <h1>${escapeHtml(current.name || "Tu perfil")}, estas opciones pueden encajar contigo.</h1>
          <p>${escapeHtml(result.summary)}</p>
          <div class="profile-pills">
            <span>${escapeHtml(current.location || "Uruguay")}</span>
            <span>${escapeHtml(current.availability || "Horario a coordinar")}</span>
            <span>${formatWorkType(current.workType)}</span>
          </div>
      </div>

      ${best ? BestOpportunity(best) : ""}

      <section class="trust-panel">
        <p>Tu perfil solo lo ves vos.</p>
        <p>No vendemos tus datos.</p>
        <p>Más adelante podrás elegír si querés compartirlo con empresas.</p>
        <p>Esto no reemplaza una entrevista, pero te ayuda a postularte mejor.</p>
        <p>Tu experiencia también vale, aunque no tengas un CV armado.</p>
      </section>

      <div class="results-label">
        <span>Trabajos recomendados</span>
        <p>Ordenados según lo que contaste en el formulario.</p>
      </div>

      <div class="recommendations">
        ${result.recommendations
          .map(
            (job) => `
              <article class="job-card">
                <div class="job-card-top">
                <div>
                  <span class="job-área">${job.area}</span>
                  <h2>${job.title}</h2>
                </div>
                <span class="compatibility ${job.compatibility}">${compatibilityText(job.compatibility)}</span>
              </div>
                <div class="score-bar" aria-hidden="true"><span style="--score: ${compatibilityScore(job.compatibility)}%"></span></div>
                <p><strong>Por qué puede servirte:</strong> ${job.reason}</p>
                <p><strong>Que destacar:</strong> ${job.highlight}</p>
                <p><strong>Donde postularte:</strong> ${job.companies}</p>
                <div class="job-meta">
                  <span>${job.workMode}</span>
                  <span>Nivel ${job.level}</span>
                </div>
                <div class="job-tip"><span>${job.tip}</span></div>
              </article>
            `,
          )
          .join("")}
      </div>

      ${result.secondaryOptions?.length ? `
        <section class="other-options">
          <span class="panel-label">Otras opciones que también podrías considerar</span>
          <div class="category-grid compact-badges">
            ${result.secondaryOptions.map((option) => `<span class="category-badge">${escapeHtml(option.title)}</span>`).join("")}
          </div>
        </section>
      ` : ""}

      ${GigRecommendationsBlock(result)}

      <section class="guidance">
        <h2>Consejos para mejorar tus chances</h2>
        <ul>${result.advice.map((item) => `<li>${item}</li>`).join("")}</ul>
      </section>

      <section class="company-section">
        <div>
          <span class="panel-label">Dónde podrías postularte</span>
          <h2>Tipos de empresas para buscar cerca tuyo</h2>
        </div>
        <img class="section-art small" src="${assets.companyLocation}" alt="" />
        <div class="company-grid">
          ${result.companySuggestions.map((suggestion) => CompanySuggestionCard(suggestion)).join("")}
        </div>
      </section>

      <section class="next-steps">
        <div>
          <span class="panel-label">Proximos pasos</span>
          <h2>Qué hacer ahora</h2>
        </div>
        <div class="steps-list">
          ${result.nextSteps
            .map(
              (item, index) => `
                <div class="step-card">
                  <span>${index + 1}</span>
                  <p>${item}</p>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>

      <div class="output-grid">
        ${TextOutput("mensaje", "Mensaje para WhatsApp", "Copialo y mandalo cuando encuentres una empresa o comercio que este tomando gente.", result.WhatsAppMessage, "Copiar mensaje")}
        ${TextOutput("cv", "Mini CV textual", "Una base simple para pegar en una postulación o mandar por mensaje.", result.miniCv, "Copiar mini CV")}
      </div>

      <div class="bottom-actions">
        <button class="primary-button" type="button" data-action="save-profile">${saveStatus === "saving" ? "Guardando..." : "Guardar o actualizar mi perfil"}</button>
        ${savedProfile ? `<button class="secondary-button" type="button" data-action="profile">Ver mi perfil</button>` : ""}
        <button class="primary-button" type="button" data-action="edit">Ajustar mis datos</button>
        <button class="secondary-button" type="button" data-action="restart">Empezar de nuevo</button>
      </div>
      ${saveStatus === "error" ? `<div class="form-error">No se pudo guardar. Revisa la configuración de Supabase o probá de nuevo.</div>` : ""}
    </section>
  `;
}

function BestOpportunity(job) {
  return `
    <section class="best-card">
      <span class="panel-label">Tu mejor oportunidad ahora</span>
      <div class="job-card-top">
        <div>
          <span class="job-área">${job.area}</span>
          <h2>${job.title}</h2>
        </div>
        <span class="compatibility ${job.compatibility}">${compatibilityText(job.compatibility)}</span>
      </div>
      <div class="score-bar" aria-hidden="true"><span style="--score: ${compatibilityScore(job.compatibility)}%"></span></div>
      <p>${job.reason}</p>
      <p><strong>Que destacar:</strong> ${job.highlight}</p>
      <p><strong>Donde postularte:</strong> ${job.companies}</p>
      <div class="job-meta">
        <span>${job.workMode}</span>
        <span>Nivel ${job.level}</span>
      </div>
      <div class="job-tip"><span>${job.tip}</span></div>
    </section>
  `;
}

function GigRecommendationsBlock(result, compact = false) {
  const gigs = result.gigRecommendations || [];
  if (!gigs.length) return "";

  return `
    <section class="gig-section">
      <div class="split-section">
        <div>
          <span class="panel-label">Changas cerca de vos</span>
          <h2>${compact ? "Changas recomendadas para tu perfil" : "Ideas de changas según lo que contaste"}</h2>
          <p>Estas no son ofertas reales todavía. Son ideas de changas que podrías buscar u ofrecer en tu zona.</p>
        </div>
        <img class="section-art small" src="${assets.messageCv}" alt="" />
      </div>
      <div class="gig-grid">
        ${gigs.map((gig, index) => GigCard(gig, index, compact)).join("")}
      </div>
      ${result.secondaryGigs?.length ? `
        <div class="other-gigs">
          <span class="panel-label">Otras changas que podrías considerar</span>
          <div class="category-grid compact-badges">
            ${result.secondaryGigs.map((item) => `<span class="category-badge">${escapeHtml(item.name)}</span>`).join("")}
          </div>
        </div>
      ` : ""}
    </section>
  `;
}

function GigCard(gig, index, compact) {
  const copyId = `${compact ? "perfil-" : ""}${gig.id || `gig-${index}`}`;
  return `
    <article class="gig-card">
      <div class="job-card-top">
        <div>
          <span class="job-área">${escapeHtml(gig.category)}</span>
          <h3>${escapeHtml(gig.name)}</h3>
        </div>
        <span class="compatibility ${gig.compatibility}">${compatibilityText(gig.compatibility)}</span>
      </div>
      <p><strong>Por qué puede encajar:</strong> ${escapeHtml(gig.reason)}</p>
      <p><strong>Qué necesitás:</strong> ${escapeHtml(gig.needs)}</p>
      <p><strong>Pago estimado:</strong> ${escapeHtml(gig.payType)}</p>
      <p><strong>Dónde ofrecerte:</strong> ${escapeHtml(gig.places)}</p>
      <div class="job-meta">
        <span>Fácilidad: ${escapeHtml(gig.ease)}</span>
      </div>
      <textarea class="copy-source" id="${copyId}-text" readonly>${escapeHtml(gig.message)}</textarea>
      <button class="copy-button full" type="button" data-copy="${copyId}" data-label="Copiar mensaje">Copiar mensaje</button>
    </article>
  `;
}

function SavedProfile(saved) {
  return `
    <section class="results-section">
      <div class="results-heading">
        <img class="results-art" src="${assets.trust}" alt="" />
        <span class="eyebrow">Perfil creado</span>
        <h1>Tu perfil fue creado correctamente.</h1>
        <p>${saved?.source === "supabase" ? "Quedó guardado en la base de datos de Laburá UY." : "Quedó guardado en este navegador porque Supabase aún no está configurado."}</p>
      </div>
      ${MyProfile(saved, false)}
    </section>
  `;
}

function MyProfile(saved, wrap = true) {
  const currentProfile = saved?.profile || profile;
  const result = saved?.result || createRecommendationResult(currentProfile);
  const topJobs = result.recommendations.map((job) => job.title).join(", ");
  const content = `
    <section class="profile-summary">
      <div class="split-section">
        <div>
          <span class="panel-label">Mi perfil</span>
          <h2>${escapeHtml(currentProfile.name || "Perfil laboral")}</h2>
          <p>${escapeHtml([currentProfile.location, currentProfile.department].filter(Boolean).join(", ") || "Uruguay")}</p>
        </div>
        <img class="section-art" src="${assets.profile}" alt="" />
      </div>
      <div class="profile-detail-grid">
        <p><strong>Rubros recomendados:</strong> ${result.recommendations.map((job) => job.area).filter((item, index, list) => list.indexOf(item) === index).join(", ")}</p>
        <p><strong>Puestos recomendados:</strong> ${topJobs}</p>
        <p><strong>Experiencia:</strong> ${escapeHtml(currentProfile.experience)}</p>
        <p><strong>Habilidades:</strong> ${escapeHtml(currentProfile.skills)}</p>
        <p><strong>Disponibilidad:</strong> ${escapeHtml(currentProfile.availability)}</p>
      </div>
    </section>
    <div class="output-grid">
      ${TextOutput("perfil-mensaje", "Mensaje listo para postularte", "Copialo para escribírle a una empresa.", result.WhatsAppMessage, "Copiar mensaje")}
      ${TextOutput("perfil-cv", "Mini CV", "Una versión simple para mandar por WhatsApp o pegar en una postulación.", result.miniCv, "Copiar mini CV")}
    </div>
    ${GigRecommendationsBlock(result, true)}
    <div class="bottom-actions">
      <button class="primary-button" type="button" data-action="edit">Editar perfil</button>
      <button class="secondary-button" type="button" data-action="restart">Crear nuevo perfil</button>
    </div>
  `;

  return wrap ? `<section class="results-section">${content}</section>` : content;
}

function CompanyInterestForm() {
  return `
    <section class="form-section">
      <div class="section-heading">
        <span class="section-icon image-icon" aria-hidden="true"><img src="${assets.companyLocation}" alt="" /></span>
        <div>
          <h1>Interés para empresas</h1>
          <p>Dejanos tus datos y necesidades de contratación. Por ahora queda como lista de interés para la próxima etapa.</p>
        </div>
      </div>
      ${companyStatus === "saved" ? `<div class="form-helper"><strong>Listo:</strong> recibimos el interés de la empresa.</div>` : ""}
      ${companyStatus === "error" ? `<div class="form-error">No se pudo guardar el interés. Probá de nuevo.</div>` : ""}
      <div class="form-card">
        <form class="profile-form" id="company-form">
          ${TextField("companyName", "Nombre de la empresa", "", "Ej: Supermercado La Costa", true)}
          ${TextField("contactName", "Persona de contacto", "", "Ej: Martin", false)}
          ${TextField("email", "Email", "", "empresa@email.com", true)}
          ${TextField("phone", "Teléfono", "", "099 123 456", false)}
          ${TextField("city", "Ciudad o zona", "", "Ej: Maldonado, Cordón, Las Piedras", false)}
          ${TextArea("hiringNeeds", "¿Qué perfiles te interesaría recibir?", "", "Ej: vendedores, limpieza, mozos para temporada, cadetes con libreta...", "Esto ayuda a preparar el futuro panel de empresas.")}
          <div class="form-actions wide">
            <button class="primary-button" type="submit">${companyStatus === "saving" ? "Guardando..." : "Enviar interés"}</button>
            <button class="secondary-button" type="button" data-action="home">Volver al inicio</button>
          </div>
        </form>
      </div>
    </section>
  `;
}

function AdminProfilesPanel() {
  const rows = adminProfiles
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.full_name || "Sin nombre")}</td>
          <td>${escapeHtml(item.city || "-")}</td>
          <td>${escapeHtml(item.department || "-")}</td>
          <td>${formatList(item.interested_categories)}</td>
          <td>${escapeHtml(item.availability || "-")}</td>
          <td>${formatRecommendedJobs(item.recommended_jobs)}</td>
          <td>${formatDate(item.created_at)}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <section class="results-section">
      <div class="results-heading">
        <img class="results-art" src="${assets.trust}" alt="" />
        <span class="eyebrow">Admin privado</span>
        <h1>Perfiles creados en Laburá UY</h1>
        <p>Vista interna para analizar demanda. Solo usuarios con rol admin pueden cargar estos datos.</p>
        <div class="profile-pills">
          <span>${adminProfiles.length} perfiles</span>
          <span>Datos protegidos por Supabase RLS</span>
        </div>
      </div>

      ${adminStatus === "loading" ? `<div class="form-helper"><strong>Cargando:</strong> buscando perfiles guardados.</div>` : ""}
      ${adminStatus === "denied" ? `<div class="form-error">No tenés permisos de administrador para ver esta sección.</div>` : ""}

      <section class="admin-panel">
        <div class="split-section">
          <div>
            <span class="panel-label">Admin / Perfiles creados</span>
            <h2>Resumen para validar la plataforma</h2>
            <p>No se muestran teléfonos ni emails en esta tabla. La idea es analizar rubros, zonas y demanda.</p>
          </div>
          <button class="secondary-button" type="button" data-action="admin">Actualizar</button>
        </div>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Ciudad</th>
                <th>Departamento</th>
                <th>Rubros</th>
                <th>Disponibilidad</th>
                <th>Puestos recomendados</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              ${rows || `<tr><td colspan="7">Todavía no hay perfiles para mostrar.</td></tr>`}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function Footer() {
  return `
    <footer class="site-footer">
      <div class="footer-brand">
        <img class="footer-logo" src="${assets.logo}" alt="Laburá UY" />
      </div>
      <p>Herramienta simple para ordenar la búsqueda laboral, hecha por Uruguayos, para Uruguayos.</p>
    </footer>
  `;
}

function CompanySuggestionCard(suggestion) {
  return `
    <article class="company-card">
      <span class="company-type">${suggestion.type}</span>
      <p><strong>Por qué conviene:</strong> ${suggestion.reason}</p>
      <div class="company-message">
        <span>Mensaje corto</span>
        <p>${suggestion.message}</p>
      </div>
      <p class="maps-tip">${suggestion.mapsTip}</p>
    </article>
  `;
}

function TextOutput(id, title, description, text, buttonLabel) {
  return `
    <section class="text-output">
      <div class="output-heading"><h2>${title}</h2></div>
      <p>${description}</p>
      <textarea readonly id="${id}-text">${escapeHtml(text)}</textarea>
      <button class="copy-button full" type="button" data-copy="${id}" data-label="${buttonLabel}">${buttonLabel}</button>
    </section>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", handleAction);
  });

  document.querySelectorAll("#profile-form input, #profile-form textarea, #profile-form select").forEach((element) => {
    element.addEventListener("input", syncFormField);
    element.addEventListener("change", syncFormField);
  });

  document.querySelectorAll("[data-field]").forEach((element) => {
    element.addEventListener("click", () => {
      updateProfile({
        [element.dataset.field]: element.dataset.value,
      });
      render();
    });
  });

  document.querySelectorAll("[data-interest]").forEach((element) => {
    element.addEventListener("click", () => {
      const interest = element.dataset.interest;
      const exists = profile.interests.includes(interest);
      updateProfile({
        interests: exists
          ? profile.interests.filter((item) => item !== interest)
          : [...profile.interests, interest],
      });
      render();
    });
  });

  document.querySelectorAll("[data-copy]").forEach((element) => {
    element.addEventListener("click", async () => {
      const id = element.dataset.copy;
      const label = element.dataset.label || "Copiar";
      const text = document.getElementById(`${id}-text`).value;
      await copyToClipboard(text);
      element.textContent = "Copiado";
      element.classList.add("copied");
      window.setTimeout(() => {
        element.textContent = label;
        element.classList.remove("copied");
      }, 1600);
    });
  });

  document.getElementById("profile-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextProfile = {
      name: data.get("name").trim(),
      location: data.get("location").trim(),
      department: data.get("department").trim(),
      age: data.get("age").trim(),
      experience: data.get("experience").trim(),
      skills: data.get("skills").trim(),
      education: data.get("education"),
      availability: data.get("availability").trim(),
      workType: data.get("workType"),
      contact: data.get("contact").trim(),
    };
    updateProfile(nextProfile);

    const validationError = validateProfile(profile);
    if (validationError) {
      formError = validationError;
      render();
      document.querySelector(".form-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    formError = "";
    step = "results";
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("auth-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email").trim();
    const password = data.get("password");

    authError = "";
    authMessage = authMode === "signup" ? "Creando tu cuenta..." : "Entrando...";
    render();

    try {
      if (authMode === "signup") {
        const result = await signUp(email, password);
        if (!result.session) {
          authMessage = "Cuenta creada. Revisa tu email si Supabase te pide confirmar, y despues inicia sesión.";
          authMode = "signin";
          render();
          return;
        }
      } else {
        await signIn(email, password);
      }

      authMessage = "";
      authError = "";
      if (pendingAfterAuth === "profile") {
        await loadMyProfile();
        return;
      }
      if (pendingAfterAuth === "admin") {
        await loadAdminProfiles();
        return;
      }
      step = "form";
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      authMessage = "";
      authError = error.message || "No se pudo entrar. Revisa email y contraseña.";
      render();
    }
  });

  document.getElementById("company-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    companyStatus = "saving";
    render();

    try {
      await saveCompanyInterest({
        companyName: data.get("companyName").trim(),
        contactName: data.get("contactName").trim(),
        email: data.get("email").trim(),
        phone: data.get("phone").trim(),
        city: data.get("city").trim(),
        hiringNeeds: data.get("hiringNeeds").trim(),
      });
      companyStatus = "saved";
    } catch {
      companyStatus = "error";
    }

    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function validateProfile(current) {
  const missing = [];
  if (!current.name.trim()) missing.push("nombre");
  if (!current.location.trim()) missing.push("zona o departamento");
  if (!current.experience.trim()) missing.push("experiencia o changas");
  if (!current.skills.trim()) missing.push("tareas que sabés hacer");
  if (!current.availability.trim()) missing.push("horarios disponibles");

  if (!missing.length) return "";
  return `Para darte un resultado útil, completa: ${missing.join(", ")}.`;
}

function syncFormField(event) {
  const field = event.currentTarget.name;
  if (!field) return;

  updateProfile({
    [field]: event.currentTarget.value,
  });
}

function updateProfile(changes) {
  profile = {
    ...profile,
    ...changes,
  };
}

async function handleAction(event) {
  event.preventDefault();
  const action = event.currentTarget.dataset.action;

  if (action === "home") step = "home";
  if (action === "section") {
    const target = event.currentTarget.dataset.target;
    step = "home";
    render();
    window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
    return;
  }
  if (action === "login") {
    pendingAfterAuth = "form";
    authMode = "signin";
    authError = "";
    authMessage = "";
    step = "auth";
  }
  if (action === "logout") {
    signOut();
    savedProfile = null;
    saveStatus = "";
    authMessage = "";
    authError = "";
    step = "home";
  }
  if (action === "auth-signin") {
    authMode = "signin";
    authError = "";
    authMessage = "";
    step = "auth";
  }
  if (action === "auth-signup") {
    authMode = "signup";
    authError = "";
    authMessage = "";
    step = "auth";
  }
  if (action === "start") {
    if (!getCurrentUser()) {
      pendingAfterAuth = "form";
      authMode = "signup";
      authError = "";
      authMessage = "";
      step = "auth";
    } else {
      step = "form";
    }
  }
  if (action === "company") {
    companyStatus = "";
    step = "company";
  }
  if (action === "example") {
    if (!getCurrentUser()) {
      pendingAfterAuth = "form";
      authMode = "signup";
      step = "auth";
      render();
      return;
    }
    profile = { ...exampleProfile };
    formError = "";
    step = "results";
  }
  if (action === "edit") step = "form";
  if (action === "profile") {
    if (!getCurrentUser()) {
      pendingAfterAuth = "profile";
      authMode = "signin";
      authError = "";
      authMessage = "";
      step = "auth";
    } else {
      await loadMyProfile();
      return;
    }
  }
  if (action === "admin") {
    if (!getCurrentUser()) {
      pendingAfterAuth = "admin";
      authMode = "signin";
      authError = "";
      authMessage = "Para entrar al panel admin, primero inicia sesión.";
      step = "auth";
    } else {
      await loadAdminProfiles();
      return;
    }
  }
  if (action === "save-profile") {
    saveCurrentProfile();
    return;
  }
  if (action === "restart") {
    profile = { ...emptyProfile };
    formError = "";
    savedProfile = null;
    saveStatus = "";
    step = "form";
  }

  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function saveCurrentProfile() {
  if (!getCurrentUser()) {
    pendingAfterAuth = "form";
    authMode = "signup";
    authMessage = "Para guardar tu perfil, primero crea una cuenta o inicia sesión.";
    step = "auth";
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  saveStatus = "saving";
  render();

  const result = createRecommendationResult(profile);
  try {
    const saved = await saveProfile(profile, result);
    savedProfile = {
      ...saved,
      profile: { ...profile },
      result,
    };
    saveStatus = "";
    step = "saved";
  } catch {
    saveStatus = "error";
  }

  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function loadMyProfile() {
  saveStatus = "";
  authError = "";
  try {
    const stored = await getMyProfile();
    if (!stored) {
      savedProfile = null;
      formError = "";
      step = "form";
      authMessage = "Todavía no tenés perfil guardado. Completalo y guardalo cuando termines.";
      render();
      return;
    }

    const mapped = mapStoredProfile(stored);
    profile = { ...emptyProfile, ...mapped };
    const result = createRecommendationResult(profile);
    savedProfile = {
      source: "supabase",
      record: stored,
      profile: { ...profile },
      result,
    };
    step = "profile";
  } catch (error) {
    authError = error.message || "No se pudo cargar tu perfil.";
    step = "auth";
  }

  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function loadAdminProfiles() {
  adminStatus = "loading";
  step = "admin";
  render();

  try {
    adminProfiles = await getAdminProfiles();
    adminStatus = "";
  } catch {
    adminProfiles = [];
    adminStatus = "denied";
  }

  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Some browsers block clipboard permissions; use the older selection fallback.
    }
  }

  const temporary = document.createElement("textarea");
  temporary.value = text;
  temporary.setAttribute("readonly", "");
  temporary.style.position = "fixed";
  temporary.style.opacity = "0";
  document.body.appendChild(temporary);
  temporary.select();
  document.execCommand("copy");
  temporary.remove();
}

function compatibilityText(value) {
  if (value === "alto") return "Compatibilidad alta";
  if (value === "medio") return "Compatibilidad media";
  return "Compatibilidad baja";
}

function compatibilityScore(value) {
  if (value === "alto") return 92;
  if (value === "medio") return 66;
  return 38;
}

function formatWorkType(value) {
  const labels = {
    fijo: "Busca trabajo fijo",
    zafral: "Busca trabajo zafral",
    changas: "Busca changas",
    cualquiera: "Abierto a opciones",
  };

  return labels[value] || "Abierto a opciones";
}

function formatList(value) {
  if (!Array.isArray(value) || !value.length) return "-";
  return value.map((item) => escapeHtml(item)).join(", ");
}

function formatRecommendedJobs(value) {
  if (!Array.isArray(value) || !value.length) return "-";
  return value
    .slice(0, 3)
    .map((job) => escapeHtml(job.title || job.puesto || String(job)))
    .join(", ");
}

function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("es-UY", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

render();
