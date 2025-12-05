import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';


export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen">
      <Header />

      {/* 🌍 Embedded Google Map (just below Header) */}
      <section className="w-full h-[400px] md:h-[500px] relative overflow-hidden">
        <iframe
          title="Moonstone Cabs Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.208573376385!2d77.02602797476572!3d28.655189783165303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0a1a31f6a04f%3A0x9a254f0e6afcf62a!2sChhawla%2C%20Najafgarh%2C%20New%20Delhi%2C%20Delhi%20110043!5e0!3m2!1sen!2sin!4v1699342140123!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* <Breadcrumb items={[{ label: 'Contact Us' }]} /> */}


{/* 📨 Contact Info + Form Section (below Map) */}

<section
  className="py-20 bg-cover bg-center bg-no-repeat relative"
  style={{
    backgroundImage: "url('/assets/cta-map.png')",
  }}
>

  {/* Optional dark overlay for better text visibility */}
  <div className="absolute inset-0 "></div>

  <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
    
    {/* LEFT SIDE — Info */}
<div className="text-black">
  <h2 className="text-3xl font-bold mb-4">Have Any Questions?</h2>
  <p className="mb-8 text-gray-600">
    Get in touch to discuss your travel needs. Call us, drop an email, or fill out the contact form.
  </p>

  <div className="space-y-6">

    {/* LOCATION */}
    <div className="flex items-start space-x-4">
      <div className="bg-[#1d64fe]/20 p-3 rounded-md">
        <MapPin className="w-6 h-6 text-[#0349df]" />
      </div>
      <p>KH. NO. 45/18, Chhawla, Najafgarh, South West Delhi, New Delhi – 110043</p>
    </div>

    {/* EMAIL */}
    <div className="flex items-start space-x-4">
      <div className="bg-[#1d64fe]/20 p-3 rounded-md">
        <Mail className="w-6 h-6 text-[#0349df]" />
      </div>
      <div>
        <p>contact@moonstonecabs.com</p>
        <p>booking@moonstonecabs.com</p>
        <p>sales@moonstonecabs.com</p>
      </div>
    </div>

    {/* PHONE */}
    <div className="flex items-start space-x-4">
      <div className="bg-[#1d64fe]/20 p-3 rounded-md">
        <Phone className="w-6 h-6 text-[#0349df]" />
      </div>
      <div>
        <p>(+91) 9536575768</p>
        <p>(+91) 9990800718</p>
      </div>
    </div>

  </div>
</div>


    {/* RIGHT SIDE — Contact Form placeholder. ContactForm component is rendered below */}
    <div className="rounded-lg bg-white/40 p-6 backdrop-blur-sm shadow-inner">
      <ContactForm />
    </div>

  </div>
</section>





    <section ref={ref} className="py-20 bg-gradient-to-r from-[#1d64fe] to-[#5eb8f4]">
  <div className="max-w-6xl mx-auto px-6 text-center text-black">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="rounded-2xl shadow-2xl p-10 md:p-14 bg-white/10 backdrop-blur-sm"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-wide">
        Ready to Book Your Ride?
      </h2>

      <p className="text-lg md:text-xl mb-8 text-white/90">
        Enjoy a smooth, reliable, and premium taxi experience with{" "}
        <span className="font-semibold text-yellow-300">Moonstone Cabs</span>.
      </p>

      <a href="/booking">
        <button
          className="bg-white text-blue-600 hover:bg-[#deecff] px-10 py-4 rounded-lg font-semibold text-lg shadow-md transition-all duration-300  "
          data-testid="button-contact-book"
        >
          Book Your Taxi Now
        </button>
      </a>
    </motion.div>
  </div>
</section>


      <Footer />
    </div>
  );
}

  function ContactForm() {
    const { toast } = useToast();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState<'initial'|'codeSent'>('initial');
    const [code, setCode] = useState('');
    const [resendCountdown, setResendCountdown] = useState<number | null>(null);

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      const name = `${firstName.trim()} ${lastName.trim()}`.trim();
      if (!name || !email || !message) {
        toast({ title: "Please complete required fields", description: "Name, email and message are required.", })
        return;
      }

      const payload = { name, email, phone, message };
      setLoading(true);
      try {
        const res = await fetch('/api/contact/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const body = await res.json();
        if (res.ok) {
          toast({ title: 'Code sent', description: body.message || 'Verification code sent to your email.' });
          setStage('codeSent');
          setResendCountdown(60);
        } else {
          toast({ title: 'Failed to send code', description: body.error || 'Please try again.' });
        }
      } catch (err) {
        console.error('Contact verify failed', err);
        toast({ title: 'Network error', description: 'Failed to send verification code. Please try again later.' });
      } finally {
        setLoading(false);
      }
    }

    async function handleConfirm(e: React.FormEvent) {
      e.preventDefault();
      if (!code.trim()) {
        toast({ title: 'Enter verification code', description: 'Please type the code we sent to your email.' });
        return;
      }

      setLoading(true);
      try {
        const payload = { name: `${firstName.trim()} ${lastName.trim()}`.trim(), email, phone, message, code };
        const res = await fetch('/api/contact/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const body = await res.json();
        if (res.ok) {
          toast({ title: 'Message delivered', description: body.message || 'We will contact you shortly.' });
          setFirstName(''); setLastName(''); setEmail(''); setPhone(''); setMessage(''); setCode(''); setStage('initial');
        } else {
          toast({ title: 'Failed to deliver', description: body.error || 'Please check your code and try again.' });
        }
      } catch (err) {
        console.error('Contact confirm failed', err);
        toast({ title: 'Network error', description: 'Failed to confirm message. Please try again later.' });
      } finally {
        setLoading(false);
      }
    }

    // Resend code helper
    async function handleResend() {
      setLoading(true);
      try {
        const payload = { name: `${firstName.trim()} ${lastName.trim()}`.trim(), email, phone, message };
        const res = await fetch('/api/contact/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const body = await res.json();
        if (res.ok) {
          toast({ title: 'Code resent', description: body.message || 'Verification code resent to your email.' });
          setResendCountdown(60);
        } else {
          toast({ title: 'Failed to resend', description: body.error || 'Please try again.' });
        }
      } catch (err) {
        console.error('Resend failed', err);
        toast({ title: 'Network error', description: 'Failed to resend code. Try again later.' });
      } finally { setLoading(false); }
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-3xl font-bold mb-4">Contact With Us!</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" className="border border-gray-400 rounded-md px-4 py-3 focus:outline-none focus:border-[#FE5A1D]" />
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" className="border border-gray-400 rounded-md px-4 py-3 focus:outline-none focus:border-[#FE5A1D]" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="border border-gray-400 rounded-md px-4 py-3 focus:outline-none focus:border-[#FE5A1D]" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Phone Number" className="border border-gray-400 rounded-md px-4 py-3 focus:outline-none focus:border-[#FE5A1D]" />
        </div>

        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Message" className="border border-gray-400 rounded-md px-4 py-3 w-full focus:outline-none focus:border-[#FE5A1D]"></textarea>

        {stage === 'initial' ? (
          <button disabled={loading} onClick={handleSubmit} type="button" className="bg-primary disabled:opacity-60 text-white px-6 py-3 rounded-md font-semibold hover:bg-[#e64e17] transition-all">
            {loading ? 'Sending…' : 'Send Code'}
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Verification code" className="border border-gray-400 rounded-md px-4 py-3 focus:outline-none focus:border-[#FE5A1D] flex-1" />
              <button disabled={loading} onClick={handleConfirm} type="button" className="bg-primary disabled:opacity-60 text-white px-4 py-2 rounded-md font-semibold hover:bg-[#e64e17] transition-all">{loading ? 'Verifying…' : 'Verify & Send'}</button>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                Didn't receive code?
              </div>
              <div>
                <button disabled={!!resendCountdown || loading} onClick={handleResend} className="text-sm text-sky-600 hover:underline">Resend code</button>
              </div>
            </div>
          </div>
        )}
      </form>
    );
  }
