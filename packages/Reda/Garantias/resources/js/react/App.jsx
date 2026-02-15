import React, { StrictMode } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ReloadGuard from './varios/ReloadGuard';
import { AppProvider } from "./state.jsx";
import { Suspense } from 'react';
import { Indice } from "./pasos/Indice.jsx";
import { SeleccionarAseguradora } from "./pasos/SeleccionarAseguradora.jsx";
import { DatosPropiedad } from "./pasos/DatosPropiedad.jsx";
import { DatosArrendatario } from "./pasos/DatosArrendatario.jsx";
import { PersonasAdicionales } from "./pasos/PersonasAdicionales.jsx";
import { DetalleGarantia } from "./pasos/DetalleGarantia.jsx";
import { GarantiaEnviada } from "./pasos/GarantiaEnviada.jsx";
import { RevisionGarantia } from "./pasos/RevisionGarantia.jsx";
import { ContratoGarantia } from "./pasos/ContratoGarantia.jsx";
import { InventarioGarantia } from "./pasos/InventarioGarantia.jsx";
import { FirmaContrato } from "./pasos/FirmaContrato.jsx";
import { PagoGarantia } from "./pasos/PagoGarantia.jsx";
import { GifEspere } from "./varios";
import { colores } from "./vectores_objetos/colores.jsx";
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import {
  Container
} from '@mui/material';

// 1. DEFINICIÓN DE LA FUNCIÓN GENERADORA
const generateRoleRoutes = (baseConfig) => {
  const roles = [
    { prefix: 'user' },
    { prefix: 'admin' },
    { prefix: ':agencia/agent' }
  ];

  const finalRoutes = [];
  baseConfig.forEach(route => {
    roles.forEach(role => {
      // Añadimos un asterisco opcional al final para que React Router 
      // siempre capture la ruta incluso si hay variaciones por el refresco
      const fullPath = `/${role.prefix}${route.path}`.replace(/\/+/g, '/');
      
      finalRoutes.push({
        path: fullPath,
        component: route.component,
        protected: route.protected
      });
    });
  });
  return finalRoutes;
};

// 2. DEFINICIÓN DE LOS PASOS (Configuración única)
const processSteps = [
  { path: "/garantias", component: <Indice />, protected: false },
  { path: "/garantias/seleccionar-aseguradora/:idGarantia", component: <SeleccionarAseguradora />, protected: true },
  { path: "/garantias/datos-propiedad/:idGarantia", component: <DatosPropiedad />, protected: true },
  { path: "/garantias/datos-arrendatario/:idPersona", component: <DatosArrendatario />, protected: true },
  { path: "/garantias/personas-adicionales/:idPersona", component: <PersonasAdicionales />, protected: true },
  { path: "/garantias/detalle-garantia/:idGarantia", component: <DetalleGarantia />, protected: true },
  { path: "/garantias/garantia-enviada/:idGarantia", component: <GarantiaEnviada />, protected: true },
  { path: "/garantias/revision-garantia/:idGarantia", component: <RevisionGarantia />, protected: true },
  { path: "/garantias/contrato-garantia/:idGarantia", component: <ContratoGarantia />, protected: true },
  { path: "/garantias/inventario-garantia/:idGarantia", component: <InventarioGarantia />, protected: true },
  { path: "/garantias/firma-contrato/:idGarantia", component: <FirmaContrato />, protected: true },
  { path: "/garantias/pago-garantia/:idGarantia", component: <PagoGarantia />, protected: true },
];

// 3. GENERACIÓN DE LA LISTA FINAL
const allRoutes = generateRoleRoutes(processSteps);

const RoleRedirect = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  
  let destino = "/user/garantias";

  // Lógica de detección por segmentos de URL
  if (segments.includes('admin')) {
    destino = "/admin/garantias";
  } else if (segments.includes('agent')) {
    // Si la URL es /agencia/agent/... el primer segmento es la agencia
    const idx = segments.indexOf('agent');
    const agencia = segments[idx - 1] || 'default';
    destino = `/${agencia}/agent/garantias`;
  }

  return <Navigate to={destino} replace />;
};

export const App = () => {
  const vectorColores = colores();

  let theme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif'
      },
    palette: vectorColores['paletaTemaMui'],
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontSize: 16
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize : 16
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize : 16
          },
        },
      },
      MuiStepIcon : {
        styleOverrides: {
          text: {
            fontSize : 12 
          },
        },
      },
      MuiSvgIcon : {
        styleOverrides: {
          root: {
            width: 20,
            height: 20,
          }
        },
      },
      MuiStepLabel : {
        styleOverrides: {
          label: {
            fontSize: 10
          }
        },
      },
    }
  });

  theme = responsiveFontSizes(theme);

  return (
    <div className="App">
      <Suspense fallback={<GifEspere />}>
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
            <AppProvider>
              <Router>
                <Routes>
                  {allRoutes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        route.protected ? (
                          <ReloadGuard>{route.component}</ReloadGuard>
                        ) : (
                          route.component
                        )
                      }
                    />
                  ))}
                  
                  {/* Comodín al final */}
                  <Route path="*" element={<RoleRedirect />} />
                </Routes>
              </Router>
            </AppProvider>
          </Container>
        </ThemeProvider>
      </Suspense>
    </div>
  );
};