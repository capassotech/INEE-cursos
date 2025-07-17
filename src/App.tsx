import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import Theory from "./pages/Theory";
import Search from "./pages/Search";
import TheoryDetail from "./pages/TheoryDetail";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Curso from "./pages/Curso";
import ModuleView from "./components/module-view";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="fitness-edu-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/curso" element={<Curso />} />
              {/* Nueva ruta simplificada - reemplaza a Classes y ClassDetail */}
              <Route path="/curso/:courseId" element={<ModuleView />} />
              <Route path="/teoria" element={<Theory />} />
              <Route path="/teoria/:contentId" element={<TheoryDetail />} />
              <Route path="/busqueda" element={<Search />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
