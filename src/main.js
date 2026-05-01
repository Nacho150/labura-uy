import { exampleProfile } from "./data/exampleProfile.js";
import { createRecommendationResult, emptyProfile } from "./logic/recommendations.js";
import { getCurrentUser, isAuthConfigured, signIn, signOut, signUp } from "./services/auth/authService.js";
import { getMyProfile, mapStoredProfile, saveCompanyInterest, saveProfile } from "./services/profiles/profileRepository.js";

const interests = [
  "Atencion al cliente",
  "Ventas",
  "Hoteleria",
  "Gastronomia",
  "Limpieza",
  "Seguridad",
  "Choferes",
  "Mantenimiento",
  "Construccion",
  "Administracion basica",
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

const app = document.getElementById("root");

function render() {
  app.innerHTML = `
    <main>
      ${Header()}
      ${step === "home" ? `${Hero()}${HowItWorks()}${WhoIsItFor()}${FeaturedCategories()}${TrustSection()}${CompanyCta()}${FinalCta()}` : ""}
      ${step === "auth" ? AuthScreen() : ""}
      ${step === "form" ? ProfileForm(profile) : ""}
      ${step === "results" ? Results(profile, createRecommendationResult(profile)) : ""}
      ${step === "saved" ? SavedProfile(savedProfile) : ""}
      ${step === "profile" ? MyProfile(savedProfile || { profile, result: createRecommendationResult(profile), source: "local" }) : ""}
      ${step === "company" ? CompanyInterestForm() : ""}
      ${Footer()}
    </main>
  `;
  bindEvents();
}

function Header() {
  const user = getCurrentUser();
  return `
    <header class="site-header">
      <a class="brand" href="#" data-action="home" aria-label="Labura UY inicio">
        <span class="brand-mark" aria-hidden="true">
          <img src="${assets.profile}" alt="" />
        </span>
        <img class="brand-logo" src="${assets.logo}" alt="Labura UY" />
      </a>
      <nav class="header-nav" aria-label="Navegacion principal">
        <button class="nav-link" type="button" data-action="home">Inicio</button>
        <button class="nav-link" type="button" data-action="start">Crear perfil</button>
        <button class="nav-link" type="button" data-action="profile">Mi perfil</button>
      </nav>
      <span class="header-badge">Uruguay</span>
      <button class="header-action" type="button" data-action="${user ? "logout" : "login"}">${user ? "Cerrar sesion" : "Iniciar sesion"}</button>
    </header>
  `;
}

function Hero() {
  return `
    <section class="hero">
      <div class="hero-content">
        <img class="hero-logo" src="${assets.logo}" alt="Labura UY" />
        <div class="hero-kicker">Herramienta simple para buscar trabajo en Uruguay</div>
        <h1>Encontra oportunidades laborales segun tu experiencia real.</h1>
        <p>Labura UY te ayuda a descubrir trabajos posibles, armar tu perfil y postularte mejor, aunque no tengas un CV perfecto.</p>
        <div class="hero-actions">
          <button class="primary-button" type="button" data-action="start">Crear mi perfil</button>
          <a class="secondary-button" href="#como-funciona">Ver como funciona</a>
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
        <div class="preview-list"><span>Auxiliar de limpieza</span><strong>Media</strong></div>
        <div class="preview-list"><span>Repositor/a</span><strong>Media</strong></div>
        <div class="hero-mini-note">Tu experiencia tambien vale, aunque no tengas un CV armado.</div>
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
      title: "Contanos tu experiencia",
      text: "Escribis trabajos anteriores, changas, tareas que sabes hacer, tu zona y tus horarios.",
    },
    {
      icon: assets.opportunity,
      title: "Recibi trabajos recomendados",
      text: "Te mostramos puestos que pueden encajar con tu perfil y por que podrian servirte.",
    },
    {
      icon: assets.messageCv,
      title: "Arma tu perfil laboral",
      text: "Ordenamos tu experiencia, tus habilidades y tus rubros recomendados en una vista clara.",
    },
    {
      icon: assets.companyLocation,
      title: "Postulate con un mensaje listo",
      text: "Te llevas un mensaje para WhatsApp, un mini CV y lugares donde podrias postularte.",
    },
  ];

  return `
    <section class="info-section" id="como-funciona">
      <div class="section-heading compact">
        <span class="section-icon" aria-hidden="true">02</span>
        <div>
          <h2>Como funciona</h2>
          <p>Cuatro pasos simples para pasar de "no se que mandar" a tener una busqueda mas ordenada.</p>
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
    </section>
  `;
}

function WhoIsItFor() {
  const items = [
    "Personas sin experiencia formal que quieren empezar por puestos de entrada.",
    "Trabajadores de temporada, zafrales o changas.",
    "Personas con experiencia en ventas, atencion al publico o caja.",
    "Hoteleria, gastronomia, limpieza y servicios.",
    "Choferes, cadetes, reparto, mantenimiento y construccion.",
    "Quienes quieren buscar por WhatsApp, Google Maps o Instagram sin portales complejos.",
  ];

  return `
    <section class="audience-section">
      <div class="audience-panel">
        <div class="split-section">
          <div>
            <span class="panel-label">Para quien es</span>
            <h2>Hecho para gente que quiere buscar mejor, sin complicarse.</h2>
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
    "Atencion al cliente",
    "Ventas",
    "Gastronomia",
    "Hoteleria",
    "Limpieza",
    "Seguridad",
    "Reparto",
    "Mantenimiento",
    "Administracion basica",
    "Cuidado de personas",
    "Temporada en Maldonado / Punta del Este",
  ];

  return `
    <section class="category-section">
      <div class="section-heading compact">
        <span class="section-icon image-icon" aria-hidden="true"><img src="${assets.companyLocation}" alt="" /></span>
        <div>
          <h2>Rubros destacados en Uruguay</h2>
          <p>La recomendacion se enfoca en rubros reales, de alta demanda y faciles de entender.</p>
        </div>
      </div>
      <div class="category-grid">
        ${categories.map((category) => `<span class="category-badge">${category}</span>`).join("")}
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
          <p><strong>Practico.</strong>Esto no reemplaza una entrevista, pero te ayuda a llegar mejor preparado.</p>
          <p><strong>Local.</strong>La recomendacion es orientativa y esta pensada para rubros reales de Uruguay.</p>
          <p><strong>Control.</strong>Tus datos se usan para crear tu perfil laboral y mas adelante vas a poder editarlo o borrarlo.</p>
          <p><strong>Permiso.</strong>No compartimos tu informacion publicamente sin tu permiso.</p>
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
        <h2>Sos empresa o comercio?</h2>
        <p>Mas adelante vas a poder encontrar candidatos segun zona, experiencia y disponibilidad.</p>
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
        <span class="panel-label">Empeza simple</span>
        <h2>Crea tu perfil laboral en pocos minutos</h2>
        <p>No necesitas tener todo perfecto. Empeza con lo que ya sabes hacer.</p>
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
          <h1>${isSignUp ? "Crea tu cuenta para guardar tu perfil." : "Entra a tu cuenta de Labura UY."}</h1>
          <p>Usamos Supabase Auth. Tu contrasena no se guarda en Labura UY y tu perfil queda asociado a tu usuario.</p>
          <div class="profile-pills">
            <span>Tu perfil solo lo ves vos</span>
            <span>Podras editarlo</span>
            <span>Sin compartir con empresas todavia</span>
          </div>
        </div>

        <div class="form-card auth-card">
          <div class="auth-tabs" role="tablist">
            <button class="${!isSignUp ? "active" : ""}" type="button" data-action="auth-signin">Iniciar sesion</button>
            <button class="${isSignUp ? "active" : ""}" type="button" data-action="auth-signup">Crear cuenta</button>
          </div>
          ${!isReady ? `<div class="form-error">Supabase no esta configurado. Revisa las variables en Vercel.</div>` : ""}
          ${authMessage ? `<div class="form-helper"><strong>Listo:</strong> ${authMessage}</div>` : ""}
          ${authError ? `<div class="form-error" role="alert">${authError}</div>` : ""}
          <form class="profile-form auth-form" id="auth-form">
            ${TextField("email", "Email", "", "tuemail@ejemplo.com", true, "wide", "Usalo despues para entrar a tu perfil.")}
            <label class="wide">
              Contrasena
              <input required name="password" type="password" minlength="6" placeholder="Minimo 6 caracteres" />
              <span class="field-help">No la guardamos nosotros. La maneja Supabase Auth de forma segura.</span>
            </label>
            <div class="form-actions wide">
              <button class="primary-button" type="submit">${isSignUp ? "Crear cuenta" : "Iniciar sesion"}</button>
              <button class="secondary-button" type="button" data-action="home">Volver al inicio</button>
            </div>
          </form>
          <div class="privacy-note">
            <p>No compartimos tus datos sin tu permiso.</p>
            <p>Mas adelante podras elegir si queres que empresas vean tu perfil.</p>
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
          <p>Con unas pocas respuestas armamos una recomendacion clara, sin palabras raras ni formularios eternos.</p>
        </div>
      </div>
      <div class="form-helper">
        <strong>Tip:</strong> escribi como hablas. Si hiciste changas, cuidaste personas, limpiaste casas o ayudaste en un negocio, eso tambien cuenta.
        ${getCurrentUser() ? "<br />Estas trabajando dentro de tu cuenta. Al guardar, el perfil queda solo para vos." : ""}
      </div>
      ${formError ? `<div class="form-error" role="alert">${formError}</div>` : ""}

      <div class="form-card">
      <form class="profile-form" id="profile-form">
        ${TextField("name", "Tu nombre", current.name, "Ej: Andrea", true, "", "Solo para personalizar el resultado.")}
        ${TextField("location", "Ciudad o zona", current.location, "Ej: Pocitos, San Carlos, Las Piedras", true, "", "Asi podemos sugerir lugares cercanos.")}
        ${TextField("department", "Departamento", current.department, "Ej: Montevideo, Canelones, Maldonado", false, "", "Ayuda a mejorar recomendaciones por temporada y zona.")}
        ${TextField("age", "Edad (opcional)", current.age, "Ej: 29", false, "", "Si no queres ponerla, dejala vacia.")}
        ${TextArea("experience", "Experiencia o changas", current.experience, "Ej: trabaje en comercio, hice limpieza, cuide personas, ayude en obra...", "Puede ser trabajo formal, informal, familiar o changas.")}
        ${TextArea("skills", "Tareas que sabes hacer", current.skills, "Ej: atencion al publico, caja, cocina, pintura, computadora basica...", "Escribi tareas concretas, aunque parezcan simples.")}
        ${SelectField("education", "Nivel de estudios", current.education, [
          "",
          "Primaria completa",
          "Ciclo basico incompleto",
          "Ciclo basico completo",
          "Bachillerato incompleto",
          "Bachillerato completo",
          "UTU o curso tecnico",
          "Terciario o universitario",
        ], "Si no estas seguro, elegi la opcion mas cercana.")}
        ${TextField("availability", "Horarios disponibles", current.availability, "Ej: manana, tarde, noche, fines de semana", true, "", "Contanos cuando podrias trabajar.")}
        ${Segmented("hasTransport", "Locomocion propia", current.hasTransport, "Auto, moto, bici o forma propia de moverte.")}
        ${Segmented("hasLicense", "Libreta de conducir", current.hasLicense, "Si tenes libreta, puede abrir opciones de reparto, cadete o chofer.")}
        ${SelectField("workType", "Tipo de trabajo", current.workType, ["fijo", "zafral", "changas", "cualquiera"], "Si te sirve cualquier opcion, deja cualquiera.")}
        <div class="wide">
          <p class="field-title">Rubros que te interesan</p>
          <p class="field-help">Elegis uno o varios. Si no elegis, igual te recomendamos segun lo que escribiste.</p>
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
        ${TextField("contact", "Telefono o email (opcional)", current.contact, "Ej: 099 123 456 o tu email", false, "wide", "Se usa para armar tu perfil laboral si decidis guardarlo.")}
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
        <button class="${value === "si" ? "active" : ""}" type="button" data-field="${name}" data-value="si">Si</button>
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
        <p>Mas adelante podras elegir si queres compartirlo con empresas.</p>
        <p>Esto no reemplaza una entrevista, pero te ayuda a postularte mejor.</p>
        <p>Tu experiencia tambien vale, aunque no tengas un CV armado.</p>
      </section>

      <div class="results-label">
        <span>Trabajos recomendados</span>
        <p>Ordenados segun lo que contaste en el formulario.</p>
      </div>

      <div class="recommendations">
        ${result.recommendations
          .map(
            (job) => `
              <article class="job-card">
                <div class="job-card-top">
                <div>
                  <span class="job-area">${job.area}</span>
                  <h2>${job.title}</h2>
                </div>
                <span class="compatibility ${job.compatibility}">${compatibilityText(job.compatibility)}</span>
              </div>
                <div class="score-bar" aria-hidden="true"><span style="--score: ${compatibilityScore(job.compatibility)}%"></span></div>
                <p><strong>Por que puede servirte:</strong> ${job.reason}</p>
                <p><strong>Que destacar:</strong> ${job.highlight}</p>
                <p><strong>Donde postularte:</strong> ${job.companies}</p>
                <div class="job-tip"><span>${job.tip}</span></div>
              </article>
            `,
          )
          .join("")}
      </div>

      <section class="guidance">
        <h2>Consejos para mejorar tus chances</h2>
        <ul>${result.advice.map((item) => `<li>${item}</li>`).join("")}</ul>
      </section>

      <section class="company-section">
        <div>
          <span class="panel-label">Donde podrias postularte</span>
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
          <h2>Que hacer ahora</h2>
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
        ${TextOutput("mensaje", "Mensaje para WhatsApp", "Copialo y mandalo cuando encuentres una empresa o comercio que este tomando gente.", result.whatsappMessage, "Copiar mensaje")}
        ${TextOutput("cv", "Mini CV textual", "Una base simple para pegar en una postulacion o mandar por mensaje.", result.miniCv, "Copiar mini CV")}
      </div>

      <div class="bottom-actions">
        <button class="primary-button" type="button" data-action="save-profile">${saveStatus === "saving" ? "Guardando..." : "Guardar o actualizar mi perfil"}</button>
        ${savedProfile ? `<button class="secondary-button" type="button" data-action="profile">Ver mi perfil</button>` : ""}
        <button class="primary-button" type="button" data-action="edit">Ajustar mis datos</button>
        <button class="secondary-button" type="button" data-action="restart">Empezar de nuevo</button>
      </div>
      ${saveStatus === "error" ? `<div class="form-error">No se pudo guardar. Revisa la configuracion de Supabase o proba de nuevo.</div>` : ""}
    </section>
  `;
}

function BestOpportunity(job) {
  return `
    <section class="best-card">
      <span class="panel-label">Tu mejor oportunidad ahora</span>
      <div class="job-card-top">
        <div>
          <span class="job-area">${job.area}</span>
          <h2>${job.title}</h2>
        </div>
        <span class="compatibility ${job.compatibility}">${compatibilityText(job.compatibility)}</span>
      </div>
      <div class="score-bar" aria-hidden="true"><span style="--score: ${compatibilityScore(job.compatibility)}%"></span></div>
      <p>${job.reason}</p>
      <p><strong>Que destacar:</strong> ${job.highlight}</p>
      <p><strong>Donde postularte:</strong> ${job.companies}</p>
      <div class="job-tip"><span>${job.tip}</span></div>
    </section>
  `;
}

function SavedProfile(saved) {
  return `
    <section class="results-section">
      <div class="results-heading">
        <img class="results-art" src="${assets.trust}" alt="" />
        <span class="eyebrow">Perfil creado</span>
        <h1>Tu perfil fue creado correctamente.</h1>
        <p>${saved?.source === "supabase" ? "Quedo guardado en la base de datos de Labura UY." : "Quedo guardado en este navegador porque Supabase aun no esta configurado."}</p>
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
      ${TextOutput("perfil-mensaje", "Mensaje listo para postularte", "Copialo para escribirle a una empresa.", result.whatsappMessage, "Copiar mensaje")}
      ${TextOutput("perfil-cv", "Mini CV", "Una version simple para mandar por WhatsApp o pegar en una postulacion.", result.miniCv, "Copiar mini CV")}
    </div>
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
          <h1>Interes para empresas</h1>
          <p>Dejanos tus datos y necesidades de contratacion. Por ahora queda como lista de interes para la proxima etapa.</p>
        </div>
      </div>
      ${companyStatus === "saved" ? `<div class="form-helper"><strong>Listo:</strong> recibimos el interes de la empresa.</div>` : ""}
      ${companyStatus === "error" ? `<div class="form-error">No se pudo guardar el interes. Proba de nuevo.</div>` : ""}
      <div class="form-card">
        <form class="profile-form" id="company-form">
          ${TextField("companyName", "Nombre de la empresa", "", "Ej: Supermercado La Costa", true)}
          ${TextField("contactName", "Persona de contacto", "", "Ej: Martin", false)}
          ${TextField("email", "Email", "", "empresa@email.com", true)}
          ${TextField("phone", "Telefono", "", "099 123 456", false)}
          ${TextField("city", "Ciudad o zona", "", "Ej: Maldonado, Cordón, Las Piedras", false)}
          ${TextArea("hiringNeeds", "Que perfiles te interesaria recibir?", "", "Ej: vendedores, limpieza, mozos para temporada, cadetes con libreta...", "Esto ayuda a preparar el futuro panel de empresas.")}
          <div class="form-actions wide">
            <button class="primary-button" type="submit">${companyStatus === "saving" ? "Guardando..." : "Enviar interes"}</button>
            <button class="secondary-button" type="button" data-action="home">Volver al inicio</button>
          </div>
        </form>
      </div>
    </section>
  `;
}

function Footer() {
  return `
    <footer class="site-footer">
      <div class="footer-brand">
        <img class="footer-logo" src="${assets.logo}" alt="Labura UY" />
      </div>
      <p>Herramienta simple para ordenar la busqueda laboral en Uruguay. Sin pagos, sin scraping y preparada para crecer con perfiles guardados.</p>
    </footer>
  `;
}

function CompanySuggestionCard(suggestion) {
  return `
    <article class="company-card">
      <span class="company-type">${suggestion.type}</span>
      <p><strong>Por que conviene:</strong> ${suggestion.reason}</p>
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
          authMessage = "Cuenta creada. Revisa tu email si Supabase te pide confirmar, y despues inicia sesion.";
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
      step = "form";
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      authMessage = "";
      authError = error.message || "No se pudo entrar. Revisa email y contrasena.";
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
  if (!current.skills.trim()) missing.push("tareas que sabes hacer");
  if (!current.availability.trim()) missing.push("horarios disponibles");

  if (!missing.length) return "";
  return `Para darte un resultado util, completa: ${missing.join(", ")}.`;
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
    authMessage = "Para guardar tu perfil, primero crea una cuenta o inicia sesion.";
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
      authMessage = "Todavia no tenes perfil guardado. Completalo y guardalo cuando termines.";
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
    fijo: "Busca fijo",
    zafral: "Busca zafral",
    changas: "Busca changas",
    cualquiera: "Abierto a opciones",
  };

  return labels[value] || "Abierto a opciones";
}

render();
