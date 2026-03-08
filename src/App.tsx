import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Directory from "./pages/Directory";
import SerikaliDirectory from "./pages/SerikaliDirectory";
import Report from "./pages/Report";
import Tracker from "./pages/Tracker";
import Ramani from "./pages/Ramani";
import Sauti from "./pages/Sauti";
import Mimi from "./pages/Mimi";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/saka-viongozi" element={<SerikaliDirectory />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/report" element={<Report />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/ramani" element={<Ramani />} />
            <Route path="/sauti" element={<Sauti />} />
            <Route path="/mimi" element={<Mimi />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
