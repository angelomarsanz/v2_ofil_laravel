import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from 'axios'; // 1. Importamos axios

// 2. CONFIGURACIÓN GLOBAL DE AXIOS
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Leer el token del meta tag que pusimos en el layout_bridge
const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found');
}

import { App } from "./App";
import './i18n.js';

// Buscamos el contenedor por su ID único definido en index.blade.php
const container = document.getElementById("indexGarantias");

if (container) {
    const root = createRoot(container);
    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}