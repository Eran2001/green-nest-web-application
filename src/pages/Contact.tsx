import { AppShell } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLeadStore } from "@/stores/useLeadStore";
import { toast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Phone is required"),
  message: z.string().min(5, "Message is required"),
});

type FormValues = z.infer<typeof schema>;

const Contact = () => {
  const addContactMessage = useLeadStore((s) => s.addContactMessage);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = (data: FormValues) => {
    addContactMessage(data);
    toast({ title: "Message sent!", description: "We'll get back to you soon." });
    form.reset();
  };

  return (
    <AppShell>
      {/* Hero */}
      <section className="relative h-48 md:h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1604762512526-b7ce049b5764?w=1200&h=400&fit=crop"
          alt="Contact"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
        </div>
      </section>

      <div className="container py-12 grid md:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Your name" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="you@email.com" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="+94 7X XXX XXXX" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea placeholder="How can we help?" rows={4} {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <Button type="submit" size="lg">Send Message</Button>
            </form>
          </Form>
        </div>

        {/* Info */}
        <div className="space-y-6">
          {/* Map placeholder */}
          <div className="h-48 rounded-2xl bg-muted flex items-center justify-center">
            <MapPin className="h-8 w-8 text-muted-foreground" />
          </div>

          <div className="space-y-4">
            {[
              { icon: MapPin, title: "Address", text: "123 Botanical Lane, Colombo 07, Sri Lanka" },
              { icon: Phone, title: "Phone", text: "+94 77 123 4567" },
              { icon: Mail, title: "Email", text: "hello@greennest.lk" },
            ].map((item) => (
              <Card key={item.title} className="border-0 shadow-sm">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Contact;
