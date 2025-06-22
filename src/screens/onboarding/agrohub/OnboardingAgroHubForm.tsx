"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { InviteAcceptSchema, InviteAcceptType } from "../../invite/utils/inviteAgroHubAcceptValidation"; // You'll define this
import { fetchInviteEmailByToken, submitInviteAcceptance } from "../../invite/utils/InviteRequests";

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

export default function OnboardingAgroHubForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const role = searchParams.get("role") || "agrohub";

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [emailLoaded, setEmailLoaded] = useState(false);

  const form = useForm<InviteAcceptType>({
    resolver: zodResolver(InviteAcceptSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  // Fetch email based on token
  // useEffect(() => {
  //   if (!token) return;

  //   (async () => {
  //     try {
  //       const foundEmail = await fetchInviteEmailByToken(token);
  //       if (foundEmail) {
  //         form.setValue("email", foundEmail);
  //         form.trigger("email"); // Force validation/re-render
  //         setEmailLoaded(true);
  //       } else {
  //         setError("Invalid or expired invite link.");
  //       }
  //     } catch (err) {
  //       setError("Failed to load invite information.");
  //     }
  //   })();
  // }, [token, form]);

  async function onSubmit(values: InviteAcceptType) {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const response = await submitInviteAcceptance({ ...values, token: token || "", role });

    if (response.success) {
      setSuccess(response.message);
    } else {
      setError(response.message);
    }

    setIsLoading(false);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Join AgroHub</CardTitle>
        <CardDescription>Complete your account setup to accept the invite</CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 text-sm p-3 rounded-md mb-4">
            {success}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} {...field} />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type={showConfirm ? "text" : "password"} {...field} />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((prev) => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                        tabIndex={-1}
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full py-3 text-lg" disabled={isLoading}>
              {isLoading ? "Accepting..." : "Accept Invite"}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-center w-full">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
