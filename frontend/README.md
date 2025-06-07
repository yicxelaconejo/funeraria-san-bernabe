# Sistema de Gestión de Recorridos de Cobro - Funeraria San Bernabé

Este es un sistema web desarrollado para gestionar los recorridos de cobro de la Funeraria San Bernabé. El sistema está dividido en dos partes principales: un **frontend** construido con **React + Vite** y un **backend** desarrollado en **Node.js + Express + MongoDB**.

---

## 👥 Colaboradoras

- **Yicxela Conejo Conejo** (rama: `yicxela`)
- **Xiomara [Apellido]** (rama: `xiomara`)

---

## 🗂️ Estructura del Proyecto

funeraria-san-bernabe/
│
├── frontend/ # Interfaz del usuario en React
│ ├── src/
│ │ ├── api/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ └── ...
│
├── backend/ # Lógica del servidor en Node.js
│ ├── src/
│ │ ├── controllers/
│ │ ├── middlewares/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── schemas/
│ │ ├── utils/
│ │ ├── app.js
│ │ └── db.js
│ └── ...
│
└── README.md

---

## 🚀 Configuración para desarrollo

1. Clona el repositorio:

```bash
git clone https://github.com/TU_USUARIO/funeraria-san-bernabe.git
cd funeraria-san-bernabe

cd frontend
npm install

cd ../backend
npm install

cd frontend
npm run dev

cd backend
node src/app.js


