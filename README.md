# Labura UY

Labura UY es una herramienta web para Uruguay que ayuda a personas a crear un perfil laboral simple, recibir recomendaciones de puestos posibles y postularse mejor con un mensaje de WhatsApp y un mini CV.

La app mantiene una landing publica, pero ahora permite crear cuenta e iniciar sesion con Supabase Auth para que cada persona tenga su propio perfil privado.

## Que hace

- Registro e inicio de sesion con email y contrasena usando Supabase Auth.
- No guarda contrasenas manualmente.
- Permite crear, guardar, ver y editar un perfil laboral propio.
- Recomienda puestos segun experiencia, habilidades, zona, disponibilidad, libreta y locomocion.
- Genera mensaje listo para WhatsApp y mini CV textual.
- Protege perfiles con Row Level Security: cada usuario solo ve y edita su perfil.
- Mantiene una lista de interes para empresas, sin panel publico todavia.

## Tecnologia

- App estatica con JavaScript puro.
- Estilos en CSS.
- Supabase Auth y Supabase Database.
- Sin React, Next.js ni Tailwind.
- Sin scraping, pagos ni panel publico de candidatos.

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

El resultado queda en `dist/`.

## Variables de entorno

Crear o revisar `.env` usando `.env.example` como referencia:

```text
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu_publishable_key
```

En Vercel van en:

```text
Project Settings > Environment Variables
```

Usar solo la `Publishable key` o anon key publica. No usar `service_role` en el frontend.

## Configurar Supabase Auth

1. En Supabase, entrar al proyecto.
2. Ir a `Authentication > Providers`.
3. Dejar habilitado `Email`.
4. Para probar rapido, se puede desactivar temporalmente `Confirm email`.
5. Si `Confirm email` queda activado, el usuario debe confirmar el correo antes de iniciar sesion.

Elegimos email y contrasena porque es simple de probar y no depende de configurar enlaces de redireccion como magic link.

## Crear tablas y politicas

1. Ir a `SQL Editor` en Supabase.
2. Abrir el archivo `docs/supabase.sql`.
3. Copiar todo el contenido.
4. Pegarlo en Supabase.
5. Tocar `Run`.

Ese SQL crea o actualiza:

- `profiles`
- `companies_interest`
- columna `profiles.user_id`
- relacion con `auth.users.id`
- politicas RLS para que cada usuario solo vea y edite su perfil
- insercion publica para interes de empresas

## Como probar el flujo completo

1. Entrar a la web.
2. Tocar `Crear perfil`.
3. Crear una cuenta con email y contrasena.
4. Completar el formulario laboral.
5. Ver recomendaciones.
6. Tocar `Guardar o actualizar mi perfil`.
7. Ir a Supabase > Table Editor > `profiles`.
8. Deberia aparecer una fila con `user_id`.
9. Cerrar sesion.
10. Iniciar sesion otra vez.
11. Tocar `Mi perfil`.
12. Verificar que carga el perfil guardado.
13. Editar datos y guardar otra vez.

## Seguridad

La tabla `profiles` tiene Row Level Security activo.

Las politicas principales son:

- Insertar: solo si `auth.uid() = user_id`.
- Leer: solo si `auth.uid() = user_id`.
- Editar: solo si `auth.uid() = user_id`.
- Borrar: solo si `auth.uid() = user_id`.

Esto significa que un usuario no puede consultar ni modificar perfiles de otros usuarios desde la app.

## Deploy en Vercel

Configuracion recomendada:

```text
Framework Preset: Other
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Despues de cambiar variables de entorno, hacer `Redeploy` sin usar build cache.

## Archivos principales

```text
index.html
scripts/build.mjs
src/main.js
src/styles.css
src/env.js
src/logic/recommendations.js
src/services/auth/authService.js
src/services/profiles/profileRepository.js
src/assets/
docs/supabase.sql
```

## Preparado para admin futuro

Todavia no existe panel admin. Para una proxima etapa conviene crear roles especiales en Supabase, una tabla de permisos y politicas separadas para que solo administradores puedan ver perfiles con consentimiento del usuario.
