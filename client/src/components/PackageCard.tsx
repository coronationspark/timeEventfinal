import { Package } from "@/hooks/use-packages";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateInquiry } from "@/hooks/use-packages";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface PackageCardProps {
  pkg: Package;
  index: number;
}

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().optional(),
});

export function PackageCard({ pkg, index }: PackageCardProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const createInquiry = useCreateInquiry();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createInquiry.mutate(
      { ...values, packageId: pkg.id },
      {
        onSuccess: () => {
          toast({
            title: "Inquiry Sent!",
            description: "We will contact you shortly regarding this package.",
          });
          setOpen(false);
          form.reset();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong. Please try again or contact us directly.",
          });
        },
      }
    );
  };

  // Function to get image URL (placeholder fallback)
  const getImageUrl = (url: string) => {
    if (url.startsWith("http")) return url;
    return `https://images.unsplash.com/${url}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={getImageUrl(pkg.image)}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center text-xs font-medium bg-primary/90 px-2 py-1 rounded mb-2 w-fit backdrop-blur-sm">
            <MapPin className="w-3 h-3 mr-1" />
            {pkg.location}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-secondary mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {pkg.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-6 line-clamp-2 flex-grow">
          {pkg.description}
        </p>

        <div className="space-y-4 mt-auto">
          <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-dashed pt-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              {pkg.duration}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              Flexible Dates
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Starting From</p>
              <p className="text-2xl font-bold text-secondary">
                ₹{pkg.price.toLocaleString()}
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6">
                  Book Now
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Book {pkg.title}</DialogTitle>
                  <DialogDescription>
                    Fill out the form below or contact our admin directly.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="bg-muted/50 p-4 rounded-lg mb-4 border border-border">
                  <h4 className="font-semibold text-secondary text-sm mb-2">Admin Contact Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Name:</span> Rakesh Das</p>
                    <p><span className="font-medium">Email:</span> admin@timeevent.com</p>
                    <p><span className="font-medium">WhatsApp:</span> +91 98765 43210</p>
                  </div>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="10-digit number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Any specific requirements?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={createInquiry.isPending}>
                      {createInquiry.isPending ? "Sending..." : "Submit Inquiry"}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
