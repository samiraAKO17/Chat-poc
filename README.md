# 💬 Chat PoC - Spring Boot & Angular

## 🚀 Objectif
Ce projet est un **Proof of Concept (PoC)** qui démontre la faisabilité d’un **chat temps réel** entre un client et le support en utilisant **Spring Boot** (backend) et **Angular** (frontend).

## 📂 Structure
- `backend/` → Application **Spring Boot** (WebSocket avec STOMP).
- `frontend/` → Application **Angular** (client WebSocket avec SockJS + STOMP).

## ⚙️ Installation & Lancement

### 1. Backend (Spring Boot)
```bash
cd Backend
mvn spring-boot:run
➡️ Le serveur démarre sur http://localhost:8080
Endpoint WebSocket : ws://localhost:8080/chat-websocket

### 2. Frontend (Angular)
cd frontend
npm install
ng serve --open
➡️ L’UI démarre sur http://localhost:4200

🧪 Test du PoC

Ouvrez 2 navigateurs différents sur http://localhost:4200
.

Tapez un message dans l’un → il apparaît en temps réel dans les deux fenêtres ✅

🛠️ Stack Technique

Backend : Java 17, Spring Boot (WebSocket + STOMP)

Frontend : Angular 17, STOMP.js, Sock