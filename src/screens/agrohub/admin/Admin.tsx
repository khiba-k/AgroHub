import React from "react";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming you're using ShadCN UI
import Link from "next/link";

const Admin = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Leaf className="h-10 w-10 text-primary" />
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Welcome, Admin</h1>
        <p className="text-muted-foreground mb-6">
          Manage the AgroHub platform from here
        </p>
        <Link href="/login/admin">
          <Button variant="default">Go to Admin Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
