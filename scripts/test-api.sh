#!/bin/bash
echo "Test API emails"
curl http://localhost:5678/webhook/emails

echo "Test API send-reply"
curl -X POST http://localhost:5678/webhook/api/send-reply \
  -H "Content-Type: application/json" \
  -d '{"to":"test@example.com","subject":"Test","message":"Test"}'