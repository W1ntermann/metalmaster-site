import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContactPopupProvider } from "@/contexts/ContactPopupContext";
import Index from "./pages/Index";
import LaserCutting from "./pages/LaserCutting";
import PowderCoating from "./pages/PowderCoating";
import ContactForm from "./pages/ContactForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ContactPopupProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/laser-cutting" element={<LaserCutting />} />
            <Route path="/powder-coating" element={<PowderCoating />} />
            <Route path="/contact" element={<ContactForm />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ContactPopupProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
