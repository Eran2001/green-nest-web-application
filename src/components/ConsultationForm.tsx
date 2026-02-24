import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLeadStore } from "@/stores/useLeadStore";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Phone is required"),
  roomType: z.string().min(1, "Select a room type"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ConsultationForm() {
  const addConsultation = useLeadStore((s) => s.addConsultation);
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { name: "", email: "", phone: "", roomType: "", message: "" } });

  const onSubmit = (data: FormValues) => {
    addConsultation(data);
    toast({ title: "Consultation booked!", description: "We'll reach out within 24 hours." });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Your name" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="you@email.com" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="+94 7X XXX XXXX" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="roomType" render={({ field }) => (
            <FormItem><FormLabel>Room Type</FormLabel><FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger><SelectValue placeholder="Select room" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="living-room">Living Room</SelectItem>
                  <SelectItem value="bedroom">Bedroom</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="balcony">Balcony</SelectItem>
                </SelectContent>
              </Select>
            </FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem><FormLabel>Message (optional)</FormLabel><FormControl><Textarea placeholder="Tell us about your space..." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <Button type="submit" size="lg">Book Free Consultation</Button>
      </form>
    </Form>
  );
}
