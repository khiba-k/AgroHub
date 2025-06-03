import { RoleSelection } from "@/components/auth/role-selection";

export default function RoleSelectionPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">AgroHub</h1>
          <p className="text-muted-foreground">
            Select your role in the ecosystem
          </p>
        </div>
        <RoleSelection />
      </div>
    </div>
  );
}
