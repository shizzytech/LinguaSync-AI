import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const waitlistFormSchema = insertWaitlistEntrySchema.extend({
  email: z.string().email("Please enter a valid email address"),
});

type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;

const Waitlist: React.FC = () => {
  const { toast } = useToast();

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      email: "",
      referralSource: "",
    },
  });

  const waitlistMutation = useMutation({
    mutationFn: async (data: WaitlistFormValues) => {
      const res = await apiRequest("POST", "/api/waitlist", data);
      return res.json();
    },
    onSuccess: (data) => {
      // Check if this is an "already registered" success response
      if (data.alreadyRegistered) {
        toast({
          title: "Already on the waitlist",
          description: "You're already on our waitlist! We'll notify you when access is available.",
          variant: "default",
        });
        form.reset();
        return;
      }
      
      // Regular success response
      toast({
        title: "Successfully joined the waitlist!",
        description: "Check your email for confirmation.",
      });
      form.reset();
    },
    onError: (error: any) => {
      const errorMessage = error.message || "Please try again later";
      
      toast({
        title: "Error joining waitlist",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: WaitlistFormValues) {
    waitlistMutation.mutate(data);
  }

  return (
    <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Join Our Exclusive Waitlist</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-blue-100">
            Be among the first to experience the future of language learning.
            Sign up for early access.
          </p>
        </div>

        <div className="mt-10 max-w-xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        {...field}
                        className="px-4 py-3 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referralSource"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value === "" ? undefined : field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="px-4 py-3 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300">
                          <SelectValue placeholder="How did you hear about us?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="friend">Friend or Colleague</SelectItem>
                        <SelectItem value="search">Search Engine</SelectItem>
                        <SelectItem value="blog">Blog or Article</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors text-lg font-medium"
                disabled={waitlistMutation.isPending}
              >
                {waitlistMutation.isPending ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>
          </Form>
          <p className="mt-4 text-sm text-center text-blue-200">
            We respect your privacy and will never share your information with
            third parties.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;
