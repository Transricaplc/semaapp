import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import SerikaliDirectory from "./pages/SerikaliDirectory";
import Report from "./pages/Report";
import Tracker from "./pages/Tracker";
import Ramani from "./pages/Ramani";
import Sauti from "./pages/Sauti";
import Mimi from "./pages/Mimi";
import OfficialProfile from "./pages/OfficialProfile";
import AdminSeed from "./pages/AdminSeed";
import RequireAdmin from "@/components/RequireAdmin";
import NotFound from "./pages/NotFound";
import LocationsApiBootstrap from "@/components/LocationsApiBootstrap";
import Tafuta from "./pages/Tafuta";
import Orodha from "./pages/Orodha";
import Ripoti from "./pages/Ripoti";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LocationsApiBootstrap />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tafuta" element={<Tafuta />} />
            <Route path="/orodha" element={<Orodha />} />
            <Route path="/saka-viongozi" element={<SerikaliDirectory />} />
            <Route path="/directory" element={<Navigate to="/saka-viongozi" replace />} />
            <Route path="/report" element={<Report />} />
            <Route path="/ripoti" element={<Report />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/ramani" element={<Ramani />} />
            <Route path="/sauti" element={<Sauti />} />
            <Route path="/mimi" element={<Mimi />} />
            <Route path="/kiongozi/:id" element={<OfficialProfile />} />
            <Route path="/admin/seed" element={<RequireAdmin><AdminSeed /></RequireAdmin>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
