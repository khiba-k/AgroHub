import { AppLayout } from "@/screens/applayout/AppLayout";


export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
