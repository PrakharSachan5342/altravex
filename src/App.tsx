
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Trading from "./pages/Trading";
import Portfolio from "./pages/Portfolio";
import MarketInsights from "./pages/MarketInsights";
import Events from "./pages/Events";
import MarketNews from "./pages/MarketNews";
import Contributors from "./pages/Contributors";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/trading" element={<Trading />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/market-insights" element={<MarketInsights />} />
            <Route path="/events" element={<Events />} />
            <Route path="/market-news" element={<MarketNews />} />
            <Route path="/contributors" element={<Contributors />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
