import { exampleProfile } from "./data/exampleProfile.js";
import { createRecommendationResult, emptyProfile } from "./logic/recommendations.js";

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

let profile = { ...emptyProfile };
let step = "home";
let formError = "";

const app = document.getElementById("root");

function render() {
  app.innerHTML = `
    <main>
      ${Header()}
      ${step === "home" ? `${Hero()}${HowItWorks()}${WhoIsItFor()}${TrustSection()}` : ""}
      ${step === "form" ? ProfileForm(profile) : ""}
      ${step === "results" ? Results(profile, createRecommendationResult(profile)) : ""}
      ${Footer()}
    </main>
  `;
  bindEvents();
}

function Header() {
  return `
    <header class="site-header">
      <a class="brand" href="#" data-action="home" aria-label="Labura UY inicio">
        <span class="brand-icon" aria-hidden="true">LU</span>
        <span class="brand-copy">
          <strong>Labura UY</strong>
          <small>Orientador laboral</small>
        </span>
      </a>
      <button class="header-action" type="button" data-action="start">Empezar</button>
    </header>
  `;
}

function Hero() {
  return `
    <section class="hero">
      <div class="hero-content">
        <div class="hero-kicker">Herramienta simple para buscar trabajo en Uruguay</div>
        <h1>Converti tu experiencia en mejores postulaciones.</h1>
        <p>Contanos que sabes hacer, donde estas y cuando podes trabajar. Labura UY te orienta con puestos recomendados, lugares donde postularte y mensajes listos para enviar.</p>
        <div class="hero-actions">
          <button class="primary-button" type="button" data-action="start">Empezar ahora</button>
          <button class="secondary-button" type="button" data-action="example">Ver ejemplo</button>
        </div>
        <div class="trust-strip" aria-label="Beneficios principales">
          <span>Sin registro</span>
          <span>No vendemos tus datos</span>
          <span>Listo para WhatsApp</span>
        </div>
      </div>
      <div class="hero-panel" aria-label="Vista previa del resultado">
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
      title: "Contanos tu experiencia",
      text: "Escribis trabajos anteriores, changas, tareas que sabes hacer, tu zona y tus horarios.",
    },
    {
      title: "Recibi trabajos recomendados",
      text: "Te mostramos puestos que pueden encajar con tu perfil y por que podrian servirte.",
    },
    {
      title: "Copia tu mensaje o CV y postulate",
      text: "Te llevas un mensaje para WhatsApp, un mini CV y lugares donde podrias postularte.",
    },
  ];

  return `
    <section class="info-section">
      <div class="section-heading compact">
        <span class="section-icon" aria-hidden="true">02</span>
        <div>
          <h2>Como funciona</h2>
          <p>Tres pasos simples para pasar de "no se que mandar" a tener una busqueda mas ordenada.</p>
        </div>
      </div>
      <div class="info-grid">
        ${steps
          .map(
            (step, index) => `
              <article class="info-card">
                <span class="info-number">${index + 1}</span>
                <h3>${step.title}</h3>
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
    "Personas que trabajaron en comercio, limpieza, gastronomia, hoteleria o servicios.",
    "Quienes tienen experiencia informal, changas o tareas familiares y no saben como presentarlas.",
    "Personas que quieren buscar por WhatsApp, Google Maps o Instagram sin entrar en portales complejos.",
    "Quienes estan empezando y necesitan opciones de entrada como auxiliar, repositor, cadete o aprendiz.",
  ];

  return `
    <section class="audience-section">
      <div class="audience-panel">
        <span class="panel-label">Para quien es</span>
        <h2>Hecho para gente que quiere buscar mejor, sin complicarse.</h2>
        <div class="audience-list">
          ${items.map((item) => `<p>${item}</p>`).join("")}
        </div>
        <button class="primary-button" type="button" data-action="start">Armar mi perfil</button>
      </div>
    </section>
  `;
}

function TrustSection() {
  return `
    <section class="trust-section">
      <div class="trust-card">
        <span class="panel-label">Confianza y claridad</span>
        <h2>Una ayuda concreta para presentarte mejor.</h2>
        <div class="trust-grid">
          <p>No vendemos tus datos ni pedimos cuenta para usar la herramienta.</p>
          <p>Esto no reemplaza una entrevista, pero te ayuda a llegar mejor preparado.</p>
          <p>La recomendacion es orientativa y esta pensada para rubros reales de Uruguay.</p>
        </div>
      </div>
    </section>
  `;
}

function ProfileForm(current) {
  return `
    <section class="form-section" id="formulario">
      <div class="section-heading">
        <span class="section-icon" aria-hidden="true">01</span>
        <div>
          <h1>Armemos tu perfil laboral</h1>
          <p>Con unas pocas respuestas armamos una recomendacion clara, sin palabras raras ni formularios eternos.</p>
        </div>
      </div>
      <div class="form-helper">
        <strong>Tip:</strong> escribi como hablas. Si hiciste changas, cuidaste personas, limpiaste casas o ayudaste en un negocio, eso tambien cuenta.
      </div>
      ${formError ? `<div class="form-error" role="alert">${formError}</div>` : ""}

      <form class="profile-form" id="profile-form">
        ${TextField("name", "Tu nombre", current.name, "Ej: Andrea", true, "", "Solo para personalizar el resultado.")}
        ${TextField("location", "Zona o departamento", current.location, "Ej: Montevideo, Salto, Maldonado", true, "", "Asi podemos sugerir lugares cercanos o zonas con temporada.")}
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
        ${TextField("contact", "Telefono o email (opcional)", current.contact, "Ej: 099 123 456 o tu email", false, "wide", "Queda solo en esta pantalla por ahora; no se guarda en ninguna base de datos.")}
        <div class="form-actions wide">
          <button class="primary-button" type="submit">Ver mis trabajos recomendados</button>
          <button class="secondary-button" type="button" data-action="example">Probar con datos de ejemplo</button>
        </div>
      </form>
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
        <p>No vendemos tus datos.</p>
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
                <p><strong>Por que puede servirte:</strong> ${job.reason}</p>
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
        <button class="primary-button" type="button" data-action="edit">Ajustar mis datos</button>
        <button class="secondary-button" type="button" data-action="restart">Empezar de nuevo</button>
      </div>
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
      <p>${job.reason}</p>
      <div class="job-tip"><span>${job.tip}</span></div>
    </section>
  `;
}

function Footer() {
  return `
    <footer class="site-footer">
      <div class="footer-brand">
        <span class="brand-icon" aria-hidden="true">LU</span>
        <strong>Labura UY</strong>
      </div>
      <p>Herramienta simple para ordenar la busqueda laboral en Uruguay. Sin base de datos, sin login y sin pagos en esta version.</p>
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

function handleAction(event) {
  event.preventDefault();
  const action = event.currentTarget.dataset.action;

  if (action === "home") step = "home";
  if (action === "start") step = "form";
  if (action === "example") {
    profile = { ...exampleProfile };
    formError = "";
    step = "results";
  }
  if (action === "edit") step = "form";
  if (action === "restart") {
    profile = { ...emptyProfile };
    formError = "";
    step = "form";
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
