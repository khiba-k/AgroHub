"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { request } from "http";
import { requestResetEmail } from "./utils/SendEmailSubmit";
import { useRouter } from "next/navigation";

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });


  const router = useRouter();

  async function onSubmit(values: ForgotPasswordSchemaType) {
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await requestResetEmail(values.email);
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
      router.push("/password/forgot/email");
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>Enter your email to receive a reset link.</CardDescription>
      </CardHeader>

      <CardContent>
        {errorMsg && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="bg-green-100 text-green-700 text-sm p-3 rounded-md mb-4">
            {successMsg}
          </div>
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
                    <Input placeholder="john@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full text-lg" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <div className="text-m text-center w-full">
          <Link href="/login" className="text-primary hover:underline">
            Back to Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ForgotPassword;
