import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ByTopicPage from "./pages/ByTopicPage";
import PublicationDetailPage from "./pages/PublicationDetailPage";
import ResearchThemePage from "./pages/ResearchThemePage";
import ResearchAgendaPage from "./pages/ResearchAgendaPage";
import PolicyPage from "./pages/PolicyPage";
import NewsPage from "./pages/NewsPage";
import SitemapPage from "./pages/SitemapPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/by-topic" element={<ByTopicPage />} />
          <Route path="/publications/:slug" element={<PublicationDetailPage />} />
          <Route path="/research-agenda" element={<ResearchAgendaPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/research/:topicSlug" element={<ResearchThemePage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
