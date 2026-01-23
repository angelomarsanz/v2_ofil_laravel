import React, { StrictMode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
                  <Route index element={<Indice />} />
                  <Route path="/garantias/:origen" element={<Indice />} />

                  <Route path="/:segmento/garantias">
                    {/* Renderiza el Indice si la URL es exactamente el prefijo */}
                    <Route index element={<Indice />} />
                    
                    {/* Rutas internas que ahora heredan el prefijo automáticamente */}
                    <Route path="seleccionar-aseguradora/:idGarantia" element={<SeleccionarAseguradora />} />
                    <Route path="datos-propiedad/:idGarantia" element={<DatosPropiedad />} />
                    <Route path="datos-arrendatario/:idPersona" element={<DatosArrendatario />} />
                    <Route path="personas-adicionales/:idPersona" element={<PersonasAdicionales />} />
                    <Route path="detalle-garantia/:idGarantia" element={<DetalleGarantia />} />
                    <Route path="garantia-enviada/:idGarantia" element={<GarantiaEnviada />} />
                    <Route path="revision-garantia/:idGarantia" element={<RevisionGarantia />} />
                    <Route path="contrato-garantia/:idGarantia" element={<ContratoGarantia />} />
                    <Route path="inventario-garantia/:idGarantia" element={<InventarioGarantia />} />
                    <Route path="firma-contrato/:idGarantia" element={<FirmaContrato />} />
                    <Route path="pago-garantia/:idGarantia" element={<PagoGarantia />} />
                  </Route>

                  <Route path="/:segmento/agent">
                    {/* Renderiza el Indice si la URL es exactamente el prefijo */}
                    <Route index element={<Indice />} />
                    
                    {/* Rutas internas que ahora heredan el prefijo automáticamente */}
                    <Route path="seleccionar-aseguradora/:idGarantia" element={<SeleccionarAseguradora />} />
                    <Route path="datos-propiedad/:idGarantia" element={<DatosPropiedad />} />
                    <Route path="datos-arrendatario/:idPersona" element={<DatosArrendatario />} />
                    <Route path="personas-adicionales/:idPersona" element={<PersonasAdicionales />} />
                    <Route path="detalle-garantia/:idGarantia" element={<DetalleGarantia />} />
                    <Route path="garantia-enviada/:idGarantia" element={<GarantiaEnviada />} />
                    <Route path="revision-garantia/:idGarantia" element={<RevisionGarantia />} />
                    <Route path="contrato-garantia/:idGarantia" element={<ContratoGarantia />} />
                    <Route path="inventario-garantia/:idGarantia" element={<InventarioGarantia />} />
                    <Route path="firma-contrato/:idGarantia" element={<FirmaContrato />} />
                    <Route path="pago-garantia/:idGarantia" element={<PagoGarantia />} />
                  </Route>


                  <Route path="/:segmento/:subsegmento">
                    {/* Renderiza el Indice si la URL es exactamente el prefijo */}
                    <Route index element={<Indice />} />
                    
                    {/* Rutas internas que ahora heredan el prefijo automáticamente */}
                    <Route path="seleccionar-aseguradora/:idGarantia" element={<SeleccionarAseguradora />} />
                    <Route path="datos-propiedad/:idGarantia" element={<DatosPropiedad />} />
                    <Route path="datos-arrendatario/:idPersona" element={<DatosArrendatario />} />
                    <Route path="personas-adicionales/:idPersona" element={<PersonasAdicionales />} />
                    <Route path="detalle-garantia/:idGarantia" element={<DetalleGarantia />} />
                    <Route path="garantia-enviada/:idGarantia" element={<GarantiaEnviada />} />
                    <Route path="revision-garantia/:idGarantia" element={<RevisionGarantia />} />
                    <Route path="contrato-garantia/:idGarantia" element={<ContratoGarantia />} />
                    <Route path="inventario-garantia/:idGarantia" element={<InventarioGarantia />} />
                    <Route path="firma-contrato/:idGarantia" element={<FirmaContrato />} />
                    <Route path="pago-garantia/:idGarantia" element={<PagoGarantia />} />
                  </Route>

                  {/* 4. COMODÍN: Cualquier otra ruta no definida vuelve al Indice */}
                  <Route path="*" element={<Indice />} />
                </Routes>
              </Router>
            </AppProvider>
          </Container>
        </ThemeProvider>
      </Suspense>
    </div>
  );
};