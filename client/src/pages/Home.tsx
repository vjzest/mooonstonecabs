import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import WhatWeOffer from '@/components/WhatWeOffer';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <WhatWeOffer />
      <BookingForm />
      <Footer />
    </div>
  );
}
