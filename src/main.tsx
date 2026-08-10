import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { registerServiceWorker } from "@/lib/registerSW";
import { loadAnalytics } from "@/lib/analytics";
import { initAccessibilitySync } from "@/lib/accessibility";

initAccessibilitySync();



createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </LanguageProvider>
);

registerServiceWorker();
loadAnalytics();

