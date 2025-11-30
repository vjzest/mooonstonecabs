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
import AdminLogin from "@/pages/Admin/AdminLogin";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import SimpleInfo from "@/pages/SimpleInfo";
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
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      
      {/* Simple Info Pages */}
      <Route path="/help">
        <SimpleInfo 
          title="Help Center" 
          content="Welcome to Moonstone Cabs Help Center. If you need assistance with booking a taxi, managing your ride, or have any questions about our services, you're in the right place.

For immediate assistance, please call us at +91-9990800718 or email contact@moonstonecabs.com.

Common Questions:
- How do I book a taxi? Use our online booking form on the homepage or call our hotline.
- What payment methods do you accept? We accept cash, card, and digital payments.
- How can I track my ride? All our vehicles are GPS-enabled for real-time tracking.
- What if I need to cancel? Contact us immediately for cancellation assistance."
        />
      </Route>
      <Route path="/support">
        <SimpleInfo 
          title="Customer Support" 
          content="Our dedicated customer support team is here to help you 24/7.

Contact Methods:
📞 Phone: +91-9536575768 | +91-9990800718
📧 Email: contact@moonstonecabs.com | booking@moonstonecabs.com
🕐 Working Hours: Mon-Fri 9:00am - 8:00pm, Sat 10:00am - 7:30pm

We strive to respond to all inquiries within 24 hours. For urgent matters, please call our hotline directly."
        />
      </Route>
      <Route path="/faq">
        <SimpleInfo 
          title="Frequently Asked Questions" 
          content="Q: How do I book a taxi?
A: You can book through our website's booking form, call our hotline, or contact us via email.

Q: What areas do you cover?
A: We provide services across Delhi & NCR including Gurgaon, Noida, Faridabad, and Greater Noida.

Q: Are your drivers verified?
A: Yes, all our drivers are professionally trained and background-verified.

Q: Do you offer corporate packages?
A: Yes, we offer customized corporate transportation solutions including ETS and monthly rentals.

Q: What types of vehicles are available?
A: We have economy sedans, premium SUVs, and luxury cars to suit different needs and budgets."
        />
      </Route>
      <Route path="/privacy">
        <SimpleInfo 
          title="Privacy Policy" 
          content="Moonstone Cabs Private Limited is committed to protecting your privacy.

Information We Collect:
- Personal information (name, phone, email) for booking purposes
- Location data for pickup and drop services
- Payment information for transaction processing

How We Use Your Information:
- To provide and improve our services
- To process bookings and payments
- To communicate about your rides
- To comply with legal requirements

Data Security:
We implement industry-standard security measures to protect your personal information.

For questions about our privacy practices, contact: contact@moonstonecabs.com"
        />
      </Route>
      <Route path="/terms">
        <SimpleInfo 
          title="Terms of Use" 
          content="By using Moonstone Cabs services, you agree to these terms:

Service Agreement:
- Bookings are subject to vehicle availability
- Rates may vary based on distance, time, and vehicle type
- Cancellation policies apply

User Responsibilities:
- Provide accurate booking information
- Respect drivers and vehicles
- Make timely payments

Liability:
- We are not liable for delays due to traffic or weather
- Lost items should be reported within 24 hours

These terms are governed by Indian law. For disputes, jurisdiction lies with Delhi courts."
        />
      </Route>
      <Route path="/cancellation">
        <SimpleInfo 
          title="Cancellation Policy" 
          content="Cancellation Policy for Moonstone Cabs:

Free Cancellation:
- Cancel within 1 hour of booking without charges

Cancellation Charges:
- 1-6 hours before ride: 25% of booking amount
- Less than 1 hour: 50% of booking amount
- No-show: Full booking amount

How to Cancel:
Call our customer service at +91-9990800718 or email booking@moonstonecabs.com with your booking reference.

Refunds will be processed within 5-7 business days."
        />
      </Route>
      <Route path="/refund">
        <SimpleInfo 
          title="Refund Policy" 
          content="Refund Policy:

Eligible for Refund:
- Service cancellation by company
- Double payment or overcharging
- Service not provided as booked

Refund Process:
1. Submit refund request via email with booking details
2. Our team will review within 2 business days
3. Approved refunds processed within 5-7 business days

Refund Method:
Refunds are issued to the original payment method.

For refund inquiries: contact@moonstonecabs.com"
        />
      </Route>
      <Route path="/disclaimer">
        <SimpleInfo 
          title="Disclaimer" 
          content="Disclaimer:

Service Availability:
Moonstone Cabs strives to provide reliable service but cannot guarantee availability during peak hours or adverse conditions.

Third-Party Links:
Our website may contain links to third-party sites. We are not responsible for their content or practices.

Information Accuracy:
We make every effort to keep information accurate but do not guarantee completeness or currency.

Limitation of Liability:
Moonstone Cabs is not liable for indirect or consequential damages arising from service use.

For questions: contact@moonstonecabs.com"
        />
      </Route>
      
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
