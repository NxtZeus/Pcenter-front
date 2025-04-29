# PCenter - Frontend

Este es el frontend del proyecto PCenter, una aplicación de comercio electrónico desarrollada con React, Vite y Tailwind CSS.

## 🚀 Características

- Interfaz de usuario moderna y responsive
- Autenticación de usuarios
- Gestión de carrito de compras
- Catálogo de productos
- Sistema de pedidos
- Perfil de usuario
- Diseño optimizado para móvil y escritorio

## 🛠️ Tecnologías

- React 18.2.0
- Vite 5.2.0
- Tailwind CSS 3.4.3
- React Router DOM 6.23.1
- Axios 1.7.2
- React Icons 5.2.1
- LocalForage 1.10.0

## 📋 Requisitos Previos

- Node.js 16.0.0 o superior
- npm 7.0.0 o superior

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd [carpeta-con-repositorio-clonado]
```

2. Instalar dependencias:
```bash
npm install
```

## 🚀 Ejecución

Para desarrollo local:
```bash
npm run dev
```

Para producción:
```bash
npm run build
```

## 📚 Estructura del Proyecto

```
tfg-frontend/
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── pages/            # Páginas de la aplicación
│   ├── context/          # Contextos de React
│   ├── hooks/            # Hooks personalizados
│   ├── services/         # Servicios de API
│   ├── utils/            # Utilidades
│   ├── assets/           # Recursos estáticos
│   └── App.jsx          # Componente principal
├── public/               # Archivos públicos
├── package.json          # Dependencias y scripts
└── vite.config.js        # Configuración de Vite
```

## 🎨 Estilos

El proyecto utiliza Tailwind CSS para los estilos. Los colores y temas personalizados están definidos en `tailwind.config.js`.

## 🔐 Autenticación

La aplicación utiliza tokens JWT para la autenticación. Los tokens se almacenan en LocalForage para persistencia.

## 📦 Despliegue

El proyecto está configurado para desplegarse en Vercel. https://pcenter.vercel.app/

## Link del Backend: https://github.com/NxtZeus/Pcenter-back
