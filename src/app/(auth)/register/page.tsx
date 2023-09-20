import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";

// template
import RegisterPage from "@/template/RegisterPage";

const Register = async () => {
  const session = await getServerSession(authOptions);
  if (session) return redirect("/");
  return <RegisterPage />;
};

export default Register;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "register",
    description: "This page is for register in real estate website",
  };
}