# Labura UY

Labura UY es una herramienta web para Uruguay que ayuda a personas a crear un perfil laboral simple, recibir recomendaciones de puestos posibles y postularse mejor con un mensaje de WhatsApp y un mini CV.

La app mantiene una landing publica, pero ahora permite crear cuenta e iniciar sesion con Supabase Auth para que cada persona tenga su propio perfil privado.

## Que hace

- Registro e inicio de sesion con email y contrasena usando Supabase Auth.
- No guarda contrasenas manualmente.
- Permite crear, guardar, ver y editar un perfil laboral propio.
- Recomienda puestos segun experiencia, habilidades, zona, disponibilidad, estudios, libreta, locomocion, rubros de interes y tipo de trabajo buscado.
- Genera mensaje listo para WhatsApp y mini CV textual.
- Protege perfiles con Row Level Security: cada usuario solo ve y edita su perfil.
- Incluye un panel privado admin para ver perfiles creados y validar demanda.
- Mantiene una lista de interes para empresas, sin panel publico todavia.

## Secciones institucionales

La landing incluye:

- `Quienes somos`: explica el origen y proposito social de Labura UY.
- `Para quien es`: muestra perfiles de personas para quienes la herramienta puede servir.
- `Como se usa`: resume el flujo en pasos simples.
- `Changas cerca de vos`: muestra ideas de trabajos por hora, por dia o eventuales segun el perfil.

La navegacion superior permite ir a:

- Inicio.
- Quienes somos.
- Para quien es.
- Como se usa.
- Changas.
- Crear perfil.
- Mi perfil.
- Iniciar sesion o cerrar sesion.

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
- `admin_users`
- columna `profiles.user_id`
- relacion con `auth.users.id`
- politicas RLS para que cada usuario solo vea y edite su perfil
- politica RLS para que solo admins puedan listar todos los perfiles
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

## Como funciona la recomendacion laboral

La logica esta en:

```text
src/logic/recommendations.js
```

El sistema usa puntajes segun:

- Experiencia escrita.
- Habilidades.
- Ciudad y departamento.
- Disponibilidad.
- Estudios.
- Libreta de conducir.
- Locomocion propia.
- Tipo de trabajo buscado: fijo, zafral, changas o cualquiera.
- Rubros de interes.
- Palabras clave detectadas.
- Si la persona tiene o no experiencia formal.

Cada recomendacion incluye:

- Puesto recomendado.
- Rubro.
- Compatibilidad.
- Motivo.
- Que destacar.
- Donde postularse.
- Si puede ser fijo, zafral o changa.
- Nivel de entrada: basico, intermedio o con experiencia.

Tambien se muestran `Otras opciones que tambien podrias considerar` como chips.

## Changas cerca de vos

La app incluye una seccion orientativa llamada `Changas cerca de vos`.

Importante: por ahora no son ofertas reales ni vacantes publicadas por empresas. Son ideas de changas que una persona podria ofrecer o buscar segun su perfil.

Aparece en:

- La landing publica, como seccion informativa.
- La pantalla de resultados, con changas recomendadas.
- `Mi perfil`, como bloque de ideas segun los datos guardados.

Cada changa incluye:

- Nombre de la changa.
- Categoria.
- Compatibilidad.
- Por que podria encajar.
- Que necesita la persona.
- Tipo de pago estimado: por hora, por dia, por tarea o por evento.
- Donde podria ofrecerse.
- Mensaje listo para copiar y enviar por WhatsApp.
- Nivel de facilidad.

La logica usa puntajes segun:

- Experiencia y habilidades escritas.
- Ciudad y departamento.
- Disponibilidad.
- Si busca changas, trabajo fijo, zafral o cualquiera.
- Libreta de conducir y locomocion.
- Rubros de interes.
- Palabras clave como limpieza, cocina, mascotas, mandados, reparto, jardineria, ninos, adultos mayores, WhatsApp, redes o computadora.

Las categorias internas de changas son:

- Hogar y limpieza.
- Jardin y mantenimiento.
- Cuidado de personas.
- Mascotas.
- Reparto y mandados.
- Eventos y temporada.
- Cocina y alimentos.
- Digital simple.
- Mudanzas y fuerza fisica.

Para agregar nuevas changas, sumar una linea al catalogo `gigCatalog` dentro de `src/logic/recommendations.js`.

Mas adelante, si Labura UY se convierte en un marketplace real de changas, se podrian agregar campos como:

```text
preferred_work_modes
suggested_gigs
saved_gigs
```

Por ahora las changas se calculan en la app y no se guardan como ofertas reales.

## Sectores laborales incluidos

- Atencion al cliente y ventas.
- Hoteleria y turismo.
- Gastronomia.
- Limpieza y servicios.
- Seguridad y vigilancia.
- Choferes, cadetes y reparto.
- Construccion y oficios.
- Mantenimiento y edificios.
- Administracion basica.
- Cuidado de personas.
- Mascotas y hogar.
- Eventos y temporada.
- Campo, rural y exterior.
- Deposito y logistica.
- Trabajos digitales simples.
- Changas y cuenta propia.

Para agregar nuevos puestos, sumar una linea al catalogo `roleCatalog` dentro de `src/logic/recommendations.js`, indicando titulo, sector, palabras clave, tipo de trabajo, nivel y familia.

## Seguridad

La tabla `profiles` tiene Row Level Security activo.

Las politicas principales son:

- Insertar: solo si `auth.uid() = user_id`.
- Leer: solo si `auth.uid() = user_id`.
- Editar: solo si `auth.uid() = user_id`.
- Borrar: solo si `auth.uid() = user_id`.

Esto significa que un usuario no puede consultar ni modificar perfiles de otros usuarios desde la app.

## Panel admin privado

La app incluye una vista `Admin / Perfiles creados`.

El panel muestra:

- Nombre.
- Ciudad.
- Departamento.
- Rubros de interes.
- Disponibilidad.
- Puestos recomendados.
- Fecha de creacion.

No muestra telefono ni email en la tabla admin.

Para definir tu usuario como admin:

1. Primero crea tu cuenta desde la app.
2. En Supabase, anda a `SQL Editor`.
3. Ejecuta este SQL cambiando el email por el tuyo:

```sql
insert into admin_users (user_id)
select id from auth.users
where email = 'tu-email@ejemplo.com'
on conflict (user_id) do nothing;
```

4. Cerra sesion y volve a iniciar sesion en Labura UY.
5. Toca `Admin`.

Si un usuario comun toca `Admin`, Supabase no le devuelve los perfiles porque no esta en `admin_users`.

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

## Pendiente para admin futuro

El panel admin actual sirve para validar demanda. Para una version comercial conviene agregar filtros, exportacion controlada, auditoria de accesos y roles mas detallados.
