import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CursorFollower from '@/components/CursorFollower';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// Users can enter location text manually — don't import Select component
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { apiRequest } from '@/lib/queryClient';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { insertBookingSchema } from "@/shared/schemas-client";


// Locations removed so users can manually enter pickup/drop locations

const formSchema = insertBookingSchema
  .omit({ startDate: true, startTime: true })
  .extend({
    startDate: z.date({ required_error: 'Start date is required' }),
    startTime: z.string().min(1, 'Start time is required'),
  });

type FormValues = z.infer<typeof formSchema>;

export default function Booking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verifyStage, setVerifyStage] = useState<'idle' | 'code-sent'>('idle');
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      passengers: 1,
      pickupLocation: '',
      dropLocation: '',
      startTime: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!emailVerified) {
      toast({ title: 'Please verify email', description: 'Verify the booking email before submitting.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedData = {
        ...data,
        startDate: data.startDate.toISOString().split('T')[0],
      };

      const response = await apiRequest('POST', '/api/bookings', formattedData);
      const result = await response.json();

      if (result.success) {
        toast({
          title: '✅ Booking Confirmed!',
          description: `Thank you ${data.name}! We've sent a confirmation email to ${data.email}.`,
          duration: 6000,
        });

        form.reset();
      } else {
        throw new Error(result.error || 'Booking failed');
      }
    } catch (error: any) {
      toast({
        title: '❌ Booking Failed',
        description: error.message,
        variant: 'destructive',
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <CursorFollower />
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-auto min-h-[280px] sm:min-h-[320px] md:min-h-[360px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/assets/fleet-banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center px-4 py-12 sm:py-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3"
          >
            Book Your Ride
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Quick • Simple • Reliable • 24/7 Booking Available
          </motion.p>
        </div>
      </section>

      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Booking' }]} />

      {/* Main Booking Section */}
      <section ref={ref} className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 relative z-20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-foreground mb-6 sm:mb-8 text-center">
              Fill in Your Details
            </h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                {/* 2 Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* NAME */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-foreground font-semibold">
                          Your Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter full name"
                            className="bg-gray-50 border border-gray-300 text-foreground h-10 sm:h-11 text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* PHONE */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-foreground font-semibold">
                          Phone Number *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+91 9876543210"
                            className="bg-gray-50 border border-gray-300 text-foreground h-10 sm:h-11 text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* EMAIL */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-foreground font-semibold">
                          Email *
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              className="bg-gray-50 border border-gray-300 text-foreground h-10 sm:h-11 text-sm"
                              {...field}
                              onChange={(e) => { field.onChange(e); setEmailVerified(false); setVerifyStage('idle'); }}
                            />
                            <button
                              type="button"
                              disabled={verifyLoading || !field.value}
                              onClick={async () => {
                                // send verify request
                                setVerifyLoading(true);
                                try {
                                  // gather current form values
                                  const values = form.getValues();
                                  const payload = {
                                    name: values.name,
                                    phone: values.phone,
                                    email: values.email,
                                    passengers: values.passengers,
                                    pickupLocation: values.pickupLocation,
                                    dropLocation: values.dropLocation,
                                    startDate: values.startDate ? values.startDate.toISOString().split('T')[0] : '',
                                    startTime: values.startTime,
                                  };

                                  try {
                                    const res = await apiRequest('POST', '/api/bookings/verify', payload);
                                    // apiRequest throws on non-ok; if we reach here it's ok
                                    const body = await res.json().catch(() => null);
                                    toast({ title: 'Code sent', description: body?.message || 'Verification code sent' });
                                    setVerifyStage('code-sent');
                                    setIsDialogOpen(true);
                                  } catch (err: any) {
                                    console.error('verify send error', err);
                                    toast({ title: 'Failed to send code', description: err.message || 'Please try again' });
                                  }
                                } catch (err) {
                                  console.error('verify send error', err);
                                  toast({ title: 'Network error', description: 'Failed to send verification code' });
                                } finally {
                                  setVerifyLoading(false);
                                }
                              }}
                              className="inline-flex items-center justify-center rounded-md bg-sky-600 hover:bg-sky-700 text-white px-3 sm:px-4 text-xs sm:text-sm font-semibold disabled:opacity-60 h-10 sm:h-11 min-w-[80px] sm:min-w-[96px]"
                            >
                              {verifyStage === 'code-sent' ? 'Re-send' : 'Verify'}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* PASSENGERS */}
                  <FormField
                    control={form.control}
                    name="passengers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-foreground font-semibold">
                          Number of Passengers *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            className="bg-gray-50 border border-gray-300 text-foreground h-10 sm:h-11 text-sm"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* PICKUP */}
                  <FormField
                    control={form.control}
                    name="pickupLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-foreground font-semibold">
                          Pickup Location *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter pickup location"
                            className="bg-gray-50 border border-gray-300 text-foreground h-10 sm:h-11 text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* DROP */}
                  <FormField
                    control={form.control}
                    name="dropLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-foreground font-semibold">
                          Drop Location *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter drop location"
                            className="bg-gray-50 border border-gray-300 text-foreground h-10 sm:h-11 text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                 {/* DATE */}
<FormField
  control={form.control}
  name="startDate"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-sm sm:text-base text-foreground font-semibold">
        Date *
      </FormLabel>

      {/* FIXED: Make DatePicker fully below the label */}
      <FormControl>
        <div className="w-full ">
                          <DatePicker
                            selected={field.value}
                            onChange={field.onChange}
                            minDate={new Date()}
                            wrapperClassName="w-full"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-foreground h-10 sm:h-11 text-sm"
                            placeholderText="Select date"
                            // Use a native input as customInput so the rendered input exactly matches other inputs
                            customInput={<input className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-foreground h-10 sm:h-11 text-sm" />}
                          />
        </div>
      </FormControl>

      <FormMessage />
    </FormItem>
  )}
/>
              {/* TIME */}
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base text-foreground font-semibold">
                          Time *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            className="bg-gray-50 border border-gray-300 text-foreground h-10 sm:h-11 text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !emailVerified}
                    className="flex-1 py-2 sm:py-3 text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 text-white rounded-lg shadow-lg hover:scale-[1.01] transition-all"
                  >
                    {isSubmitting ? 'Booking...' : 'Book Your Taxi'}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => form.reset()}
                    variant="outline"
                    className="flex-1 py-2 sm:py-3 text-sm sm:text-base font-semibold"
                  >
                    Clear Form
                  </Button>
                </div>
              </form>
            </Form>

            {/* Verification dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter verification code</DialogTitle>
                </DialogHeader>

                <div className="py-4">
                  <input value={verifyCode} onChange={(e) => setVerifyCode(e.target.value)} placeholder="6-digit code" className="w-full px-3 py-2 border rounded-md" />
                </div>

                <DialogFooter>
                  <div className="flex items-center gap-2 w-full">
                    <button onClick={async () => {
                      setVerifyLoading(true);
                      try {
                        const values = form.getValues();
                        // For confirmation we only need email + code — server uses stored payload
                        const payload = { email: values.email, code: verifyCode };
                        const res = await fetch('/api/bookings/confirm', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                        const body = await res.json();
                        if (res.ok) {
                          toast({ title: 'Email verified', description: body.message || 'Email verified — you can submit the booking.' });
                          setEmailVerified(true);
                          setIsDialogOpen(false);
                        } else {
                          const details = body.details ? (Array.isArray(body.details) ? body.details.map(d => d.message).join(', ') : JSON.stringify(body.details)) : undefined;
                          toast({ title: 'Verification failed', description: details || body.error || 'Invalid code or expired' });
                        }
                      } catch (err) {
                        console.error('confirm error', err);
                        toast({ title: 'Network error', description: 'Failed to verify code.' });
                      } finally { setVerifyLoading(false); }
                    }} className="bg-primary text-white px-4 py-2 rounded-md">{verifyLoading ? 'Verifying…' : 'Verify & Close'}</button>

                    <DialogClose className="ml-auto px-3 py-2 text-sm">Close</DialogClose>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-primary">
              <h3 className="text-xl font-bold text-foreground mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Our customer support team is available round the clock to assist you.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-primary">
              <h3 className="text-xl font-bold text-foreground mb-2">Transparent Pricing</h3>
              <p className="text-muted-foreground">
                No hidden charges. What you see is what you pay.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-primary">
              <h3 className="text-xl font-bold text-foreground mb-2">Professional Drivers</h3>
              <p className="text-muted-foreground">
                Highly trained and experienced drivers for your safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
