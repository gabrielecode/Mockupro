import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import App from './App.tsx';
import './index.css';

// Safe global error interception for deeper diagnostics and guarding
window.onerror = (message, source, lineno, colno, error) => {
  const msgStr = String(message || "");
  if (
    msgStr.toLowerCase().includes("script error") || 
    msgStr.toLowerCase().includes("websocket") ||
    msgStr.toLowerCase().includes("hmr")
  ) {
    console.warn("Muted benign cross-origin / iframe sandbox error safely:", msgStr);
    return true; // Prevents the firing of the default event handler and bubbling up to parent
  }
  return false;
};

window.addEventListener('error', (event) => {
  const msg = event.message || "";
  const isCORSNoise = 
    msg.toLowerCase().includes('script error') || 
    msg.toLowerCase().includes('websocket') ||
    msg.toLowerCase().includes('hmr');
  if (isCORSNoise) {
    event.preventDefault();
    console.warn("Ignored cross-origin / iframe sandbox noise safely:", event);
  } else {
    console.error("Captured actual application error:", event.error || event.message);
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.warn("Unhandled promise rejection captured safely:", event.reason);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

