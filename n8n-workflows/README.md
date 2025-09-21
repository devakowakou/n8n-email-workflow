# Workflows n8n

## main-workflow.json
- Récupération automatique emails Gmail
- Traitement et extraction données
- Génération résumé IA via Groq
- Sauvegarde mails-today.json

## send-reply-workflow.json  
- API POST /api/send-reply
- Validation données
- Envoi via Gmail API

## Import
1. Ouvrir n8n
2. Import from file
3. Configurer credentials Gmail + Groq