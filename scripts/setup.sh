#!/bin/bash
echo "Installation Email Manager"
mkdir -p n8n-data data
docker-compose up -d
cd frontend && npm install
echo "Installation terminée"