import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/Feed";
import Channels from "./pages/Channels";
import Marketplace from "./pages/Marketplace";
import MarketAnalysis from "./pages/MarketAnalysis";
import Farm from "./pages/Farm";
import Kiwi from "./pages/Kiwi";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import News from "./pages/News";
import Lessons from "./pages/Lessons";
import SellerVerification from "./pages/SellerVerification";
import Checkout from "./pages/Checkout";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/channels" element={<Channels />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/market-analysis" element={<MarketAnalysis />} />
              <Route path="/seller-verification" element={<SellerVerification />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/news" element={<News />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/farm" element={<Farm />} />
              <Route path="/kiwi" element={<Kiwi />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
