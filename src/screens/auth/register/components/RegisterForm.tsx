"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader, Loader2 } from 'lucide-react';
import { useForm } from "react-hook-form";
import { RegisterFormType, RegisterForm as registerSchema } from "../utils/RegisterFormValidation";
import { handleSubmit as onSubmitHandler } from "../utils/Utils";

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
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Leaf, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LoginGoogleBtn from "../../login/components/LoginGoogleBtn";

export function RegisterForm({ role }: { role: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const form = useForm<RegisterFormType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            role: role as "farmer" | "consumer" || undefined,
        },
    });

    async function onSubmit(values: RegisterFormType) {
        try {
            setIsLoading(true);
            await onSubmitHandler(values);
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Create an Account</CardTitle>
                <CardDescription>
                    Join AgroHub to connect with the agricultural community
                </CardDescription>
            </CardHeader>
            <CardContent>
                {error && (
                    <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4">
                        {error}
                    </div>
                )}
                <LoginGoogleBtn role={role} />
                {/* "OR" separator */}
                <div className="relative flex items-center py-4"> {/* Increased py for spacing */}
                    <div className="flex-grow border-t border-gray-600"></div> {/* Darker border for dark theme */}
                    <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span> {/* Grayer text for OR */}
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">


                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="py-3 text-base" // Added py-3 for height, text-base for font size
                                            placeholder="john@example.com"
                                            type="email"
                                            {...field}
                                        />
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
                                            <Input
                                                className="py-3 text-base" // Added py-3 for height, text-base for font size
                                                type={showPassword ? 'text' : 'password'}
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
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
                                            <Input className="py-3 text-base " // Added py-3 for height, text-base for font size
                                                type={showConfirm ? 'text' : 'password'}
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirm((prev) => !prev)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
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

                        <Button
                            type="submit"
                            className="w-full py-3 text-lg" // Changed text-lg to text-xl
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2/> : "Register"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <div className="text-m text-center w-full">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                        Login
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
