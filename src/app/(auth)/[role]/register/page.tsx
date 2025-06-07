import Register from "@/screens/auth/register/Register";

export default function Page({ params }: { params: { role: string } }) {
  return (
    <>
      <Register role={params.role} />
    </>
  );
}
