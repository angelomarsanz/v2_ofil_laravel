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
                  {/* Rutas base para el listado */}
                  <Route path="/user/garantias" element={<Indice />} />
                  <Route path="/admin/garantias" element={<Indice />} />
                  <Route path="/:agencia/agent/garantias" element={<Indice />} />

                  {/* Rutas para el proceso de nueva garantía (DEBEN TENER SU PROPIO COMPONENTE) */}
                  <Route path="/user/seleccionar-aseguradora/:idGarantia" element={<SeleccionarAseguradora />} />
                  <Route path="/admin/seleccionar-aseguradora/:idGarantia" element={<SeleccionarAseguradora />} />
                  <Route path="/:agencia/agent/seleccionar-aseguradora/:idGarantia" element={<SeleccionarAseguradora />} />

                  <Route path="/user/datos-propiedad/:idGarantia" element={<DatosPropiedad />} />
                  <Route path="/admin/datos-propiedad/:idGarantia" element={<DatosPropiedad />} />
                  <Route path="/:agencia/agent/datos-propiedad/:idGarantia" element={<DatosPropiedad />} />

                  <Route path="/user/datos-arrendatario/:idPersona" element={<DatosArrendatario />} />
                  <Route path="/admin/datos-arrendatario/:idPersona" element={<DatosArrendatario />} />
                  <Route path="/:agencia/agent/datos-arrendatario/:idPersona" element={<DatosArrendatario />} />

                  <Route path="/user/personas-adicionales/:idPersona" element={<PersonasAdicionales />} />
                  <Route path="/admin/personas-adicionales/:idPersona" element={<PersonasAdicionales />} />
                  <Route path="/:agencia/agent/personas-adicionales/:idPersona" element={<PersonasAdicionales />} />

                  <Route path="/user/detalle-garantia/:idGarantia" element={<DetalleGarantia />} />
                  <Route path="/admin/detalle-garantia/:idGarantia" element={<DetalleGarantia />} />
                  <Route path="/:agencia/agent/detalle-garantia/:idGarantia" element={<DetalleGarantia />} />

                  <Route path="/user/garantia-enviada/:idGarantia" element={<GarantiaEnviada />} />
                  <Route path="/admin/garantia-enviada/:idGarantia" element={<GarantiaEnviada />} />
                  <Route path="/:agencia/agent/garantia-enviada/:idGarantia" element={<GarantiaEnviada />} />

                  <Route path="/user/revision-garantia/:idGarantia" element={<RevisionGarantia />} />
                  <Route path="/admin/revision-garantia/:idGarantia" element={<RevisionGarantia />} />
                  <Route path="/:agencia/agent/revision-garantia/:idGarantia" element={<RevisionGarantia />} />

                  <Route path="/user/contrato-garantia/:idGarantia" element={<ContratoGarantia />} />
                  <Route path="/admin/contrato-garantia/:idGarantia" element={<ContratoGarantia />} />
                  <Route path="/:agencia/agent/contrato-garantia/:idGarantia" element={<ContratoGarantia />} />

                  <Route path="/user/inventario-garantia/:idGarantia" element={<InventarioGarantia />} />
                  <Route path="/admin/inventario-garantia/:idGarantia" element={<InventarioGarantia />} />
                  <Route path="/:agencia/agent/inventario-garantia/:idGarantia" element={<InventarioGarantia />} />

                  <Route path="/user/firma-contrato/:idGarantia" element={<FirmaContrato />} />
                  <Route path="/admin/firma-contrato/:idGarantia" element={<FirmaContrato />} />
                  <Route path="/:agencia/agent/firma-contrato/:idGarantia" element={<FirmaContrato />} />

                  <Route path="/user/pago-garantia/:idGarantia" element={<PagoGarantia />} />
                  <Route path="/admin/pago-garantia/:idGarantia" element={<PagoGarantia />} />
                  <Route path="/:agencia/agent/pago-garantia/:idGarantia" element={<PagoGarantia />} />

                  {/* El comodín debe ir AL FINAL */}
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