# Laburá UY

Laburá UY es una herramienta web para Uruguay que ayuda a personas a crear un perfil laboral simple, recibir recomendaciones de puestos posibles y postularse mejor con un mensaje de WhatsApp y un mini CV.

La app mantiene una landing pública, pero ahora permite crear cuenta e iniciar sesión con Supabase Auth para que cada persona tenga su propio perfil privado.

## Qué hace

- Registro e inicio de sesión con email y contraseña usando Supabase Auth.
- No guarda contraseñas manualmente.
- Permite crear, guardar, ver y editar un perfil laboral propio.
- Recomienda puestos según experiencia, habilidades, zona, disponibilidad, estudios, libreta, locomoción, rubros de interés y tipo de trabajo buscado.
- Genera mensaje listo para WhatsApp y mini CV textual.
- Protege perfiles con Row Level Security: cada usuario solo ve y edita su perfil.
- Incluye un panel privado admin para ver perfiles creados y validar demanda.
- Mantiene una lista de interés para empresas, sin panel público todavía.

## Secciónes institucionales

La landing incluye:

- `Quiénes somos`: explica el origen y propósito social de Laburá UY.
- `Para quién es`: muestra perfiles de personas para quiénes la herramienta puede servir.
- `Cómo se usa`: resume el flujo en pasos simples.
- `Changas cerca de vos`: muestra ideas de trabajos por hora, por día o eventuales según el perfil.

La navegación superior permite ir a:

- Inicio.
- Quiénes somos.
- Para quién es.
- Cómo se usa.
- Changas.
- Crear perfil.
- Mi perfil.
- Iniciar sesión o cerrar sesión.

## Tecnología

- App estática con JavaScript puro.
- Estilos en CSS.
- Supabase Auth y Supabase Database.
- Sin React, Next.js ni Tailwind.
- Sin scraping, pagos ni panel público de candidatos.

## Cómo correr localmente

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

Usar solo la `Publishable key` o anon key pública. No usar `service_role` en el frontend.

## Configurar Supabase Auth

1. En Supabase, entrar al proyecto.
2. Ir a `Authentication > Providers`.
3. Dejar habilitado `Email`.
4. Para probar rápido, se puede desactivar temporalmente `Confirm email`.
5. Si `Confirm email` queda activado, el usuario debe confirmar el correo antes de iniciar sesión.

Elegimos email y contraseña porque es simple de probar y no depende de configurar enlaces de redirección como magic link.

## Crear tablas y políticas

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
- políticas RLS para que cada usuario solo vea y edite su perfil
- politica RLS para que solo admins puedan listar todos los perfiles
- insercion pública para interés de empresas

## Cómo probar el flujo completo

1. Entrar a la web.
2. Tocar `Crear perfil`.
3. Crear una cuenta con email y contraseña.
4. Completar el formulario laboral.
5. Ver recomendaciones.
6. Tocar `Guardar o actualizar mi perfil`.
7. Ir a Supabase > Table Editor > `profiles`.
8. Deberia aparecer una fila con `user_id`.
9. Cerrar sesión.
10. Iniciar sesión otra vez.
11. Tocar `Mi perfil`.
12. Verificar que carga el perfil guardado.
13. Editar datos y guardar otra vez.

## Carga y edición de perfil guardado

Cuando un usuario inicia sesión, Laburá UY consulta Supabase Auth para obtener el usuario actual y después busca en la tabla `profiles` una fila con el mismo `user_id`.

Si el perfil existe:

- Se cargan sus datos guardados.
- La pantalla `Mi perfil` muestra la información actual.
- El botón `Editar perfil` abre el formulario prellenado.
- Al guardar, se actualiza el perfil existente.
- Las recomendaciones se muestran desde lo guardado o se recalculan si falta información.

Si el perfil no existe:

- Se muestra el formulario vacío.
- La app avisa que todavía no se creó el perfil laboral.

Para evitar duplicados, `profiles.user_id` debe ser único. El archivo `docs/supabase.sql` incluye:

```sql
create unique index if not exists profiles_user_id_unique on profiles(user_id);
```

La app guarda con `upsert` usando `user_id` como clave de conflicto. Eso permite crear el perfil la primera vez y actualizarlo en los siguientes guardados.

### Prueba recomendada

1. Crear una cuenta nueva.
2. Completar y guardar el perfil.
3. Cerrar sesión.
4. Iniciar sesión otra vez.
5. Verificar que `Mi perfil` carga los datos guardados.
6. Tocar `Editar perfil`.
7. Cambiar solo ciudad o disponibilidad.
8. Guardar.
9. Revisar en Supabase que sigue existiendo una sola fila para ese `user_id`.

## Cómo funciona la recomendación laboral

La lógica está en:

```text
src/logic/recommendations.js
```

El sistema usa puntajes según:

- Experiencia escrita.
- Habilidades.
- Ciudad y departamento.
- Disponibilidad.
- Estudios.
- Libreta de conducir.
- Locomoción propia.
- Tipo de trabajo buscado: fijo, zafral, changas o cualquiera.
- Rubros de interés.
- Palabras clave detectadas.
- Si la persona tiene o no experiencia formal.

Cada recomendación incluye:

- Puesto recomendado.
- Rubro.
- Compatibilidad.
- Motivo.
- Que destacar.
- Donde postularse.
- Si puede ser fijo, zafral o changa.
- Nivel de entrada: básico, intermedio o con experiencia.

También se muestran `Otras opciones que también podrías considerar` como chips.

## Changas cerca de vos

La app incluye una sección orientativa llamada `Changas cerca de vos`.

Importante: por ahora no son ofertas reales ni vacantes públicadas por empresas. Son ideas de changas que una persona podría ofrecer o buscar según su perfil.

Aparece en:

- La landing pública, como sección informativa.
- La pantalla de resultados, con changas recomendadas.
- `Mi perfil`, como bloque de ideas según los datos guardados.

Cada changa incluye:

- Nombre de la changa.
- Categoria.
- Compatibilidad.
- Por qué podría encajar.
- Que necesita la persona.
- Tipo de pago estimado: por hora, por día, por tarea o por evento.
- Donde podría ofrecerse.
- Mensaje listo para copiar y enviar por WhatsApp.
- Nivel de fácilidad.

La lógica usa puntajes según:

- Experiencia y habilidades escritas.
- Ciudad y departamento.
- Disponibilidad.
- Si busca changas, trabajo fijo, zafral o cualquiera.
- Libreta de conducir y locomoción.
- Rubros de interés.
- Palabras clave como limpieza, cocina, mascotas, mandados, reparto, jardinería, niños, adultos mayores, WhatsApp, redes o computadora.

Las categorías internas de changas son:

- Hogar y limpieza.
- Jardín y mantenimiento.
- Cuidado de personas.
- Mascotas.
- Reparto y mandados.
- Eventos y temporada.
- Cocina y alimentos.
- Digital simple.
- Mudanzas y fuerza física.

Para agregar nuevas changas, sumar una linea al catalogo `gigCatalog` dentro de `src/logic/recommendations.js`.

Más adelante, si Laburá UY se convierte en un marketplace real de changas, se podrían agregar campos como:

```text
preferred_work_modes
suggested_gigs
saved_gigs
```

Por ahora las changas se calculan en la app y no se guardan como ofertas reales.

## Sectores laborales incluidos

- Atención al cliente y ventas.
- Hotelería y turismo.
- Gastronomía.
- Limpieza y servicios.
- Seguridad y vigilancia.
- Choferes, cadetes y reparto.
- Construcción y oficios.
- Mantenimiento y edificios.
- Administración básica.
- Cuidado de personas.
- Mascotas y hogar.
- Eventos y temporada.
- Campo, rural y exterior.
- Depósito y logística.
- Trabajos digitales simples.
- Changas y cuenta propia.

Para agregar nuevos puestos, sumar una linea al catalogo `roleCatalog` dentro de `src/logic/recommendations.js`, indicando titulo, sector, palabras clave, tipo de trabajo, nivel y familia.

## Seguridad

La tabla `profiles` tiene Row Level Security activo.

Las políticas principales son:

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
- Rubros de interés.
- Disponibilidad.
- Puestos recomendados.
- Fecha de creacion.

No muestra teléfono ni email en la tabla admin.

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

4. Cerra sesión y volve a iniciar sesión en Laburá UY.
5. Toca `Admin`.

Si un usuario comun toca `Admin`, Supabase no le devuelve los perfiles porque no esta en `admin_users`.

## Deploy en Vercel

Configuración recomendada:

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

El panel admin actual sirve para validar demanda. Para una versión comercial conviene agregar filtros, exportación controlada, auditoría de accesos y roles más detallados.
