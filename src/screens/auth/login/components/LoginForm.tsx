"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "../utils/LoginFormValidation";
import { handleLoginSubmit as onSubmitHandler } from "../utils/Utils";

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
import { useState } from "react";
import LoginGoogleBtn from "./LoginGoogleBtn";
import ForgotPasswordLink from "../../forgotPass/components/ForgotPasswordLink";

export function LoginForm({role = "user"}: {role:string}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: LoginSchemaType) {
        setIsLoading(true);
        const result = await onSubmitHandler(values, role);
        if (result?.error) {
            setError(result.error);
        }
        setIsLoading(false);
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription className="text-lg">Welcome back to AgroHub!</CardDescription>
            </CardHeader>
            <CardContent>
                {error && (
                    <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4">
                        {error}
                    </div>
                )}
                {role === "user" ? 
                <><LoginGoogleBtn role="farmer" /><br></br> </> :
                null}
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
                                        placeholder="john@example.com" type="email" {...field} />
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
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                tabIndex={-1}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-4 h-4" />
                                                ) : (
                                                    <Eye className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full text-lg" disabled={isLoading}>
                            {isLoading ? <Loader2/> : "Login"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
            {role === "agrohub" ? null :
                <div className="text-m text-center w-full">
                    Don’t have an account?{" "}
                    <Link href="/farmer/register" className="text-primary hover:underline">
                        Register
                    </Link>
                </div>}
                 <div className="text-m text-center w-full">
                   <ForgotPasswordLink/>
                </div>
            </CardFooter>
        </Card>
    );
}
