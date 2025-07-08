"use client";

import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendInvite } from "./utils/InviteRequests";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { getUserObj } from "@/actions/auth/BasicAuthActions";
import { useToastStore } from "@/lib/store/useToastStore";

export const InviteFormSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type InviteFormType = z.infer<typeof InviteFormSchema>;


const InviteForm =  ({closeDialog}:{closeDialog:
  () => void
}) => {
  const { showToast } = useToastStore();
  const [status, setStatus] = useState<string | null>(null);
  const [senderId, setSenderId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // Get the current user object to access senderId
  useEffect(() => {
    const fetchSenderId = async () => {
      const user = await getUserObj();
      if (user) {
        setSenderId(user.id); // Ensure senderId is set from the current user
      }
    };
    fetchSenderId();
  }, []);

  const form = useForm<InviteFormType>({
    resolver: zodResolver(InviteFormSchema),
    defaultValues: {
      email: ""
    }
  });

  async function onSubmit(values: InviteFormType) {
    setLoading(true);
    if (values.email === senderId) {
      setStatus("You cannot invite yourself.");
      return;
    }

    const res = await sendInvite(values.email);
    setLoading(false);
    console.log("Invite response:", res);
    if (res.success) {
      showToast(true, "Invite sent successfully!");
      closeDialog()
      form.reset();
      
      
    } else {
      showToast(false, res.message || "Failed to send invite.");
    }
    setStatus(res.message);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Send an Invite</CardTitle>
        <CardDescription>Invite someone to join your team.</CardDescription>
      </CardHeader>
      <CardContent>
        {status && (
          <div className="text-sm mb-4 text-muted-foreground">{status}</div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {loading ?
              <Button type="button" className="w-full" disabled>
                Sending...
              </Button>
              : (<Button type="submit" className="w-full">
                Send Invite
              </Button>)}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default InviteForm;