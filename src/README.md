# Labura UY

Labura UY es una herramienta web para Uruguay que ayuda a personas a crear un perfil laboral simple, recibir recomendaciones de puestos posibles y postularse mejor con un mensaje de WhatsApp y un mini CV.

La app esta pensada para personas que no quieren usar portales complejos o que no tienen un CV perfecto, pero si tienen experiencia real, changas, habilidades o disponibilidad para trabajar.

## Que hace

- Permite completar un perfil laboral simple.
- Recomienda puestos segun experiencia, habilidades, zona, disponibilidad, libreta y locomocion.
- Muestra una pantalla de resultados con compatibilidad, consejos y lugares donde postularse.
- Genera un mensaje listo para WhatsApp.
- Genera un mini CV textual.
- Permite guardar el perfil.
- Prepara una lista de interes para empresas o comercios.

## Tecnologia

- App estatica con JavaScript puro.
- Estilos en CSS.
- Sin React, Next.js ni Tailwind.
- Sin scraping.
- Supabase opcional para guardar perfiles.
- Si Supabase no esta configurado, el perfil se guarda localmente en el navegador para poder probar.

## Como correr localmente

```bash
npm install
npm run dev
```

Abrir:

```text
http://127.0.0.1:5173
```

## Build

```bash
npm run build
```

El resultado queda en:

```text
dist/
```

## Variables de entorno

Copiar `.env.example` como referencia:

```text
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu_clave_anon_publica
```

En Vercel, estas variables se cargan en:

```text
Project Settings > Environment Variables
```

Durante el build se genera:

```text
dist/labura-config.json
```

Ese archivo expone solamente la URL publica del proyecto y la anon key de Supabase. No usar service role keys ni claves privadas en el frontend.

## Configurar Supabase

1. Crear un proyecto en Supabase.
2. Ir a SQL Editor.
3. Copiar y ejecutar el contenido de:

```text
docs/supabase.sql
```

Esto crea:

- `profiles`: perfiles laborales.
- `companies_interest`: empresas o comercios interesados.
- Politicas basicas para permitir inserciones desde la web.

Importante: esta version MVP permite crear registros sin login. Antes de mostrar perfiles a empresas o permitir editar/borrar desde distintas sesiones, conviene agregar Supabase Auth y politicas por usuario.

## Flujo de perfil

1. El usuario entra a la landing.
2. Toca `Crear mi perfil`.
3. Completa experiencia, habilidades, zona, disponibilidad, rubros y contacto opcional.
4. Ve recomendaciones laborales.
5. Puede copiar mensaje de WhatsApp o mini CV.
6. Puede tocar `Guardar mi perfil`.
7. Si Supabase esta configurado, se guarda en `profiles`.
8. Si Supabase no esta configurado, se guarda en localStorage para probar.
9. Ve la pantalla `Tu perfil fue creado correctamente`.
10. Puede entrar a `Mi perfil`, editar o crear uno nuevo.

## Empresas

La landing incluye una seccion:

```text
Sos empresa o comercio?
```

El formulario de interes guarda:

- Nombre de empresa.
- Contacto.
- Email.
- Telefono.
- Ciudad.
- Necesidades de contratacion.

Si Supabase esta configurado, se guarda en `companies_interest`. Si no, queda localmente en el navegador.

## Deploy en Vercel

Configuracion recomendada:

```text
Framework Preset: Other
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Despues de subir cambios a GitHub, Vercel deberia desplegar automaticamente.

Si no ves cambios visuales, abrir la web con un parametro nuevo:

```text
https://labura-uy.vercel.app/?v=10
```

## Archivos principales

```text
index.html
scripts/build.mjs
src/main.js
src/styles.css
src/logic/recommendations.js
src/services/profiles/profileRepository.js
src/assets/
docs/supabase.sql
```

## Pendiente para proxima etapa

- Agregar Supabase Auth para que cada usuario edite o borre su perfil.
- Agregar panel real para empresas.
- Permitir que el usuario decida si su perfil puede ser visible para empresas.
- Descargar CV en PDF.
- Crear ofertas laborales manuales o por alianzas.
- Agregar filtros por departamento, rubro y disponibilidad.
