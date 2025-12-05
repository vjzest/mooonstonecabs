import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { insertBookingSchema } from "@/shared/schemas-client";

// ⭐ Extend schema for date & time
const formSchema = insertBookingSchema
  .omit({ startDate: true, startTime: true })
  .extend({
    startDate: z.date({ required_error: "Date is required" }),
    startTime: z.string().min(1, "Time is required"),
  });

type FormValues = z.infer<typeof formSchema>;

export default function Booking() {
  // ⭐ HERO SECTION FIX (Separate observer)
  const topRef = useRef(null);
  const topInView = useInView(topRef, { once: true, amount: 0.3 });

  // ⭐ FORM SECTION observer
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verifyStage, setVerifyStage] = useState<"idle" | "code-sent">("idle");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      passengers: 1,
      pickupLocation: "",
      dropLocation: "",
      startTime: "",
    },
  });

  // ⭐ Submit Handler
  const onSubmit = async (data: FormValues) => {
    if (!emailVerified) {
      toast({
        title: "Please verify email",
        description: "Verify the booking email before submitting.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedData = {
        ...data,
        startDate: data.startDate.toISOString().split("T")[0],
      };

      const response = await apiRequest("POST", "/api/bookings", formattedData);
      const result = await response.json();

      if (result.success) {
        toast({
          title: "✅ Booking Confirmed!",
          description: `Thank you ${data.name}! We've sent a confirmation email to ${data.email}.`,
          duration: 6000,
        });
        form.reset();
      } else {
        throw new Error(result.error || "Booking failed");
      }
    } catch (error: any) {
      toast({
        title: "❌ Booking Failed",
        description: error.message,
        variant: "destructive",
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* ⭐ HERO SECTION (with topRef fix) */}
      <section
        ref={topRef}
        className="relative h-[320px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/assets/fleet-banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3"
          >
            Book Your Ride
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Quick • Simple • Reliable • 24/7 Booking Available
          </motion.p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Booking" }]} />

      {/* ⭐ MAIN BOOKING FORM */}
      <section ref={ref} className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 sm:p-10"
          >
            <h2 className="text-3xl font-bold text-center mb-8">
              Fill in Your Details
            </h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* NAME */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
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
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 9876543210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* EMAIL + VERIFY BUTTON */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input
                              type="email"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                setEmailVerified(false);
                                setVerifyStage("idle");
                              }}
                            />
                            <Button
                              type="button"
                              disabled={!field.value || verifyLoading}
                              onClick={async () => {
                                setVerifyLoading(true);
                                try {
                                  const values = form.getValues();
                                  const payload = {
                                    ...values,
                                    startDate: values.startDate
                                      ? values.startDate.toISOString().split("T")[0]
                                      : "",
                                  };

                                  const res = await apiRequest(
                                    "POST",
                                    "/api/bookings/verify",
                                    payload
                                  );

                                  const body = await res.json().catch(() => null);

                                  toast({
                                    title: "Verification code sent",
                                    description: body?.message,
                                  });

                                  setVerifyStage("code-sent");
                                  setIsDialogOpen(true);
                                } catch (err) {
                                  toast({
                                    title: "Failed to send verification code",
                                  });
                                } finally {
                                  setVerifyLoading(false);
                                }
                              }}
                            >
                              {verifyStage === "code-sent" ? "Re-send" : "Verify"}
                            </Button>
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
                        <FormLabel>Passengers *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
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
                        <FormLabel>Pickup Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter pickup location" {...field} />
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
                        <FormLabel>Drop Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter drop location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* DATE (FIXED UI) */}
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date *</FormLabel>
                        <FormControl>
                          <DatePicker
                            selected={field.value}
                            onChange={field.onChange}
                            minDate={new Date()}
                            placeholderText="Select date"
                            customInput={
                              <Input placeholder="Select date" readOnly />
                            }
                          />
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
                        <FormLabel>Time *</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !emailVerified}
                    className="flex-1"
                  >
                    {isSubmitting ? "Booking..." : "Book Your Taxi"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => form.reset()}
                  >
                    Clear Form
                  </Button>
                </div>
              </form>
            </Form>

            {/* ⭐ EMAIL VERIFICATION MODAL */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter verification code</DialogTitle>
                </DialogHeader>

                <div className="py-4">
                  <Input
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    placeholder="6-digit code"
                  />
                </div>

                <DialogFooter>
                  <Button
                    onClick={async () => {
                      setVerifyLoading(true);
                      try {
                        const values = form.getValues();
                        const payload = {
                          email: values.email,
                          code: verifyCode,
                        };

                        const res = await fetch("/api/bookings/confirm", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(payload),
                        });

                        const body = await res.json();

                        if (res.ok) {
                          toast({
                            title: "Email Verified",
                            description: "You can now complete the booking.",
                          });
                          setEmailVerified(true);
                          setIsDialogOpen(false);
                        } else {
                          toast({
                            title: "Verification Failed",
                            description:
                              body.error || "Invalid verification code",
                          });
                        }
                      } finally {
                        setVerifyLoading(false);
                      }
                    }}
                  >
                    {verifyLoading ? "Verifying…" : "Verify & Close"}
                  </Button>

                  <DialogClose className="px-3 py-2 text-sm">Close</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* INFO CARDS */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "24/7 Support",
                desc: "Our customer support team is available round the clock.",
              },
              {
                title: "Transparent Pricing",
                desc: "No hidden charges — you pay what you see.",
              },
              {
                title: "Professional Drivers",
                desc: "Highly trained and experienced chauffeurs for your safety.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-6 shadow-md border-l-4 border-primary"
              >
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
