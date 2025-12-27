import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import CompanyProfile from "@/pages/CompanyProfile";
import MissionVision from "@/pages/MissionVision";
import Milestones from "@/pages/Milestones";
import ETS from "@/pages/services/ETS";
import SpotRentals from "@/pages/services/SpotRentals";
import MonthlyRentals from "@/pages/services/MonthlyRentals";
import WeddingEvents from "@/pages/services/WeddingEvents";
import Exhibitions from "@/pages/services/Exhibitions";
import Clients from "@/pages/Clients";
import Fleets from "@/pages/Fleets";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import Booking from "@/pages/Booking";
import Help from "@/pages/Help";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfUse from "@/pages/TermsOfUse";
import AdminLogin from "@/pages/Admin/AdminLogin";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      {/* Company Pages */}
      <Route path="/company/profile" component={CompanyProfile} />
      <Route path="/company/mission-vision" component={MissionVision} />
      <Route path="/company/milestones" component={Milestones} />
      
      {/* Services Pages */}
      <Route path="/services/ets" component={ETS} />
      <Route path="/services/spot-rentals" component={SpotRentals} />
      <Route path="/services/monthly-rentals" component={MonthlyRentals} />
      <Route path="/services/wedding-events" component={WeddingEvents} />
      <Route path="/services/exhibitions" component={Exhibitions} />
      
      {/* Other Pages */}
      <Route path="/clients" component={Clients} />
      <Route path="/fleets" component={Fleets} />
      <Route path="/booking" component={Booking} />
      <Route path="/careers" component={Careers} />
      <Route path="/contact" component={Contact} />
      <Route path="/help" component={Help} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfUse} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      
      {/* 404 Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

