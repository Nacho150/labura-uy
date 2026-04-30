# Labura UY

MVP web para ayudar a personas en Uruguay a descubrir trabajos que encajan con su experiencia, habilidades, ubicacion y disponibilidad.

La primera version funciona sin base de datos, autenticacion ni APIs externas. Todo se guarda en estado local durante la sesion y las recomendaciones se generan con reglas simples por palabras clave.

Para evitar friccion en el MVP, la app se sirve como archivos estaticos con un servidor chico de Node.js. No requiere base de datos, login, APIs externas ni variables de entorno.

## Funcionalidades

- Pagina de inicio clara y pensada para celular.
- Formulario simple de perfil laboral.
- Recomendacion de 5 puestos posibles.
- Explicacion de compatibilidad por puesto.
- Consejos para mejorar las chances.
- Mensaje listo para copiar y enviar por WhatsApp.
- Mini CV textual generado automaticamente.
- Datos de ejemplo para probar rapido.

## Como correr el proyecto

1. Entrar a la carpeta del proyecto:

```bash
cd "C:\Users\ignac\Documents\Codex\2026-04-30\quiero-que-me-ayudes-a-crear"
```

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar la app:

```bash
npm run dev
```

4. Abrir la URL local:

```bash
http://127.0.0.1:5173
```

## Scripts

- `npm run dev`: inicia el entorno local.
- `npm run build`: genera la carpeta `dist/` lista para publicar.
- `npm run preview`: inicia el servidor local para revisar la app.

## Build de produccion

Para generar los archivos publicables:

```bash
npm run build
```

El resultado queda en:

```text
dist/
```

Esa carpeta contiene `index.html` y `src/` con los archivos estaticos necesarios.

## Variables de entorno

No hay variables de entorno necesarias por ahora.

La app no usa:

- Base de datos.
- Login.
- Pagos.
- APIs externas.
- Scraping.

## Publicar en Vercel

Opcion recomendada: conectar el repositorio.

1. Subir el proyecto a GitHub.
2. Entrar a Vercel.
3. Crear un nuevo proyecto e importar el repositorio.
4. Usar esta configuracion:

```text
Framework Preset: Other
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

El archivo `vercel.json` ya deja configurado:

- `buildCommand`: `npm run build`
- `outputDirectory`: `dist`
- rewrite a `index.html`

## Publicar en Netlify

Opcion recomendada: conectar el repositorio.

1. Subir el proyecto a GitHub.
2. Entrar a Netlify.
3. Crear un nuevo sitio desde Git.
4. Usar esta configuracion:

```text
Build command: npm run build
Publish directory: dist
```

El archivo `netlify.toml` ya deja configurado el build y la carpeta de publicacion.

## Deploy manual

Tambien podes publicar manualmente:

1. Ejecutar:

```bash
npm run build
```

2. Subir la carpeta `dist/` a un hosting estatico.

Ejemplos: Netlify Drop, Vercel CLI, Cloudflare Pages o cualquier servidor estatico.

## Estructura

```text
docs/
  ARCHITECTURE.md
scripts/
  build.mjs
src/
  main.js
  data/
    exampleProfile.js
  domain/
    profileSchema.js
    jobOfferSchema.js
  logic/
    recommendations.js
  services/
    users/
      userRepository.js
    jobs/
      externalJobSources.js
    cv/
      cvPdfService.js
    messaging/
      whatsappService.js
    companies/
      companyPanelService.js
  styles.css
netlify.toml
vercel.json
```

## Arquitectura lista para crecer

La app sigue funcionando 100% local, pero ahora tiene carpetas preparadas para convertirla en una herramienta real:

- `domain/`: define la forma de perfiles laborales y ofertas.
- `services/users/`: punto futuro para guardar usuarios en base de datos.
- `services/jobs/`: punto futuro para conectar ofertas laborales externas.
- `services/cv/`: punto futuro para generar CV en PDF.
- `services/messaging/`: punto futuro para compartir o enviar resultados por WhatsApp.
- `services/companies/`: punto futuro para un panel simple de empresas.

Ver mas detalle en `docs/ARCHITECTURE.md`.

## Etapas recomendadas

### Etapa 1: persistencia de usuarios

- Elegir base de datos: Supabase, Firebase, PostgreSQL o SQLite para una primera version simple.
- Guardar el perfil laboral usando `createProfileRecord`.
- Guardar tambien recomendaciones generadas, fecha y fuente.
- Agregar consentimiento claro antes de guardar datos personales.

### Etapa 2: ofertas laborales externas

- Definir fuentes permitidas: alianzas, APIs publicas, carga manual o acuerdos con empresas.
- Evitar scraping sin permiso.
- Normalizar todas las ofertas con `normalizeJobOffer`.
- Cruzar ofertas reales con la logica actual de recomendacion.

### Etapa 3: CV en PDF

- Convertir el mini CV textual en un layout imprimible.
- Agregar boton `Descargar CV`.
- Implementar `cvPdfService.generatePdf`.
- Mantener una version simple, clara y de una pagina.

### Etapa 4: WhatsApp

- Usar `createWhatsAppShareUrl` para abrir WhatsApp con el mensaje listo.
- Agregar opcion de enviar a una empresa concreta cuando exista una oferta real.
- Validar telefono y dejar claro que el usuario controla el envio.

### Etapa 5: panel simple para empresas

- Crear una vista separada para empresas.
- Permitir cargar una oferta basica: titulo, rubro, zona, horario, requisitos y contacto.
- Mostrar candidatos compatibles solo si el usuario acepto compartir sus datos.
- Agregar login empresarial recien cuando haya empresas reales usando el sistema.

## Proximos pasos sugeridos

- Guardar perfiles en una base de datos.
- Agregar edicion del resultado antes de copiar el mensaje.
- Permitir descargar el mini CV.
- Sumar ofertas reales o alianzas con empresas.
- Agregar filtros por departamento y rubro.
Deploy preparado para Vercel.
