"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import {
    Briefcase,
    Leaf,
    Package,
    ShoppingBag,
    Store,
    Truck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const roles = [
        { id: "farmer", label: "Farmer", icon: Leaf },
        { id: "retailer", label: "Retailer", icon: Store },
        { id: "logistics", label: "Logistics Partner", icon: Truck },
        { id: "distributor", label: "Distributor", icon: Package },
        { id: "service", label: "Service Provider", icon: Briefcase },
        { id: "consumer", label: "Consumer", icon: ShoppingBag },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!role) {
            setError("Please select your role");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Check if Supabase is properly initialized
            if (
                !process.env.NEXT_PUBLIC_SUPABASE_URL ||
                !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            ) {
                // Fallback to simulation if environment variables aren't set
                setTimeout(() => {
                    setIsLoading(false);
                    router.push("/social");
                }, 1000);
                return;
            }

            // Register the user with Supabase
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                        role: role,
                    },
                },
            });

            if (signUpError) {
                setError(signUpError.message);
                setIsLoading(false);
                return;
            }

            // Redirect to social feed after successful registration
            router.push("/social");
        } catch (err) {
            console.error("Registration error:", err);
            setError("An unexpected error occurred. Please try again.");
            setIsLoading(false);
        }
    };

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
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Your Role</Label>
                        <Select value={role} onValueChange={setRole} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((r) => (
                                    <SelectItem key={r.id} value={r.id}>
                                        <div className="flex items-center gap-2">
                                            <r.icon className="h-4 w-4" />
                                            <span>{r.label}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Register"}
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                <div className="text-sm text-center w-full">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                        Login
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
