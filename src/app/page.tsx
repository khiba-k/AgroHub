import { redirect } from "next/navigation";

export default function Home() {
  redirect("/welcome");
  return null; // This line is never reached but satisfies the component requirement
}
