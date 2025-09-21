#!/bin/bash

# Script d'initialisation du projet n8n-email-manager

echo "Initialisation du projet n8n-email-manager"

# Créer la structure des dossiers
mkdir -p n8n-email-manager/{n8n-data,data,frontend,docs}
cd n8n-email-manager

# Créer docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  n8n:
    image: docker.n8n.io/n8nio/n8n
    container_name: n8n-email-manager
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - GENERIC_TIMEZONE=Europe/Madrid
      - TZ=Europe/Madrid
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=n8npassword
      - WEBHOOK_URL=http://localhost:5678/
      - N8N_HOST=localhost
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - N8N_LOG_LEVEL=info
      - NODE_FUNCTION_ALLOW_EXTERNAL=*
    volumes:
      - ./n8n-data:/home/node/.n8n
      - ./data:/home/node/data
    healthcheck:
      test: ["CMD-SHELL", "wget --quiet --tries=1 --spider http://localhost:5678/healthz || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 30s
EOF

# Créer .gitignore
cat > .gitignore << 'EOF'
# n8n data
n8n-data/
data/*.json

# Environment files
.env
.env.local

# Logs
*.log
npm-debug.log*

# Dependencies
node_modules/

# OS
.DS_Store
Thumbs.db
EOF

# Créer README initial
cat > README.md << 'EOF'
# Email Manager - n8n + Interface Web

## Démarrage Rapide

```bash
# Démarrer n8n
docker-compose up -d

# Accéder à l'interface
open http://localhost:5678
```

## Credentials à configurer
- Gmail Client ID: [VOTRE_CLIENT_ID]
- Gmail Client Secret: [VOTRE_CLIENT_SECRET]
- Groq API Key: [VOTRE_CLE_GROQ]
EOF

echo "Structure du projet créée !"
echo "Dossier: n8n-email-manager/"
echo "Docker Compose configuré"
echo ""
echo " Prochaines étapes:"
echo "1. cd n8n-email-manager"
echo "2. docker-compose up -d"
echo "3. Ouvrir http://localhost:5678"
