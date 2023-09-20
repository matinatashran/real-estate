import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";

// template
import ForgetPasswordPage from "@/template/ForgetPasswordPage";

const ForgetPassword = async () => {
  const session = await getServerSession(authOptions);
  if (session) return redirect("/");
  return <ForgetPasswordPage />;
};

export default ForgetPassword;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Forget Password",
    description:
      "This page is for forget password and help to chnange password when user forgot it",
  };
}
