import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";

// template
import LoginPage from "@/template/LoginPage";

const Login = async () => {
  const session = await getServerSession(authOptions);
  if (session) return redirect("/");
  return <LoginPage />;
};

export default Login;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Login",
    description: "This page is for login to real estate website",
  };
}
