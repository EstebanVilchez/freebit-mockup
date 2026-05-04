# Freebit 🪙
### Level Up Your Finances
 
Mockup de app móvil para gestión de deudas personales con gamificación 2D estilo Mario Bros. Desarrollado como prueba de concepto para validar la propuesta de valor antes de buscar inversión.
 
---
 
## ¿Qué es Freebit?
 
Freebit convierte el pago de deudas en una experiencia de videojuego. Cada deuda es una misión, cada pago avanza el mapa, y los buenos comportamientos financieros se premian con recompensas reales (gift cards, descuentos, beneficios bancarios).
 
El problema que resuelve: en Costa Rica, la mayoría de personas con deudas activas no tienen sistema, no tienen motivación extra para pagar antes, y nadie les da nada a cambio de comportarse bien financieramente.
 
---
 
## Pantallas del mockup
 
| Pantalla | Descripción |
|----------|-------------|
| Onboarding | Splash screen con personaje pixel art animado, registro de usuario |
| Registro de deudas | Selector por tipo, campos de deuda, elección de estrategia Snowball / Avalanche |
| Dashboard — Mapa | HUD estilo videojuego, deudas como nodos de progreso en un mapa 2D |
| Tienda de premios | Catálogo de recompensas canjeables por Koins |
| Perfil y score | Estadísticas, barra de récord crediticio estimado, logros desbloqueados |
| Registro de pago | Carga de comprobante, verificación por OCR, preview de Koins a ganar |
 
---
 
## Sistema de Koins
 
Los Koins son la moneda interna de Freebit. Se ganan por comportamiento de pago positivo y se canjean en la tienda.
 
| Evento | Koins |
|--------|-------|
| Pago regular a tiempo | +20 |
| Pago anticipado | +35 |
| Abono extraordinario | +50 |
| 3 meses seguidos sin atraso | +50 bonus |
| Deuda liquidada | +100 |
 
---
 
## Stack técnico sugerido (MVP)
 
- **App:** React Native o Flutter
- **Backend:** Node.js + Express / NestJS
- **Base de datos:** PostgreSQL
- **Auth:** Firebase Auth
- **OCR (verificación de pagos):** Google Vision API o AWS Textract
- **Storage:** AWS S3 o Firebase Storage
- **Notificaciones:** Firebase Cloud Messaging
---
 
## Modelo de negocio
 
Sin suscripción de usuario. Los ingresos vienen de:
 
1. **Retailers** — financian premios a cambio de visibilidad y tráfico de usuarios calificados (MVP)
2. **Bancos — retención** — fee por usuario activo con buen historial (Fase 2)
3. **Cross-sell financiero** — comisión por referidos a productos bancarios (Fase 2)
4. **Datos agregados anonimizados** — valor para bancos, aseguradoras y fintechs (Escala)
---
 
## Mercado objetivo
 
**MVP:** Costa Rica  
**Expansión:** LATAM (Panamá, Guatemala, primera fase)
 
Usuario: persona de 25-45 años, 2-4 deudas activas, ingreso estable, historial crediticio medio. No está en mora, pero quiere mejorar su score para acceder a productos financieros mejores.
 
---
 
## Roadmap
 
```
MVP (0-3 meses)     → Registro de deudas, mapa gamificado, OCR, Koins, tienda básica
Fase 2 (3-9 meses)  → Integración bancaria, panel de socios, beneficios en tasa
Fase 3 (9-18 meses) → API bancaria oficial, expansión LATAM, score crediticio real
```
 
---
 
## Documentación
 
El repositorio incluye:
 
- `freebit-mockup.html` — mockup interactivo con las 6 pantallas principales
- `freebit-spec.docx` — documento de especificación completo para equipos de UX, Frontend y Backend
---
 
## Estado del proyecto
 
🟡 **Concepto validado — buscando inversión inicial**
 
Este mockup es el primer paso. El objetivo es conseguir un primer socio (banco o retailer costarricense) y capital semilla para desarrollar el MVP funcional.
 
---
