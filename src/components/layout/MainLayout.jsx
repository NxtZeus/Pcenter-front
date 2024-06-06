// src/components/layout/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

// Componente principal de layout
const MainLayout = () => {
  return (
    // Contenedor principal con una altura mínima de la pantalla y una disposición en filas, principalmente para posicionar el footer abajo de la pantalla.
    <div className='min-h-screen grid grid-rows-[auto_1fr_auto]'>
      {/* Header del sitio */}
      <Header />
      {/* Contenido principal, donde se renderizarán los componentes hijos mediante el Outlet */}
      <main>
        <Outlet />
      </main>
      {/* Footer del sitio */}
      <Footer />
    </div>
  );
};

export default MainLayout;
