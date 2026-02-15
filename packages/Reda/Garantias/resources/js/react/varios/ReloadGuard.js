import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ReloadGuard = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Crear un tope en el historial para detectar el retroceso
    window.history.pushState(null, null, window.location.pathname);

    const handlePopState = () => {
      // Al detectar "atrás", bloqueamos el movimiento
      window.history.pushState(null, null, window.location.pathname);
      
      const segments = location.pathname.split('/').filter(Boolean);
      let destino = '/user/garantias';
      
      if (segments.includes('admin')) destino = '/admin/garantias';
      else if (segments.includes('agent')) {
        const idx = segments.indexOf('agent');
        destino = `/${segments[idx - 1]}/agent/garantias`;
      }
      
      window.location.href = destino;
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location.pathname]);

  return children;
};

export default ReloadGuard;