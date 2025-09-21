# Architecture Technique Détaillée

## Composants
- n8n (automatisation)
- Gmail API (emails)
- Groq AI (résumés)
- React (interface)

## Flux de données
[Diagrammes détaillés]

┌─────────────────┐    API Calls    ┌─────────────────┐
│                 │ ──────────────► │                 │
│  Interface Web  │                 │   Workflow n8n  │
│   (Frontend)    │ ◄────────────── │   (Backend)     │
│                 │    JSON Data    │                 │
└─────────────────┘                 └─────────────────┘
        │                                    │
        │                                    │
        ▼                                    ▼
┌─────────────────┐                 ┌─────────────────┐
│   Utilisateur   │                 │   Gmail API     │
│   (Browser)     │                 │   + Groq AI     │
└─────────────────┘                 └─────────────────┘