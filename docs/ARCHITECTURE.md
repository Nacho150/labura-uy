# Arquitectura preparada

Laburá UY sigue siendo un MVP sin base de datos, login ni integraciones externas. Esta estructura deja puntos de entrada claros para crecer sin mezclar toda la lógica en la pantalla principal.

## Capas

```text
src/
  domain/
    profileSchema.js
    jobOfferSchema.js
  services/
    users/
      userRepository.js
    jobs/
      externalJobSources.js
    cv/
      cvPdfService.js
    messaging/
      WhatsAppService.js
    companies/
      companyPanelService.js
```

## Responsabilidades

- `domain/`: define la forma esperada de los datos principales.
- `services/users/`: futuro guardado y lectura de usuarios.
- `services/jobs/`: futura conexion con fuentes externas de ofertas.
- `services/cv/`: futura generación de CV en PDF.
- `services/messaging/`: futura preparacion de links o envios por WhatsApp.
- `services/companies/`: futura base para panel de empresas.

## Regla importante

La UI puede usar estos servicios, pero los servicios no deben depender de la UI. Así se puede cambiar la pantalla, sumar base de datos o integrar APIs sin rehacer toda la app.
