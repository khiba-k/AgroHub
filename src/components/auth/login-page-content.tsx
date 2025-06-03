"use client";

import { LoginForm } from "@/components/auth/login-form";
import { useTranslation } from "@/lib/i18n";

export function LoginPageContent() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">{t("common.appName")}</h1>
          <p className="text-muted-foreground">{t("common.tagline")}</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
